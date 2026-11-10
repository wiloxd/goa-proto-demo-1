/* True if a YYYY-MM-DD date is before today, in the person's own time zone. */
export function isInThePast(value: string): boolean {
  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  return value < todayStr;
}
