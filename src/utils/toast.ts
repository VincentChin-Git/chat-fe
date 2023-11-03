import { ToastAndroid } from 'react-native';

const toast = (msg?: string) => {
  if (!msg) return;
  return ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export default toast;
