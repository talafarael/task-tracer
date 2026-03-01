package model

import "time"

type Task struct {
	ID          int       `db:"id"`
	Title       string    `db:"title"`
	Description string    `db:"description"`
	CreatedAt   time.Time `db:"created_at"`
}

type TaskIn struct {
	ID          int
	Title       string
	Description string
	CreatedAt   time.Time
}

type TaskOut struct{}
