
export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}

export default function getTimeDifference(created_at: string): string {
  const currentTime = new Date();
  const createdAtTime = new Date(created_at);
  const differenceInSeconds = Math.floor((currentTime.getTime() - createdAtTime.getTime()) / 1000);

  if (differenceInSeconds < 60) {
    return differenceInSeconds < 1
      ? `только что`
      : `${differenceInSeconds} секунд${differenceInSeconds === 1 ? 'а' : ''} назад`
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} минут${minutes === 1 ? 'а' : ''} назад`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} час${hours === 1 ? '' : 'ов'} назад`;
  } else if (differenceInSeconds < 2592000) { // 30 дней
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} д${days === 1 ? 'ень' : (days >= 2 && days <= 4) ? 'ня' : 'ней'} назад`;
  } else if (differenceInSeconds < 31536000) { // 365 дней
    const months = Math.floor(differenceInSeconds / 2592000);
    return `${months} месяц${months === 1 ? '' : 'ев'} назад`;
  } else {
    const years = Math.floor(differenceInSeconds / 31536000);
    return `${years} год${years === 1 ? '' : 'а'} назад`;
  }

}
