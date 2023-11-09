import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';
import invertColor from '../../utils/invertColor';

const CButton = ({
  handlePress,
  text,
  margin,
}: {
  handlePress: () => void;
  text: string;
  margin?: number;
}) => {
  const _margin = !margin && margin !== 0 ? 15 : margin;
  const theme = useSelector((state: any) => state.theme as ITheme);

  return (
    <Text
      onPress={handlePress}
      style={{
        backgroundColor: theme.themeColor,
        color: invertColor(theme.themeColor),
        paddingVertical: 12,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 30,
        marginLeft: _margin,
        marginRight: _margin,
      }}>
      {text}
    </Text>
  );
};

export default CButton;
