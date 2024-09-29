package gin_server

import (
	"encoding/json"
	"fmt"

	"strings"

	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/base"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	db_access "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access/generated"
)

type HotCacheT struct {
	M             *base.MutexedMap[*HotCacheItemT]
	Organisations *base.MutexedMap[*db_access.BillingOrganisation]
	GalleryCache  *base.MutexedMap[*GalleryCacheItem]
	AuthCache     *base.MutexedMap[*AuthCacheItem]
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

	if strings.Contains(message, "SQLSTATE 26000") {
		err2 := conn.DeallocateAll(ctx)
		if err2 != nil {
			fmt.Println("err2: ", err2)
		}
		return err2 == nil
	}

	fmt.Printf("unhandled db error: %s\n", message)
	return false
}
