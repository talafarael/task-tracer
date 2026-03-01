include .env
export

run:
	go run ./cmd/task_tracer

migration:
	 echo  "$(DATABASE_URL)" && migrate -path ./migrations -database "$(DATABASE_URL)" up
