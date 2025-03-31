export function getPreviousLink(year, month) {
  //
  if (year == 2006 && month == 11) return "";

  year = month == 1 ? year - 1 : year;
  month = month == 11 ? 3 : month == 1 ? 12 : month - 1;
  return `/m/${month}/y/${year}`;
}

export function getNextLink(year, month) {
  if (year == 2025 && month == 3) return "";

  year = month == 12 ? year + 1 : year;
  month = month == 12 ? 1 : month == 3 ? 11 : month + 1;
  return `/m/${month}/y/${year}`;
}
