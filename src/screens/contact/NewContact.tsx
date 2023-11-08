import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Card, TextInput } from 'react-native-paper';

import contactApi from '../../api/contact';
import userApi from '../../api/user';
import CButton from '../../components/common/CButton';
import CTextInput from '../../components/common/CTextInput';
import Header from '../../components/common/Header';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import ProfileImage from '../../components/contact/ProfileImage';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import { IInputStatus } from '../../types/common';
import { IContactPopulate } from '../../types/contact';
import toast from '../../utils/toast';

const NewContact = ({ navigation }: { navigation: any }) => {
  const [foundUser, setFoundUser] = useState<IContactPopulate>({});
  const { control, setControl } = useControl();
  const [input, setInput] = useState('');

  const searchUser = async () => {
    try {
      // mobile
      const res = (await userApi.searchUser({
        key: 'mobile',
        value: input,
      })) as any as IContactPopulate;

      return res._id ? res : null;
    } catch (error) {
      console.error(error, 'errSearchuser');
    }
  };

  const handleAddContact = async () => {
    if (control.isBlock) return;
    try {
      await contactApi.addContact({ contactId: foundUser._id });
      toast('Success Add Contact!');
      navigation.goBack();
    } catch (error) {
      console.error(error, 'errAddContact');
    } finally {
      setControl({ ...control, isBlock: false });
    }
  };

  useEffect(() => {
    setControl(prev => ({ ...prev, loading: !!input }));
    setFoundUser({});
    if (!input) return;
    let isCanceled = false;

    setTimeout(async () => {
      if (isCanceled) return;
      const res = await searchUser();
      if (isCanceled) return;
      if (res) setFoundUser(res);
      else {
        setFoundUser({});
        toast('No User Found');
      }
      setControl(prev => ({ ...prev, loading: false }));
    }, 1000);

    return () => {
      isCanceled = true;
    };
  }, [input]);

  return (
    <View style={{ ...commonStyles.pageStyles }}>
      <StatusHeader />
      <Header navigation={navigation} title="New Contact" showBack />
      <View style={{ marginHorizontal: 15 }}>
        {/* username / mobile  */}
        <CTextInput
          status={IInputStatus.EMPTY}
          customStyles={{ marginBottom: 15 }}
          props={{
            value: input,
            label: 'Mobile',
            onChangeText: setInput,
            style: { marginBottom: 5 },
            right: <TextInput.Icon icon={'magnify'} />,
            inputMode: 'numeric',
          }}
        />
      </View>
      {control.loading && <Loading mode="top" />}
      {foundUser._id && (
        <>
          <Card
            mode="outlined"
            style={{ marginHorizontal: 15, borderRadius: 5 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 15,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}>
              <ProfileImage dim={50} avatar={foundUser.avatar} />
              <Text style={{ fontWeight: '700' }}>{foundUser.nickname}</Text>
            </View>
          </Card>
          <View style={{ flex: 1 }} />
          <CButton handlePress={handleAddContact} text="Add User" />
        </>
      )}
    </View>
  );
};

export default NewContact;
