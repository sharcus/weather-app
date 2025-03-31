export default function parseMonthData(data) {
  const result = [];

  for (const entry of data) {
    const hourLabel = String(entry.hour).padStart(2, "0");
    const dateLabel = String(entry.date).padStart(2, "0");

    const item = {
      tmp: entry.temperature,
      date: `${dateLabel}`,
      hours: `${hourLabel}:00`,
    };

    if (entry.hour === 0) item.name = entry.date;

    result.push(item);
  }

  return result;
}
