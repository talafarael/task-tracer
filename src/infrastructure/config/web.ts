import { getEnvOrDefault } from "../../utils/config-verify";

export const webConfig = {
  port: getEnvOrDefault("PORT", "9000"),
};
