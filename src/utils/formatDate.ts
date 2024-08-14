import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function getDisplayedDate(eventStartAndEndDates: DateRange | undefined) {
 if (!eventStartAndEndDates) {
  return null;
 }
 const { from, to } = eventStartAndEndDates;

 if (from && to) {
  return `${format(from, "d' of 'MMMM")} to ${format(to, "d' of 'MMMM")}`;
 }

 if (from) {
  return format(from, "d' of 'MMMM");
 }
}

export function getDisplayedDateToList(starts_at: Date, ends_at?: Date) {
 if (starts_at && ends_at) {
  return `${format(starts_at, "d' of 'MMMM")} to ${format(
   ends_at,
   "d' of 'MMMM"
  )}`;
 }

 if (starts_at) {
  return format(starts_at, "d' of 'MMMM");
 }
}
