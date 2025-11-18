const georgianMonthsShort = [
  "იან",
  "თებ",
  "მარ",
  "აპრ",
  "მაი",
  "ივნ",
  "ივლ",
  "აგვ",
  "სექ",
  "ოქტ",
  "ნოე",
  "დეკ",
];

export function formatDate(dateString: string, locale: "ka" | "en") {
  const date = new Date(dateString);

  if (locale === "ka") {
    const day = date.getDate();
    const month = georgianMonthsShort[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
