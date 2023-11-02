import { View } from 'react-native';

const CTooltip = ({ customStyle = {}, children = <></> }) => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        ...customStyle,
      }}>
      <View>{children}</View>
    </View>
  );
};

export default CTooltip;
