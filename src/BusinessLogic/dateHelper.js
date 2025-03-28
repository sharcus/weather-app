export function getMonthName(monthNum) {
  switch (monthNum) {
    case 11:
      return "November";
    case 12:
      return "December";
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    default:
      return monthNum.toString();
  }
}

export function getShortMonthName(monthNum) {
  switch (monthNum) {
    case "11":
      return "Nov";
    case "12":
      return "Dec";
    case "1":
      return "Jan";
    case "2":
      return "Feb";
    case "3":
      return "Mar";
    default:
      return monthNum.toString();
  }
}
