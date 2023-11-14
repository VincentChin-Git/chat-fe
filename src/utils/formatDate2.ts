import dayjs from 'dayjs';

const formatDate2 = (timestamp?: number) => {
  const selectedTime = dayjs(timestamp).valueOf();
  const timeNow = dayjs().valueOf();

  if (
    dayjs(timeNow).format('YYYY-MM-DD') ===
    dayjs(selectedTime).format('YYYY-MM-DD')
  ) {
    return dayjs(selectedTime).format('HH:mm');
  }

  return dayjs(selectedTime).format('YYYY-MM-DD');
};

export default formatDate2;
