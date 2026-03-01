import cron from "node-cron";
import { connectDB } from "./utils/db/connect";
import { intiBot } from "./applications/telegram/bot";
import { sendTasksService } from "./services/cron.service";
import { Day } from "./entites/enums/day.enum";
import { findTaskByTime } from "./repo/task.repo";

const start = async () => {
  await connectDB();
  intiBot();
};
cron.schedule("* * * * *", () => {
  console.log(new Date());
  sendTasksService();
});
console.log(findTaskByTime("02:22", Day.Thursday));
start();
