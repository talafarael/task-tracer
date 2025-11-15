import { query } from "../db/request/query";
import { Day } from "../enums/day.enum";
import { ValidationError } from "../errors/validation-errors";
import { CreateTask, Task } from "../models/task.model";
import { createSheduleTimesRepo } from "./sheduled-time.repo";
export const findTaskByTime = async (time: string, day: Day) => {
  const sql = `
    SELECT t.*
    FROM tasks t
    JOIN scheduled_time s ON t.id = s.task_id
    WHERE $1 = ANY(s.time_slots) AND s.day = $2
  `;
};
export const createTaskRepo = async (
  data: CreateTask,
  userId: number,
): Promise<Task> => {
  try {
    const sqlRequest = `
    INSERT INTO tasks (title, disposable, description, user_chats_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const res = await query<Task>(sqlRequest, [
      data.title,
      data.disposable,
      data.description,
      userId,
    ]);
    return res[0];
  } catch (e) {
    console.error(e);
    throw new ValidationError("Failed to create task");
  }
};
export const createFullTaskRepo = async (
  data: CreateTask,
  useChatId: number,
): Promise<Task> => {
  const newTask = await createTaskRepo(data, useChatId);
  newTask.scheduledTime = await createSheduleTimesRepo(
    data.scheduledTime,
    newTask.id,
  );
  return newTask;
};
