/**
 * Utility to reliably format submission date and time into a clear, standard format.
 * Example output: "23 Sep 2026, 05:00 PM"
 */
export function formatSubmissionDateTime(item) {
  if (!item) return '—';

  let dateObj = null;

  // 1. Check if item has createdAt as Firestore Timestamp
  if (item.createdAt?.toDate && typeof item.createdAt.toDate === 'function') {
    dateObj = item.createdAt.toDate();
  } else if (item.createdAt?.toMillis && typeof item.createdAt.toMillis === 'function') {
    dateObj = new Date(item.createdAt.toMillis());
  } else if (item.createdAt?.seconds) {
    dateObj = new Date(item.createdAt.seconds * 1000 + Math.round((item.createdAt.nanoseconds || 0) / 1e6));
  } else if (item._rawTimestamp && !isNaN(item._rawTimestamp)) {
    dateObj = new Date(item._rawTimestamp);
  } else if (item.submittedAt && item.submittedAt !== 'Just now' && item.submittedAt !== 'Recent') {
    const parsed = Date.parse(item.submittedAt);
    if (!isNaN(parsed)) {
      dateObj = new Date(parsed);
    }
  }

  // If no date found or invalid date
  if (!dateObj || isNaN(dateObj.getTime())) {
    if (item.submittedAt && item.submittedAt !== 'Just now' && item.submittedAt !== 'Recent') {
      return item.submittedAt;
    }
    dateObj = new Date();
  }

  return dateObj.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
