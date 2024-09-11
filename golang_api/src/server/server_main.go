package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/config"
	cms_context "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/context"
	db "github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access"
	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/server/gin_server"
)

var conf = config.Config

func main() {
	log.Println("Starting server ")
	log.Println(fmt.Sprintf("\tlocalhost%s", conf.BrowserPort))

	ctx := cms_context.CreateNewContextWithParent(context.Background())

	go db.ConnectToDB(ctx)

	err_c := make(chan error, 1)
	gin_server.StartServer(ctx.Add(), err_c)

	select {
	case err := <-err_c:
		log.Fatalln(err)
	case <-ctx.Wait():
		log.Println("Clean Exit")
	}
}
