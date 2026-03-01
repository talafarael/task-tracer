import "dotenv/config";
import { configVerify, getEnvOrDefault } from "../../utils/config-verify";

export const botConfig = {
  botToken: configVerify("BOT_TOKEN"),
};
