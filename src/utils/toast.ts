import { ToastAndroid } from 'react-native';

const toast = (msg: string) => {
  return ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export default toast;
