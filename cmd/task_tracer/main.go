package main

import (
	"context"
	"log"

	_ "github.com/lib/pq"

	"task-tracer/internal"
	database "task-tracer/pkg/db"
)

func main() {
	ctx := context.Background()

	config := internal.LoadConfig()

	db, err := database.Connect(ctx, config.Database.DSN)
	if err != nil {
		log.Fatalf("failed to connect db: %v", err)
	}
	defer db.Close()

	internal.RunServer(config, db)
}
