package db

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"sync/atomic"
	"time"

	"github.com/jackc/pgx/v5"
	cms_context "shiloheye.com/hmis/lib/context"
	db_access "shiloheye.com/hmis/lib/db_access/generated"

	"shiloheye.com/hmis/lib/logging/log_item/v2"
	// "github.com/jackc/pgx/v5/pgtype"
)

var DBPool = NewDBPool()
var DB = &db_access.Queries{}

var DBEnv = &DatabaseEnv{}

type DBPoolStruct struct {
	conns chan *pgx.Conn
	count atomic.Int32

	retry_chan chan *pgx.Conn
}

func (dbp *DBPoolStruct) Len() int {
	return int(dbp.count.Load())
}

// panics if connection is closed
// checks if connection is nil
// makes 3 reconnect attempts in 3mins
func (dbp *DBPoolStruct) GetConn(ctx cms_context.Context) *pgx.Conn {
	loc := log_item.Loc(`func (dbp *DBPoolStruct) GetConn(ctx cms_context.Context) *pgx.Conn`)
	_ = loc
	i := 0
	for {
		pc := <-dbp.conns
		i += 1
		log.Println("reconnect attempt ", i)
		if pc != nil && !pc.IsClosed() {

			return pc
		}
		dbp.count.Add(-1)
		dbp.retry_chan <- pc

	}
}

// returns a connection to the connection pool
// if connection is nill or closed it retries to connect 3x
func (dbp *DBPoolStruct) Return(pc *pgx.Conn, ctx cms_context.Context) {
	loc := log_item.Loc(`func (dbp *DBPoolStruct) Return(pc *pgx.Conn, ctx cms_context.Context)`)
	_ = loc
	if pc == nil || pc.IsClosed() {

		// Logger.LogErr(loc, &log_item.LogItem{
		// 	Message: "connection is closed",
		// })

		dbp.count.Add(-1)
		dbp.retry_chan <- pc
		return

	}
	dbp.conns <- pc
	pc = nil
}

// attempts to form connection to database;
// defaults to an infinite loop of re
func (dbp *DBPoolStruct) retry_connections(ctx cms_context.Context, tries ...int) (pc *pgx.Conn, err1 error) {
	loc := log_item.Loc(`func (dbp *DBPoolStruct) retry_connections(ctx cms_context.Context)(pc *pgx.Conn)`)
	_ = loc
	l := -1

	if len(tries) > 0 {
		l = tries[0]
	}

	for {
		if l > 0 {
			l -= 1
		} else if l == 0 {
			break
		} else {

		}
		if a, b := ctx.NearDeadline(time.Millisecond); a && b {
			return
		} else {
			pc, err1 = dbp.create_connection(ctx)
			if err1 != nil {
				// Logger.LogErr(loc, err1)
				select {
				case <-time.After(time.Minute):

				case <-ctx.Done():
					return
				}

			} else {
				return
			}
			// Logger.Logf(loc, "attempting to reconnect to db")
		}
	}

	return
}

func (dbp *DBPoolStruct) create_connection(ctx cms_context.Context) (*pgx.Conn, error) {
	db_conn, err1 := pgx.Connect(ctx, DBEnv.URL)
	if err1 != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err1)
		return nil, err1
	}

	dbp.count.Add(1)
	// log.Printf("added connection to db")
	return db_conn, nil
}

func (dbp *DBPoolStruct) PopulateConns(ctx cms_context.Context, i int) {
	c := i
	if dbp.conns == nil {
		dbp.conns = make(chan *pgx.Conn, i+1)
	} else {
		var tmp chan *pgx.Conn
		tmp, dbp.conns = dbp.conns, make(chan *pgx.Conn, int(dbp.count.Load())+i)
		close(tmp)
		for c := range tmp {
			dbp.conns <- c
		}
	}
	for ; i > 0; i -= 1 {

		db_conn, err1 := dbp.retry_connections(ctx)
		if err1 != nil {
			<-time.After(time.Second)
			i += 1
			continue

		}
		dbp.conns <- db_conn
	}
	log.Println("added ", c, "connections to db")
}

func (dbp *DBPoolStruct) KillConns(ctx cms_context.Context, i int) {
	close(dbp.conns)
	close(dbp.retry_chan)
	for conn := range dbp.conns {
		conn.Close(ctx)
		i -= 1
		if i < 1 {
			break
		}
	}
}

const (
	env_db_name     string = "DATABASE_DBNAME"
	env_db_host     string = "DATABASE_HOST"
	env_db_user     string = "DATABASE_USER"
	env_db_password string = "DATABASE_PASSWORD"
	env_db_port     string = "DATABASE_PORT"
)

type DatabaseEnv struct {
	DBNAME   string `json:"db_name"`
	HOST     string `json:"db_host"`
	USER     string `json:"db_user"`
	PASSWORD string `json:"db_password"`
	PORT     string `json:"db_port"`
	URL      string
	IP       string
}

func init() {

	db_fields_list := []string{
		env_db_name, env_db_host, env_db_user, env_db_password, env_db_port,
	}
	db_fields := map[string]string{}

	for _, db_field := range db_fields_list {
		db_field_let := os.Getenv(db_field)
		if len(db_field_let) < 1 {
			os.WriteFile(".env", []byte(fmt.Sprintf("%s=\"\"", db_field)), fs.FileMode(os.O_APPEND|os.O_RDWR|os.O_CREATE))
			log.Fatalf(`Fatal: "%s" missing in .env`, db_field)
		}
		db_fields[db_field] = db_field_let

	}

	DBEnv.URL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s", db_fields[env_db_user], db_fields[env_db_password], db_fields[env_db_host], db_fields[env_db_port], db_fields[env_db_name])
	DBEnv.USER, DBEnv.PASSWORD, DBEnv.HOST, DBEnv.DBNAME = db_fields[env_db_user], db_fields[env_db_password], db_fields[env_db_host], db_fields[env_db_name]
	DBEnv.IP = fmt.Sprintf("%s:%s", DBEnv.HOST, DBEnv.PORT)

}

func CheckIfPostgresOnPath() bool {
	return check_if_postgres_on_path()
}

func check_if_postgres_on_path() bool {
	p, _err := exec.LookPath("pg_ctl")
	if _err != nil {
		log.Println(_err)
		return false
	}

	return len(p) > 0
}

func ConnectToDB(ctx cms_context.Context) {
	log.Println("connecting to db")

	DBPool.PopulateConns(ctx, 10)
	log.Println("ConnectToDB ctx: successfully connected to db")
}

func NewDBPool() (dbp *DBPoolStruct) {
	dbp = &DBPoolStruct{
		retry_chan: make(chan *pgx.Conn),
	}

	return
}

func (dbp *DBPoolStruct) RetryLoop(ctx cms_context.Context) {
	loc := log_item.Locf(`func (dbp *DBPoolStruct) RetryLoop(ctx cms_context.Context)`)
	_ = loc
	for range dbp.retry_chan {
		// log.Println("retry_chan")
		go func(ctx cms_context.Context) {
			defer ctx.Finished()
			pc, err1 := dbp.retry_connections(ctx)
			if err1 != nil {
				// Logger.LogErr(loc, err1)
				return
			}

			dbp.conns <- pc
		}(ctx.Add())
		<-time.After(time.Second)
	}

}
