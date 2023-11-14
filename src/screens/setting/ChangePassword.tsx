import { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CModal from '../../components/common/CModal';
import CTextInput from '../../components/common/CTextInput';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { IInputStatus } from '../../types/common';
import toast from '../../utils/toast';

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
  const [state, setState] = useState<IForm>({
    old: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState<IValid>({
    old: false,
    new: false,
    confirm: false,
  });

  const [isConfirm, setIsConfirm] = useState(false);
  const { control, setControl } = useControl({ loading: false });

  const handleSave = async () => {
    // validation
    if (!state.new || !state.old || !state.confirm) {
      toast('Please fill in all the fields.');
      return;
    }
    if (state.new !== state.confirm) {
      toast('New password & confirm password are different.');
      return;
    }
    if (!isConfirm) {
      setIsConfirm(true);
      return;
    }
    if (control.isBlock) return;
    try {
      // old password -> sign in -> ok? -> change!
      setControl(prev => ({ ...prev, isBlock: true, loading: true }));
      setIsConfirm(false);

      await userApi.changePassword({ oldPass: state.old, newPass: state.new });

      toast('Password Updated!');
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
      <StatusHeader
        bgColor={control.isConfirm ? 'rgba(0,0,0,0.3)' : undefined}
      />
      {control.loading && <Loading />}
      <Header navigation={navigation} title="Change Password" showBack />

      <View
        style={{
          width: '92%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {Object.keys(state).map(label => {
          return (
            <CTextInput
              key={label}
              customStyles={{ marginBottom: 15 }}
              status={IInputStatus.EMPTY}
              props={{
                label: `${label[0].toUpperCase()}${label.slice(1)} Password`,
                value: state[label],
                onChangeText: (password: string) =>
                  setState({ ...state, [label]: password }),
                secureTextEntry: !showPassword[label],
                right: (
                  <TextInput.Icon
                    icon={showPassword[label] ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setShowPassword({
                        ...showPassword,
                        [label]: !showPassword[label],
                      })
                    }
                  />
                ),
              }}
            />
          );
        })}

        <CButton handlePress={handleSave} text="Save" margin={0} />
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
