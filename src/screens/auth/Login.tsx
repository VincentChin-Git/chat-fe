import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '@/api/user';
import { commonStyles, themeConfig } from '@/constants/styles';
import { loginAction } from '@/store/sliceUser';
import { ITheme } from '@/types/theme';
import IUser from '@/types/user';
import toast from '@/utils/toast';

const Login = ({ navigation }: any) => {
  const [form, setForm] = useState({
    param: '',
    password: '',
  });

  const [control, setControl] = useState({
    isBlock: false,
    paramErr: false,
    passwordErr: false,
  });
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.user as ITheme);

  const handleLogin = async () => {
    if (control.isBlock) return;
    // validate
    if (!form.param || !form.password) {
      return toast('Please fill in the form');
    }
    setControl(prev => ({ ...prev, isBlock: true }));

    try {
      const token = (await userApi.login(form)) as string;
      if (token) {
        await AsyncStorage.setItem('userAuthToken', token);
        const userInfo = (await userApi.getUserInfoByToken()) as {
          userData: IUser;
          token: string;
        };

        dispatch(
          loginAction({ user: userInfo.userData, token: userInfo.token }),
        );

        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    } catch (error) {
      console.error(error, 'errLoginUser');
    } finally {
      setControl(prev => ({ ...prev, isBlock: false }));
    }
  };

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}></View>
  );
};

export default Login;
