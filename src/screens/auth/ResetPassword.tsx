import { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CTextInput from '../../components/common/CTextInput';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

const ResetPassword = ({ navigation, route }: any) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  const user = useSelector((state: any) => state.user as IUser);
  const { params } = route;
  const { userId, code }: { userId: string; code: string } = params;
  if (!userId || !code) {
    navigation.goBack();
  }

  const [form, setForm] = useState({ pass: '', comfirmPass: '' });
  const [show, setShow] = useState({ pass: false, comfirmPass: false });
  const { control, setControl } = useControl();

  const handleReset = async () => {
    if (control.isBlock) return;
    if (!form.pass || !form.comfirmPass) {
      return toast('Please insert your password');
    }

    if (form.pass.length < 8 || form.comfirmPass.length < 8) {
      return toast('Password needs at least 8 character');
    }

    if (form.pass !== form.comfirmPass) {
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
    <>
      <StatusHeader />
      <View
        style={{
          ...commonStyles.pageStyles,
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}>
        <Header title="" navigation={navigation} showBack />
        <View style={{ flex: 1 }} />
        <Text
          style={{
            color: theme.themeColor,
            fontSize: 28,
            marginBottom: 40,
            textAlign: 'center',
          }}>
          Reset Password
        </Text>

        <CTextInput
          customStyles={{ marginBottom: 15 }}
          status={IInputStatus.EMPTY}
          props={{
            label: 'Password',
            value: form.pass,
            onChangeText: (pass: string) => setForm({ ...form, pass }),
            secureTextEntry: !show.pass,
            right: (
              <TextInput.Icon
                icon={show.pass ? 'eye' : 'eye-off'}
                onPress={() =>
                  setShow({
                    ...show,
                    pass: !show.pass,
                  })
                }
              />
            ),
          }}
        />

        <CTextInput
          customStyles={{ marginBottom: 20 }}
          status={IInputStatus.EMPTY}
          props={{
            label: 'Confirm Password',
            value: form.comfirmPass,
            onChangeText: (comfirmPass: string) =>
              setForm({ ...form, comfirmPass }),
            secureTextEntry: !show.comfirmPass,
            right: (
              <TextInput.Icon
                icon={show.comfirmPass ? 'eye' : 'eye-off'}
                onPress={() =>
                  setShow({
                    ...show,
                    comfirmPass: !show.comfirmPass,
                  })
                }
              />
            ),
          }}
        />

        <CButton handlePress={handleReset} text="Reset Password" margin={0} />

        <View style={{ height: '10%' }} />
        <View style={{ flex: 1 }} />
      </View>
    </>
  );
};

export default ResetPassword;
