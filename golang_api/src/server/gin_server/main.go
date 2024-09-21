package gin_server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/base"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/config"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	db "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access"
)

var conf = config.Config
var db_pool = db.DBPool

var get_conn = db_pool.GetConn
var ret_conn = db_pool.Return

func StartServer(ctx cms_context.Context, err_c chan error) {
	defer ctx.Finished()
	g_srv := gin.Default()

	srv := http.Server{
		Handler: g_srv,
		Addr:    conf.API_PORT,
	}

	g_srv.Static("./public", "/")

	api_g := g_srv.Group("/api")
	ApiRouterGroup(ctx, err_c, api_g)

	err := srv.ListenAndServe()
	if err != nil {
		err_c <- err
	}

}

const (
	response_success = "success"
	response_data    = "data"
	response_example = "example_t"
)

func ApiRouterGroup(ctx cms_context.Context, err_c chan error, api_g *gin.RouterGroup) {

	api_g.GET("/ping", func(gtx *gin.Context) {

		gtx.JSON(200, gin.H{
			"ping": "pong",
		})
	})

	api_cms := api_g.Group("/cms")

	api_cms.POST("/gallery/image", func(gtx *gin.Context) {

		gtx.JSON(200, gin.H{
			response_success: false,
		})
	})

}

var HotCache = &HotCacheT{
	M: base.NewMutexedMap[*HotCacheItemT](),
}

type HotCacheT struct {
	M *base.MutexedMap[*HotCacheItemT]
}
type HotCacheItemT struct {
	VisitorItem VisitorInfoT
	ClientId    string
	VisitorId   string
	PrevUrl     map[string]time.Time
	Banned      BannedItemT
}

func GetItemFromHotCacheGtx(gtx *gin.Context) (hc *HotCacheItemT) {
	remote_ip := gtx.ClientIP()

	hc = GetItemFromHotCache(remote_ip)
	hc.ClientId = gtx.GetHeader("client-id")
	return
}

func GetItemFromHotCache(new_ip string) (hc *HotCacheItemT) {
	var ok bool
	hc, ok = HotCache.M.Get(new_ip)
	if ok {
		return
	}
	hc = &HotCacheItemT{}
	HotCache.M.Set(new_ip, hc)
	return
}

func TestJson(item any) bool {
	d, err2 := json.MarshalIndent(item, " ", " ")
	if err2 != nil {
		fmt.Println("error: ", err2.Error())

		return false
	}

	fmt.Printf(string(d))
	return true

}

func HandleDbErrors(conn *pgx.Conn, ctx cms_context.Context, err error) bool {
	message := err.Error()

	if strings.Contains(message, "SQLSTATE 42P05") {
		err2 := conn.DeallocateAll(ctx)
		if err2 != nil {
			fmt.Println("err2: ", err2)
		}
		return err2 == nil
	}

	fmt.Printf("unhandled db error: %s\n", message)
	return false
}
