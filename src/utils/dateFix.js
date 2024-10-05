export function adjustDateRange(startDate, endDate) {
  // Parse the input date strings
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Adjust startDate to 12:00 AM (beginning of the day)
  start.setHours(0, 0, 0, 0);

  // Adjust endDate to 11:59:59 PM (end of the day)
  end.setHours(23, 59, 59, 999);

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}
