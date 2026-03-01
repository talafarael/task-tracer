import cron from "node-cron";
import { connectDB } from "./infrastructure/database/connect";
import { intiBot } from "./applications/telegram/bot";
import { sendTasksService } from "./services/cron.service";
import { Day } from "./entites/enums/day.enum";
import { findTaskByTime } from "./infrastructure/database/repo/task.repo";

const start = async () => {
  await connectDB();
  intiBot();
};
// take out to applications cron ( maybe )
// cron.schedule("* * * * *", () => {
//   console.log(new Date());
//   sendTasksService();
// });
console.log(findTaskByTime("02:22", Day.Thursday));
start();
