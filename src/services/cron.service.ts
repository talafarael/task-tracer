import { findTaskByTime } from "../repo/task.repo";
import { dayMapping } from "../entites/models/scheduled-time.model";
import { Task } from "../entites/models/task.model";
import { findOneById } from "../repo/user-chat.repo";
import { sendMessage } from "../applications/telegram/helpers/messages";
import { formatTaskSchedule } from "../applications/telegram/utils/formater-scheduled";

export const sendTasksService = async () => {
  try {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    const dayNumber = date.getDay();
    const day = dayMapping[dayNumber];
    const tasks = (await findTaskByTime(time, day)) ?? [];
    return sendTasks(tasks);
  } catch (err) {
    console.error(err);
  }
};

const sendTasks = async (tasks: Task[]) => {
  for (const task of tasks) {
    await sendTask(task);
  }
};
const sendTask = async (task: Task) => {
  const userChat = await findOneById(task.userChatsId);
  console.log(userChat);
  if (!userChat) {
    return;
  }
  const schedule = formatTaskSchedule(task);
  const message = `📋 *Task #${task.id}*\n\n🏷️ *Title:* ${task.title}\n${task.description ? `📝 *Description:* ${task.description}\n` : ""}📅 *Schedule:*\n${schedule}`;
  return sendMessage(userChat.chatId, message);
};
