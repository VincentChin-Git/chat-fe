import { useState } from 'react';
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

const NewContact = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const [foundUser, setFoundUser] = useState<IContactPopulate>({});

  const searchUser = async (param: string) => {
    try {
      // mobile
      const res = (await userApi.searchUser({
        key: 'mobile',
        value: param,
      })) as any as IContactPopulate;

      if (res._id) setFoundUser(res);
      else setFoundUser({});
    } catch (error) {
      console.error(error, 'errSearchuser');
    }
  };

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

export default NewContact;
