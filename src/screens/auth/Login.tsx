import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import userApi from '../../api/user';
import CTextInput from '../../components/common/CTextInput';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import { loginAction } from '../../store/sliceUser';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import invertColor from '../../utils/invertColor';
import toast from '../../utils/toast';

const Login = ({ navigation }: any) => {
  const [form, setForm] = useState({
    param: '',
    password: '',
  });

  const [control, setControl] = useState({
    isBlock: false,
    paramErr: false,
    passwordErr: false,
    showPass: false,
  });
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme as ITheme);
  const themeStyles = themeConfig[theme.theme];

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
    <>
      <StatusHeader bgColor={themeStyles?.bgColor} />
      <View
        style={{
          ...commonStyles.pageStyles,
          backgroundColor: themeStyles?.bgColor,
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: themeStyles.textColor,
            fontSize: 28,
            marginBottom: 40,
            textAlign: 'center',
          }}>
          Login
        </Text>

        {/* username / mobile  */}
        <CTextInput
          status={IInputStatus.EMPTY}
          customStyles={{ marginBottom: 15 }}
          props={{
            value: form.param,
            label: 'Username / Mobile',
            onChangeText: (text: string) => setForm({ ...form, param: text }),
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

        {/* forget password?  */}
        <Text
          style={{ textAlign: 'right', marginBottom: 20 }}
          onPress={() => navigation.navigate('ForgetPassword')}>
          Forget Password?
        </Text>

        {/* login  */}
        <Text
          onPress={handleLogin}
          style={{
            backgroundColor: theme.themeColor,
            color: invertColor(theme.themeColor),
            paddingVertical: 15,
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Login
        </Text>

        {/* sign up */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>Don't have an account? </Text>
          <Text
            style={{ color: theme.themeColor }}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </View>

        <View style={{ height: '10%' }} />
      </View>
    </>
  );
};

export default Login;
