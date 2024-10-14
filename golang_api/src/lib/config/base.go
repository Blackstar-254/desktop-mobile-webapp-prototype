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
	API_PORT string
}

func init() {
	Config.API_PORT = ":" + os.Getenv("API_PORT")

	fmt.Println(Config.API_PORT)
}
