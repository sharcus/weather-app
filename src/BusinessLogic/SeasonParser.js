import Season from "./Season";
import Month from "./Month";
import { getMonthName } from "./dateHelper";

function parseSeasons(data) {
  const parsed = parseSeasonsData(data);
  const result = addMissedMonths(parsed);

  return result;
}

function addMissedMonths(seasons) {
  const seasonLength = 5;
  for (const season of seasons) {
    if (season.months.length < seasonLength) {
      let lastMonth = season.months[season.months.length - 1].month;
      for (let i = season.months.length; i < seasonLength; i++) {
        const currenMonth = lastMonth == 12 ? 1 : lastMonth + 1;
        const monthName = getMonthName(currenMonth);
        const month = new Month(monthName, currenMonth, season.year, 0, 0, 0);
        season.months.push(month);
      }
    }
  }
  return seasons;
}

function parseSeasonsData(data) {
  const seasons = [];
  let current = null;

  for (const entry of data) {
    if (entry.month == 11) {
      const year = Number(entry.year);
      const next = year + 1;
      // begin of new season
      current = new Season([], year, `${year} - ${next}`);
      seasons.push(current);
    }

    if (current) {
      const monthName = getMonthName(entry.month);
      const month = new Month(
        monthName,
        entry.month,
        entry.year,
        entry.min,
        entry.max,
        entry.average
      );
      current.months.push(month);
    }
  }
  return seasons;
}

export default parseSeasons;
