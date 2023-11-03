import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import { commonStyles, themeConfig } from '../../constants/styles';
import { loginAction } from '../../store/sliceUser';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';

const Signup = ({ navigation }: any) => {
  const [form, setForm] = useState({
    username: '',
    mobile: '',
    password: '',
  });

  const [valid, setValid] = useState({
    username: false,
    mobile: false,
    password: false,
  });

  const [showErr, setShowErr] = useState({
    username: false,
    mobile: false,
    password: false,
    loadingUsername: false,
    loadingMobile: false,
  });

  const [control, setControl] = useState({ isConfirm: false, isBlock: false });
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.user as ITheme);

  const handleSignup = async () => {
    if (control.isBlock) return;

    // validate
    if (!valid.mobile || !valid.password || !valid.username) return;

    // set confirm
    if (!control.isConfirm) {
      return setControl(prev => ({ ...prev, isConfirm: true }));
    }
    setControl(prev => ({ ...prev, isBlock: true }));

    try {
      const token = (await userApi.signup(form)) as string;
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
      console.error(error, 'errSignupUser');
    } finally {
      setControl(prev => ({ ...prev, isBlock: false }));
    }
  };

  useEffect(() => {
    let isCanceled = false;
    setTimeout(() => {
      if (isCanceled) return;
      setShowErr(prev => ({ ...prev, password: !(form.password.length >= 8) }));
    }, 1000);

    return () => {
      isCanceled = true;
    };
  }, [form.password]);

  const searchUser = async (type: 'username' | 'mobile') => {
    return await userApi.searchUser({
      key: type,
      value: form[type],
    });
  };

  const decideInput = (data: IUser, type: 'mobile' | 'username') => {
    const isCorrect = !data.id;
    setShowErr(prev => ({
      ...prev,
      [type]: !isCorrect,
      ['loading' + type]: false,
    }));
    setValid(prev => ({ ...prev, [type]: isCorrect }));
  };

  useEffect(() => {
    let isCanceled = false;
    setShowErr(prev => ({ ...prev, loadingUsername: true }));

    setTimeout(async () => {
      try {
        if (isCanceled) return;
        const userFound = (await searchUser('username')) as IUser;
        if (isCanceled) return;
        decideInput(userFound, 'username');
      } catch (error) {
        console.error(error, 'errCheckUserExist');
      }
    }, 1000);

    return () => {
      isCanceled = true;
    };
  }, [form.username]);

  useEffect(() => {
    let isCanceled = false;
    setShowErr(prev => ({ ...prev, loadingMobile: true }));

    setTimeout(async () => {
      try {
        if (isCanceled) return;
        const userFound = (await searchUser('mobile')) as IUser;
        if (isCanceled) return;
        decideInput(userFound, 'mobile');
      } catch (error) {
        console.error(error, 'errCheckUserExist');
      }
    }, 1000);

    return () => {
      isCanceled = true;
    };
  }, [form.mobile]);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}></View>
  );
};

export default Signup;
