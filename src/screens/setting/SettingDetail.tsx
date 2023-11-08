import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { changeUserInfoAction } from '../../store/sliceUser';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

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
  const { key = '', label = '' } = params as { key: string; label: string };
  if (!key || !label) navigation.goBack();
  const [value, setValue] = useState(user[key] || '');
  const { control, setControl } = useControl();
  const handleChange = (text: string) => {
    setValue(text);
  };
  const handleSave = async () => {
    if (control.isBlock) return;
    if (!control.isConfirm) {
      setControl({ ...control, isConfirm: true });
      return;
    }

    setControl(prev => ({ ...prev, isBlock: true }));
    try {
      const res = await userApi.updateUserInfo({ [key]: value });
      if (res) {
        dispatch(changeUserInfoAction({ k: key, v: value }));
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
      <Header navigation={navigation} title="" />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default SettingDetail;
