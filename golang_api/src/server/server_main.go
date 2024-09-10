package main

import (
	"context"
	"fmt"
	"log"

	"shiloheye.com/hmis/lib/config"
	cms_context "shiloheye.com/hmis/lib/context"
	db "shiloheye.com/hmis/lib/db_access"
	"shiloheye.com/hmis/server/gin_server"
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
