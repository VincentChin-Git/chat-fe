import { Check, X } from 'phosphor-react-native';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { themeConfig } from '../../constants/styles';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';

const CTextInput = ({
  props,
  status = IInputStatus.EMPTY,
  customStyles,
}: {
  props: any;
  status: IInputStatus;
  customStyles: any;
}) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  const themeStyles = themeConfig[theme.theme];

  if (status !== IInputStatus.EMPTY) delete props.right;

  return (
    <View
      style={{
        position: 'relative',
        ...customStyles,
      }}>
      <TextInput
        outlineColor={themeStyles.textLight2}
        activeOutlineColor={themeStyles.textColor}
        mode="outlined"
        outlineStyle={{ borderWidth: 1 }}
        style={{ marginBottom: 5, height: 45 }}
        {...props}
      />
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          paddingRight: 10,
        }}>
        {status === IInputStatus.LOADING && (
          <ActivityIndicator size={'small'} color={theme.themeColor} />
        )}
        {status === IInputStatus.OK && (
          <Check size={28} color={theme.themeColor} />
        )}
        {status === IInputStatus.ERR && (
          <X size={28} color={theme.themeColor} />
        )}
      </View>
    </View>
  );
};

export default CTextInput;
