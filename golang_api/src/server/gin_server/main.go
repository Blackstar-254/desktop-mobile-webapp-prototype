package gin_server

import (
	"fmt"
	"net/http"

	"regexp"
	"strings"

	"time"

	"log"

	"github.com/gin-gonic/gin"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/calendar"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/config"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	db "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access"
	filehandler "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/file_handler"
)

var conf = config.Config
var db_pool = db.DBPool

func StartServer(ctx cms_context.Context, err_c chan error) {
	defer ctx.Finished()
	g_srv := gin.Default()

	srv := http.Server{
		Handler: g_srv,
		Addr:    conf.BrowserPort,
	}

	calendar.InitCalendar(ctx)

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

	api_g.GET("/calendar", func(gtx *gin.Context) {
		cal_year := get_valid_year(gtx.Query("year"))
		month := get_valid_month(gtx.Query("month"))
		_ = month

		cal, exists := calendar.CalendarMap.Get(cal_year)
		if !exists {
			cal = calendar.NewCal(cal_year, ctx)
		}

		// json.NewEncoder(os.Stdout).Encode(cal)
		result := []*calendar.Date{}
		for _, d := range cal.Appointments {
			if strings.HasPrefix(d.ApptDate.Time.Month().String(), month) {
				result = append(result, d)
			}
		}
		gtx.JSON(200, gin.H{
			response_success: true,
			response_data:    result,
		})
	})

	api_g.GET("/patients/patients_register_csv", func(gtx *gin.Context) {
		patients_register_csv, err1 := filehandler.ReadCsv("Patients Register 2024 06 28")
		if err1 != nil {
			gtx.JSON(401, gin.H{
				response_success: false,
			})

			return
		}

		data := patients_register_csv.ToCSV()

		gtx.JSON(200, gin.H{
			response_success: true,
			response_data:    data,
		})

	})
}

func get_valid_year(test_year string) (y string) {
	if strings.HasPrefix(test_year, "20") {
		m, err1 := regexp.MatchString("^(?:[0-9]{4})", test_year)
		if err1 != nil {
			log.Printf(`m, err1 := regexp.MatchString("(?:([0-9]{4}))",cal_year:%s)`, test_year)
			log.Println(err1.Error())
		}
		if test_year == "" || !m || err1 != nil {
			y = fmt.Sprintf("%d", time.Now().Year())
		} else {
			y = string([]byte(test_year)[:4])
		}
		return
	}
	y = fmt.Sprintf("%d", time.Now().Year())

	return
}

var (
	valid_months = []string{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}
)

func get_valid_month(test_month string) string {
	if len(test_month) > 0 {
		for _, m := range valid_months {
			if strings.HasPrefix(test_month, m) {
				return m
			}
		}
	}

	return string([]byte(time.Now().Month().String())[:3])
}
