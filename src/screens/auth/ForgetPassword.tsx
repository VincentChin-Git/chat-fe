import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CTextInput from '../../components/common/CTextInput';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { IInputStatus } from '../../types/common';
import { ITheme } from '../../types/theme';
import toast from '../../utils/toast';

const ForgetPassword = ({ navigation }: any) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  const [form, setForm] = useState({ mobile: '', code: '', userId: '' });
  const [countdown, setCountdown] = useState(60);
  const { control, setControl } = useControl({ loading: false });

  const handleGetCode = async () => {
    if (control.isBlock || control.loading) return;
    if (!form.mobile || form.mobile.length !== 8) {
      return toast('Please insert correct number');
    }
    setControl(prev => ({ ...prev, isBlock: true }));

    try {
      const userId = await userApi.getForgetPassCode({ mobile: form.mobile });
      if (userId) {
        setForm({ ...form, userId: `${userId}` });
        setControl(prev => ({ ...prev, loading: true }));
        setCountdown(60);
        return toast('Verification Code Sent!');
      }
    } catch (error) {
      console.error(error, 'errGetCode');
    } finally {
      setControl(prev => ({ ...prev, isBlock: false }));
    }
  };

  const handleVerifyCode = async () => {
    if (control.isBlock) return;
    if (!form.mobile || !form.code) {
      return toast('Please insert all the field');
    }
    setControl(prev => ({ ...prev, isBlock: true }));

    try {
      const res = await userApi.addForgetPassword({
        userId: form.userId,
        code: form.code,
      });
      if (res) {
        return navigation.navigate('ResetPassword', {
          userId: form.userId,
          code: form.code,
        });
      }
    } catch (error) {
      console.error(error, 'errVerifyCode');
    } finally {
      setControl(prev => ({ ...prev, isBlock: false }));
    }
  };

  useEffect(() => {
    if (control.loading) {
      let newCountdown = countdown;
      const track = setInterval(() => {
        newCountdown--;
        if (newCountdown > 0) setCountdown(newCountdown);
        else {
          clearInterval(track);
          setControl(prev => ({ ...prev, loading: false }));
        }
      }, 1000);
    }
  }, [control.loading]);

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
          Forget Password
        </Text>
        {/* mobile  */}
        <CTextInput
          status={IInputStatus.EMPTY}
          customStyles={{ marginBottom: 15 }}
          props={{
            value: form.mobile,
            label: 'Mobile',
            onChangeText: (text: string) => {
              setForm({ ...form, mobile: text });
            },
            style: { marginBottom: 5 },
            keyboardType: 'numeric',
            maxLength: 8,
          }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            columnGap: 10,
          }}>
          {/* code  */}
          <CTextInput
            status={IInputStatus.EMPTY}
            customStyles={{ flex: 1 }}
            props={{
              value: form.code,
              label: 'Verification Code',
              onChangeText: (text: string) => {
                setForm({ ...form, code: text });
              },
              style: { marginBottom: 5 },
              keyboardType: 'numeric',
              maxLength: 6,
            }}
          />

          <View style={{ marginTop: 8, width: '30%' }}>
            <CButton
              handlePress={handleGetCode}
              text="Get Code"
              margin={0}
              style={{ marginBottom: 0 }}
              disabled={control.loading}
            />
          </View>
        </View>

        <Text
          style={{
            textAlign: 'right',
            opacity: control.loading ? 1 : 0,
            marginBottom: 20,
          }}>
          Resend Code in {countdown}s
        </Text>

        <CButton
          handlePress={handleVerifyCode}
          text="Reset Password"
          margin={0}
        />

        <View style={{ height: '10%' }} />
        <View style={{ flex: 1 }} />
      </View>
    </>
  );
};

export default ForgetPassword;
