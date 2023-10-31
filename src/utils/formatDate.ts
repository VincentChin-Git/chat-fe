import dayjs from 'dayjs';

const formatDate = (timestamp?: number) => {
  const selectedTime = dayjs(timestamp).valueOf();
  const timeNow = dayjs().valueOf();
  let diff = timeNow - selectedTime;

  // just now
  if (diff < 1000) return 'Just now';
  diff = Math.floor(diff / 1000);

  // sec
  if (diff === 1) return `${diff} second ago`;
  if (diff < 60) return `${diff} seconds ago`;
  diff = Math.floor(diff / 60);

  // min
  if (diff === 1) return `${diff} minute ago`;
  if (diff < 60) return `${diff} minutes ago`;
  diff = Math.floor(diff / 60);

  // hour
  if (diff === 1) return `${diff} hour ago`;
  if (diff < 24) return `${diff} hours ago`;
  diff = Math.floor(diff / 24);

  // day
  if (diff === 1) return `${diff} day ago`;
  if (diff < 7) return `${diff} days ago`;

  // week
  if (diff >= 7 && diff < 14) return `1 week ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;

  // date
  return dayjs(selectedTime).format('YYYY-MM-DD');
};

export default formatDate;
