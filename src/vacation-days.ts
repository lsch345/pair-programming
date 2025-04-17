export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

// Hilfsfunktion: prüft, ob zwei Daten am selben Kalendertag liegen
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  const year = startDate.getFullYear();
  const isLeapYear =
    (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInYear = isLeapYear ? 366 : 365;

  const yearStart = new Date(`${year}-01-01T00:00:00`);
  const yearEnd = new Date(`${year}-12-31T23:59:59`);

  const isFullYear =
    isSameDay(startDate, yearStart) && isSameDay(untilDate, yearEnd);
  const isFullTime = percentage === 100;

  if (isFullYear && isFullTime) {
    return vacationDays;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const durationInDays =
    (untilDate.getTime() - startDate.getTime()) / msPerDay + 1;

  const prorated =
    vacationDays * (durationInDays / daysInYear) * (percentage / 100);

  return parseFloat(prorated.toFixed(2));
}
