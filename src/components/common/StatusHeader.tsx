// import { StatusBar as SB } from 'expo-status-bar';
import { StatusBar, View } from 'react-native';

const StatusHeader = ({ bgColor = 'transparent' }) => {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <>
      {/* <SB backgroundColor={bgColor}></SB> */}
      <View
        style={{
          backgroundColor: bgColor,
          height: statusBarHeight,
        }}
      />
    </>
  );
};

export default StatusHeader;
