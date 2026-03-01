package internal

import (
	"database/sql"
	"net/http"
	"time"

	"task-tracer/internal/router"
)

func RunServer(config *Config, db *sql.DB) {
	router := router.New()
	srv := http.Server{
		Addr:         config.Server.Port,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		Handler:      http.Handler(router),
	}
	err := srv.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
