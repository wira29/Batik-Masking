export function truncateHTML(html, maxLength = 100) {
  if (!html) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";

  if (textContent.length <= maxLength) return html;
  const truncatedText = textContent.slice(0, maxLength).trim() + "...";
  return `<p>${truncatedText}</p>`;
}
