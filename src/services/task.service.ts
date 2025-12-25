import { Day } from "../enums/day.enum";
import { ValidationError } from "../errors/validation-errors";
import { CreateTask, Task } from "../models/task.model";
import { createFullTaskRepo } from "../repo/task.repo";

export const createTaskService = async (
  data: CreateTask,
  useChatId: number,
): Promise<Task> => {
  try {
    return createFullTaskRepo(data, useChatId);
  } catch (e) {
    if (e instanceof ValidationError) {
      throw e;
    }
    throw new ValidationError("Failed to create user");
  }
};
export const dispatchTasksService = async () => {
  const date = new Date();

  const weekMap: Day[] = [
    Day.Sunday,
    Day.Monday,
    Day.Tuesday,
    Day.Wednesday,
    Day.Thursday,
    Day.Friday,
    Day.Saturday,
  ];

  const day: Day = weekMap[date.getDay()];
  const time = `${date.getHours()}:${date.getMinutes()}`;
};
