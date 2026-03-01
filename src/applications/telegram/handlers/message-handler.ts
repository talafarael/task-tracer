import { FilterQuery } from "grammy";

// export const configPath: ConfigHandlers[] = [
//   {
//     path: "message:text",
//     handler: start,
//   },
// ];
export interface ConfigHandlers {
  path: FilterQuery;
  handler: Function;
}
