import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';
import invertColor from '../../utils/invertColor';

const CButton = ({
  handlePress,
  text,
  margin,
  disabled = false,
  style,
}: {
  handlePress: () => void;
  text: string;
  margin?: number;
  disabled?: boolean;
  style?: any;
}) => {
  const _margin = !margin && margin !== 0 ? 15 : margin;
  const theme = useSelector((state: any) => state.theme as ITheme);

  const _handlePress = () => {
    console.log('isDisable', disabled);
    if (disabled) return;
    handlePress();
  };

  return (
    <Text
      onPress={_handlePress}
      style={{
        backgroundColor: theme.themeColor,
        color: invertColor(theme.themeColor),
        paddingVertical: 12,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 30,
        marginLeft: _margin,
        marginRight: _margin,
        height: 45,
        opacity: disabled ? 0.3 : 1,
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default CButton;
