import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import userApi from '../../api/user';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

const ResetPassword = ({ navigation, route }: any) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.user as ITheme);
  const { params } = route;
  const { userId, code }: { userId: string; code: string } = params;
  if (!userId || !code) {
    navigation.goBack();
  }

  const [form, setForm] = useState({ pass: '', comfirmPass: '' });
  const { control, setControl } = useControl();

  const handleReset = async () => {
    if (control.isBlock) return;
    if (!form.pass || !form.comfirmPass) {
      return toast('Please insert your password');
    }

    if (form.pass.length < 8 || form.comfirmPass.length < 8) {
      return toast('Password needs at least 8 character');
    }

    if (form.pass != form.comfirmPass) {
      return toast('Passwords are not same');
    }

    setControl({ ...control, isBlock: true });
    try {
      const res = await userApi.forgetPassword({
        _id: userId,
        code,
        password: form.pass,
      });
      if (res) {
        toast('Password Reset!');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    } catch (error) {
      console.error(error, 'errResetPassword');
    } finally {
      setControl({ ...control, isBlock: false });
    }
  };

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <Header navigation={navigation} title="" />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default ResetPassword;
