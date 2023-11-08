import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import userApi from '../../api/user';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

const Contact = ({ navigation, route }: { navigation: any; route: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { params } = route;
  const { contactId }: { contactId: string } = params;
  if (!contactId) {
    toast('Invalid User');
    navigation.goBack();
  }
  const [contact, setContact] = useState<IContactPopulate>({});

  const getInfo = async () => {
    try {
      const res = (await userApi.searchUser({
        _id: contactId,
      })) as any as IContactPopulate;

      if (res._id) setContact(res);
      else {
        toast('Invalid User');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error, 'errGetUser');
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader />
      <Header navigation={navigation} title="" />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Contact;
