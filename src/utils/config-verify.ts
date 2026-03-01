import dotenv from "dotenv";
dotenv.config();

export const configVerify = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Environment variable "${name}" is missing`);
  }
  return value;
};
export const getEnvOrDefault = (name: string, defaultValue: string): string => {
  return process.env[name] ?? defaultValue;
};
