import { format, parseISO, isValid } from "date-fns";

type InputDate = string | Date | null | undefined;

/**
 * Formats a date according to a specific format
 * @param inputDate - The date input (string or Date)
 * @param dateFormat - The format to apply (e.g., "yyyy-MM-dd")
 * @returns The formatted date if valid, otherwise an empty string
 */
export function formatDate(inputDate: InputDate, dateFormat: string = "yyyy-MM-dd"): string {
	const date = typeof inputDate === "string" ? parseISO(inputDate) : inputDate;
	if (date && isValid(date)) return format(date, dateFormat);
	return "";
}

/**
 * Returns the date in ISO (UTC) format
 * @param inputDate - The date input (string or Date)
 * @returns The UTC ISO string
 */
export function formatUTCDate(inputDate: InputDate): string {
	const date = typeof inputDate === "string" ? parseISO(inputDate) : inputDate;
	if (date && isValid(date)) return date.toISOString();
	return "";
}

/**
 * Returns the current date and time in a custom format
 * @param dateFormat - For example "dd/MM/yyyy HH:mm"
 * @returns The formatted current date and time
 */
export function formatDateTimeNow(dateFormat: string = "yyyy-MM-dd HH:mm:ss"): string {
	const now = new Date();
	return format(now, dateFormat);
}
