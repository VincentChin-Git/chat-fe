import { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CModal from '../../components/common/CModal';
import CTextInput from '../../components/common/CTextInput';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { changeUserInfoAction } from '../../store/sliceUser';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

// setting for nickname, avatar, describe
const SettingDetail = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const dispatch = useDispatch();
  const { params } = route;
  const { label = '' } = params as { label: string };
  if (!label) navigation.goBack();
  const [value, setValue] = useState(user[label] || '');
  const { control, setControl } = useControl();
  const headerTitle = label[0].toUpperCase() + label.slice(1);

  const handleSave = async () => {
    if (control.isBlock) return;
    if (!control.isConfirm) {
      setControl({ ...control, isConfirm: true });
      return;
    }

    setControl(prev => ({ ...prev, isBlock: true }));
    try {
      const res = await userApi.updateUserInfo({ [label]: value });
      if (res) {
        dispatch(changeUserInfoAction({ k: label, v: value }));
        toast('Update Info Success!');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error, 'errUpdateUser');
    }
  };

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader />
      <Header navigation={navigation} title={headerTitle} showBack />
      <View
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 15,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <CTextInput
          props={{
            label,
            value,
            onChangeText: setValue,
            style: { marginBottom: 5 },
          }}
          status={IInputStatus.EMPTY}
          customStyles={{ marginBottom: 15 }}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <CButton handlePress={handleSave} text="Save" />
      </View>

      <CModal
        show={control.isConfirm}
        handleCancel={() => setControl({ ...control, isConfirm: false })}
        handleConfirm={handleSave}>
        <Text>Confirm Save?</Text>
      </CModal>
    </View>
  );
};

export default SettingDetail;
