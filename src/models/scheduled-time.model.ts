import { Day } from "../enums/day.enum";

export interface CreateScheduledTime {
  day: Day;
  timeSlots: string[];
}
export interface ScheduledTime extends CreateScheduledTime {
  id: string;
}

export const dayMapping: Record<number, Day> = {
  0: Day.Sunday,
  1: Day.Monday,
  2: Day.Tuesday,
  3: Day.Wednesday,
  4: Day.Thursday,
  5: Day.Friday,
  6: Day.Saturday,
};
