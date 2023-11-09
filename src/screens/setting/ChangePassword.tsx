import { useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import userApi from '../../api/user';
import CModal from '../../components/common/CModal';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import IUser from '../../types/user';

interface IForm {
  [index: string]: string;
  old: string;
  new: string;
  confirm: string;
}

interface IValid {
  [index: string]: boolean;
  old: boolean;
  new: boolean;
  confirm: boolean;
}

const ChangePassword = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const [state, setState] = useState<IForm>({
    old: '',
    new: '',
    confirm: '',
  });

  const [valid, setValid] = useState<IValid>({
    old: true,
    new: true,
    confirm: true,
  });

  const [showPassword, setShowPassword] = useState<IValid>({
    old: false,
    new: false,
    confirm: false,
  });

  const [isConfirm, setIsConfirm] = useState(false);
  const { control, setControl } = useControl({ loading: false });

  const validate = (label: string) => {
    // new / confirm password
    if (['new', 'confirm'].includes(label) && state.new && state.confirm) {
      // diff password
      if (state.new !== state.confirm) {
        setValid({ ...valid, [label]: false });
        ToastAndroid.show(
          'New password & confirm password are different.',
          ToastAndroid.SHORT,
        );
      }
      // valid
      else setValid({ ...valid, new: true, confirm: true });
    }
    // old password
    else setValid({ ...valid, [label]: !!state[label] });
  };

  const handleSave = async () => {
    // validation
    if (!valid.new || !valid.old || !valid.confirm) return;
    if (!state.new || !state.old || !state.confirm) return;
    if (state.new !== state.confirm) return;
    if (!isConfirm) {
      setIsConfirm(true);
      return;
    }
    if (control.isBlock) return;
    try {
      // old password -> sign in -> ok? -> change!
      setControl(prev => ({ ...prev, isBlock: true, loading: true }));
      setIsConfirm(false);

      await userApi.changePassword({});

      ToastAndroid.show('Password Updated!', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error(error, 'errUpdatePass');
      setIsConfirm(true);
    } finally {
      setControl(prev => ({ ...prev, isBlock: false, loading: false }));
    }
  };

  return (
    <View style={commonStyles.pageStyles}>
      {control.loading && <Loading />}
      <Header navigation={navigation} title="Change Password" showBack />

      <View
        style={{
          width: '92%',
          marginVertical: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}>
        {Object.keys(state).map(label => {
          return (
            <TextInput
              key={label}
              style={{ height: 50 }}
              label={`${label[0].toUpperCase()}${label.slice(1)} Password`}
              value={state[label]}
              onChangeText={value => setState({ ...state, [label]: value })}
              secureTextEntry={!showPassword[label]}
              keyboardType={'default'}
              right={
                <TextInput.Icon
                  icon={showPassword[label] ? 'eye' : 'eye-off'}
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      [label]: !showPassword[label],
                    })
                  }
                />
              }
              onBlur={() => validate(label)}
              error={!valid[label]}
            />
          );
        })}

        <Button
          disabled={
            !valid.old ||
            !valid.confirm ||
            !valid.new ||
            !state.old ||
            !state.confirm ||
            !state.new
          }
          mode="contained"
          onPress={handleSave}
          style={{ marginBottom: 10 }}>
          Save
        </Button>
      </View>

      <CModal
        show={isConfirm}
        showCancel
        showConfirm
        handleConfirm={handleSave}
        handleCancel={() => setIsConfirm(false)}>
        <Text style={{ fontWeight: '700', textAlign: 'center' }}>
          Confirm Update Password?
        </Text>
      </CModal>
    </View>
  );
};

export default ChangePassword;
