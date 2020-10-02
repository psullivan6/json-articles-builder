import { parseISO } from "date-fns";

export const parseDate = (date) =>
  typeof date === "string" ? parseISO(date) : date;
