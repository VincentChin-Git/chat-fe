import { CaretRight } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';
import IUser from '../../types/user';

const ProfileCellInfo = ({
  label,
  navigation,
  to,
  defaultValue,
}: {
  label: string;
  navigation: any;
  to?: string;
  defaultValue?: string;
}) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);

  const value = (user[label] as string | undefined) || defaultValue || '';

  return (
    <TouchableOpacity
      disabled={!to}
      onPress={() => navigation.navigate(to, { label })}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 5,
          borderColor: '#999',
          borderStyle: 'solid',
          borderWidth: 1,
        }}>
        <Text>
          {label[0].toUpperCase()}
          {label.slice(1)}
        </Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>{value}</Text>
        {to && <CaretRight size={20} color={theme.themeColor} />}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCellInfo;
