import { getEnvOrDefault } from "../../utils/config-verify";

export const config = {
  nodeEnv: getEnvOrDefault("NODE_ENV", "development"),
  enableWeb: getEnvOrDefault("ENABLE_WEB", "true"),
  enableBot: getEnvOrDefault("ENABLE_BOT", "true"),
};
