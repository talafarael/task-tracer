import "dotenv/config";
import { configVerify } from "../config-verify";

export const botConfig = {
  bot_token: configVerify("BOT_TOKEN"),
};
