package config

import (
	"fmt"
	"os"

	"shiloheye.com/hmis/lib/db_access"
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
