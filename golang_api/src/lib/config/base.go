package config

import (
	"fmt"
	"os"

	"github.com/Blackstar-254/desktop-mobile-webapp-prototype/tree/main/golang_api/lib/db_access"
)

var Config = &ConfigStruct{
	DatabaseEnv: db.DBEnv,
}

type ConfigStruct struct {
	*db.DatabaseEnv
	BrowserPort string
}

func init() {
	Config.BrowserPort = ":" + os.Getenv("BROWSER_PORT")

	fmt.Println(Config.BrowserPort)
}
