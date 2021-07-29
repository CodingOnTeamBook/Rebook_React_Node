export default function shortReviewSummary(summary: string): string {
  const length = 45;
  if (summary) {
    if (summary.length > length) {
      summary = summary.substr(0, length - 2) + '...';
    }
  }
  return summary;
}
