import { Day } from "../../../entites/enums/day.enum";

export interface ScheduledTimeConversation {
  day: Day;
  timeSlots: string;
}
