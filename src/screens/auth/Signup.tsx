import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import CModal from '../../components/common/CModal';
import CTextInput from '../../components/common/CTextInput';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles } from '../../constants/styles';
import { loginAction } from '../../store/sliceUser';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import invertColor from '../../utils/invertColor';
import toast from '../../utils/toast';

const Signup = ({ navigation }: any) => {
  const [form, setForm] = useState({
    username: '',
    mobile: '',
    password: '',
  });

  const [showErr, setShowErr] = useState({
    username: IInputStatus.EMPTY,
    mobile: IInputStatus.EMPTY,
    password: false,
  });

  const [control, setControl] = useState({
    isConfirm: false,
    isBlock: false,
    showPass: false,
  });
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme as ITheme);

  const handleSignup = async () => {
    if (control.isBlock) return;

    // validate
    if (
      showErr.mobile !== IInputStatus.OK ||
      showErr.username !== IInputStatus.OK
    )
      return toast('Please insert the form correctly');

    if (form.password.length < 8) {
      return toast('Password at least 8 characters');
    }
    if (!control.isConfirm) {
      // set confirm
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

  const searchUser = async (type: 'username' | 'mobile') => {
    return await userApi.searchUser({
      key: type,
      value: form[type],
    });
  };

  const decideInput = (data: IUser, type: 'mobile' | 'username') => {
    const isCorrect = !data._id;
    setShowErr(prev => ({
      ...prev,
      [type]: isCorrect ? IInputStatus.OK : IInputStatus.ERR,
    }));
  };

  useEffect(() => {
    if (!form.username) {
      return setShowErr(prev => ({ ...prev, username: IInputStatus.EMPTY }));
    }
    let isCanceled = false;
    setShowErr(prev => ({ ...prev, username: IInputStatus.LOADING }));

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
    if (!form.mobile) {
      return setShowErr(prev => ({ ...prev, mobile: IInputStatus.EMPTY }));
    }
    let isCanceled = false;

    setShowErr(prev => ({ ...prev, mobile: IInputStatus.LOADING }));

    setTimeout(async () => {
      try {
        if (isCanceled) return;
        if (form.mobile.length !== 8 || isNaN(+form.mobile)) {
          return setShowErr(prev => ({ ...prev, mobile: IInputStatus.ERR }));
        }
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
    <>
      <StatusHeader />
      {control.isBlock && <Loading />}
      <View
        style={{
          ...commonStyles.pageStyles,
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}>
        {/* title  */}
        <View style={{ flex: 1, marginHorizontal: -15 }}>
          <Header navigation={navigation} title="" showBack />
        </View>
        <Text
          style={{
            color: theme.themeColor,
            fontSize: 28,
            marginBottom: 40,
            textAlign: 'center',
          }}>
          Sign Up
        </Text>

        {/* username */}
        <CTextInput
          status={showErr.username}
          customStyles={{ marginBottom: 15 }}
          props={{
            value: form.username,
            label: 'Username',
            onChangeText: (text: string) =>
              setForm({ ...form, username: text }),
            style: { marginBottom: 5 },
          }}
        />

        {/* mobile */}
        <CTextInput
          status={showErr.mobile}
          customStyles={{ marginBottom: 15 }}
          props={{
            maxLength: 8,
            keyboardType: 'numeric',
            value: form.mobile,
            label: 'Mobile',
            onChangeText: (text: string) => {
              setForm({ ...form, mobile: text });
            },
            style: { marginBottom: 5 },
          }}
        />

        {/* password  */}
        <CTextInput
          customStyles={{ marginBottom: 25 }}
          status={IInputStatus.EMPTY}
          props={{
            label: 'Password',
            value: form.password,
            onChangeText: (password: string) => setForm({ ...form, password }),
            secureTextEntry: !control.showPass,
            right: (
              <TextInput.Icon
                icon={control.showPass ? 'eye' : 'eye-off'}
                onPress={() =>
                  setControl({
                    ...control,
                    showPass: !control.showPass,
                  })
                }
              />
            ),
          }}
        />

        {/* signup  */}
        <Text
          onPress={handleSignup}
          style={{
            backgroundColor: theme.themeColor,
            color: invertColor(theme.themeColor),
            paddingVertical: 15,
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Sign Up
        </Text>

        {/* sign up */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>Already have an account? </Text>
          <Text
            style={{ color: theme.themeColor }}
            onPress={() => navigation.goBack()}>
            Login
          </Text>
        </View>

        <View style={{ height: '10%' }} />

        <View style={{ flex: 1 }} />
      </View>

      <CModal
        show={control.isConfirm}
        handleConfirm={handleSignup}
        handleCancel={() => setControl({ ...control, isConfirm: false })}>
        <Text style={{ textAlign: 'center', fontWeight: '700' }}>
          Confirm Sign Up?
        </Text>
      </CModal>
    </>
  );
};

export default Signup;
