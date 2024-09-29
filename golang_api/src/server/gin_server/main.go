package gin_server

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/base"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/config"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	db "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access"
	db_access "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access/generated"
)

var conf = config.Config
var db_pool = db.DBPool

var get_conn = db_pool.GetConn
var ret_conn = db_pool.Return

func StartServer(ctx cms_context.Context, err_c chan error) {
	defer ctx.Finished()
	g_srv := gin.Default()

	go GetListOfClientsFromDb(ctx.Add())
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

	go GetSessionListFromDb(ctx.Add())
	api_g.Use(func(gtx *gin.Context) {

		if !ConfirmSessionAuth(gtx) {
			gtx.JSON(401, gin.H{
				response_success: false,
			})
			gtx.Abort()
			return
		}

		gtx.Next()
	})
	api_g.GET("/ping", func(gtx *gin.Context) {

		gtx.JSON(200, gin.H{
			"ping": "pong",
		})
	})

	api_cms := api_g.Group("/cms")

	ApiGalleryRouterGroup(ctx, err_c, api_cms.Group("/gallery"))

}

var HotCache = &HotCacheT{
	M:             base.NewMutexedMap[*HotCacheItemT](),
	Organisations: base.NewMutexedMap[*db_access.BillingOrganisation](),
	GalleryCache:  base.NewMutexedMap[*GalleryCacheItem](),
	AuthCache:     base.NewMutexedMap[*AuthCacheItem](),
}

type AuthCacheItem struct {
	*db_access.GetSessionTokensRow
	LastLoad time.Time
}

func ConfirmSessionAuth(gtx *gin.Context) bool {
	defer fmt.Println("")
	client_id := gtx.GetHeader("client-id")
	if len(client_id) < 1 {
		fmt.Printf("ERROR: no client-id in request; ")
		return false
	}
	if !HotCache.Organisations.Has(client_id) {
		fmt.Printf("ERROR: invalid client-id in request: %s; ", client_id)
		return false
	}

	session_token := gtx.GetHeader("session-token")
	if len(session_token) < 1 {
		fmt.Printf("ERROR: no session-token in request")
		return false
	}

	db_sess, ok := HotCache.AuthCache.Get(session_token)

	if !ok || *db_sess.ClientOrg != client_id {
		return false
	}

	return true
}

func GetListOfClientsFromDb(ctx cms_context.Context) {
	defer ctx.Finished()
	tc := time.NewTicker(time.Duration(60) * time.Minute)
	create_dir := map[string]bool{}

	for {
		func(ctx cms_context.Context, create_dir map[string]bool) {

			conn := get_conn(ctx)
			defer ret_conn(conn, ctx)

		retry_select_organisations:
			res, err := db.DB.GetAllOrganisations(ctx, conn)
			if err != nil {
				if HandleDbErrors(conn, ctx, err) {
					goto retry_select_organisations
				}
				log.Println("error: ", err)
				os.Exit(-1)
			}

			for _, item := range res {
				// TestJson(item)
				fmt.Printf("client-id: %s added to HotCache\n", item.ClientID)
				HotCache.Organisations.Set(item.ClientID, item)

				if create_dir != nil && !create_dir[item.ClientID] {
					err2 := os.MkdirAll(fmt.Sprintf("public/%s/images", item.ClientID), file_mode)
					if err2 != nil && !errors.Is(err2, os.ErrExist) {
						fmt.Println(err2.Error())
					} else {
						create_dir[item.ClientID] = true
					}
				}
				if !HotCache.GalleryCache.Has(item.ClientID) {
					GalleryJson(item.ClientID)
				}

			}

		}(ctx, create_dir)
		<-tc.C
	}
}

func GetSessionListFromDb(ctx cms_context.Context) {
	defer ctx.Finished()
	tc := time.NewTicker(time.Duration(5) * time.Minute)

	for {
		func(ctx cms_context.Context) {

			conn := get_conn(ctx)
			defer ret_conn(conn, ctx)

		retry_select_organisations:
			res, err := db.DB.GetSessionTokens(ctx, conn)
			if err != nil {
				if HandleDbErrors(conn, ctx, err) {
					goto retry_select_organisations
				}
				log.Println("error: ", err)
				os.Exit(-1)
			}

			for _, item_pre := range res {
				// TestJson(item)

				if HotCache.AuthCache.Has(*item_pre.SessionToken) {
					continue
				}
				item := &AuthCacheItem{
					GetSessionTokensRow: item_pre,
				}
				fmt.Printf("SESSION_TOKEN: %s added to HotCache\n", *item.SessionToken)
				HotCache.AuthCache.Set(*item.SessionToken, item)

			}

		}(ctx)
		<-tc.C
	}
}
