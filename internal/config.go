package internal

import (
	"log"
	"os"

	environment "task-tracer/pkg/enviroment"
)

type Config struct {
	Server   *Server
	Database *Database
}

type Server struct {
	Port        string
	Environment environment.Environment
}

type Database struct {
	DSN string
}

func LoadConfig() *Config {
	return &Config{
		Server:   LoadServer(),
		Database: LoadDatabase(),
	}
}

func LoadServer() *Server {
	env := loadDefaultEnv("ENVIRONMENT", "development")
	return &Server{
		Port:        loadDefaultEnv("PORT", "8080"),
		Environment: environment.Environment(env),
	}
}

func LoadDatabase() *Database {
	return &Database{
		DSN: loadRequiredEnv("DATABASE_DSN"),
	}
}

func loadRequiredEnv(name string) string {
	env := os.Getenv(name)
	if env == "" {
		log.Fatalf("Environment variable %s is required but not set", name)
	}
	return env
}
func loadOptionalEnv() {}
func loadDefaultEnv(name string, def string) string {
	env := os.Getenv(name)
	if env == "" {
		return def
	}
	return env
}
