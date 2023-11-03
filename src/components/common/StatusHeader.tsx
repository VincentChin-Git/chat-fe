import { StatusBar, View } from 'react-native';

const StatusHeader = ({ bgColor = 'transparent' }) => {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <View
      style={{
        backgroundColor: bgColor,
        height: statusBarHeight,
      }}
    />
  );
};

export default StatusHeader;
