import dayjs from 'dayjs';

export const formatDate = (timestamp) => {
  return dayjs(timestamp).format("h:mm A");
}
