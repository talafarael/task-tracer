package repository

import (
	"database/sql"

	model "task-tracer/internal/models"
)

type TaskRepository struct {
	db *sql.DB
}

func NewTaskRepository(db *sql.DB) *TaskRepository {
	return &TaskRepository{
		db,
	}
}

func (r *TaskRepository) GetTasks() ([]model.Task, error) {
	rows, err := r.db.Query("SELECT id, title, description FROM tasks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []model.Task
	for rows.Next() {
		var t model.Task
		err := rows.Scan(
			&t.ID,
			&t.Title,
			&t.Description,
			&t.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return tasks, nil
}

func (r *TaskRepository) CreateTask(task model.TaskIn) (model.Task, error) {
	stmt, err := r.db.Prepare("INSERT INTO tasks(title, description) VALUES(?, ?)")
	if err != nil {
		return model.Task{}, err
	}
	defer stmt.Close()

	res, err := stmt.Exec(task.Title, task.Description)
	if err != nil {
		return model.Task{}, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return model.Task{}, err
	}

	return model.Task{
		ID:          int(id),
		Title:       task.Title,
		Description: task.Description,
	}, nil
}
