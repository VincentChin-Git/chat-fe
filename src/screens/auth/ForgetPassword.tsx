import { useState } from 'react';
import { View } from 'react-native';

import userApi from '../../api/user';
import useControl from '../../hooks/useControl';
import toast from '../../utils/toast';

const ForgetPassword = ({ navigation }: any) => {
  const [form, setForm] = useState({ mobile: '', code: '', userId: '' });
  const { control, setControl } = useControl();

  const handleGetCode = async () => {
    if (control.isBlock) return;
    if (!form.mobile || form.mobile.length !== 8) {
      return toast('Please insert correct number');
    }
    setControl({ ...control, isBlock: true });

    try {
      const userId = await userApi.getForgetPassCode({ mobile: form.mobile });
      if (userId) {
        setForm({ ...form, userId: `${userId}` });
        return toast('Verification Code Sent!');
      }
    } catch (error) {
      console.error(error, 'errGetCode');
    } finally {
      setControl({ ...control, isBlock: false });
    }
  };

  const handleVerifyCode = async () => {
    if (control.isBlock) return;
    if (!form.mobile || !form.code) {
      return toast('Please insert all the field');
    }
    setControl({ ...control, isBlock: true });

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
      setControl({ ...control, isBlock: false });
    }
  };

  return <View></View>;
};

export default ForgetPassword;
