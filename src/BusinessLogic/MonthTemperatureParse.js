export default function parseMonthData(data, monthLabel) {
  const result = [];

  for (const entry of data) {
    //const hourLabel = String(entry.hour).padStart(2, "0");
    //const dateLabel = String(entry.date).padStart(2, "0");
    //const label = entry.hour === 0 ? `${dateLabel}` : ``;
    const item = { tmp: entry.temperature };

    if (entry.hour === 0) item.name = entry.date;

    result.push(item);
  }

  return result;
}
