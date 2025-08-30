export function formatTanggal(dateInput, options = {}) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  return date.toLocaleDateString("id-ID", {
    weekday: options.weekday || undefined,
    day: options.day || "numeric",
    month: options.month || "long",
    year: options.year || "numeric",
  });
}
