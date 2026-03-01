package handler

type TasksHandler struct{}

func NewTasksHandler() *TasksHandler {
	return &TasksHandler{}
}

func (h *TasksHandler) GetTasks() {}

