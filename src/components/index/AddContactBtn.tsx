import { Plus } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';

const AddContactBtn = ({ navigation }: { navigation: any }) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  return (
    <TouchableOpacity
      style={{
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.contact,
      }}
      onPress={() => navigation.navigate('NewContact')}>
      <Plus color={theme.themeColor} size={28} weight="bold" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contact: {
    height: 48,
    width: 48,
    backgroundColor: '#ddd',
    borderRadius: 9999,
  },
});

export default AddContactBtn;
