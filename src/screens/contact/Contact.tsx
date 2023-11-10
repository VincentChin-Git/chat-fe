import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import toast from '../../utils/toast';

const Contact = ({ navigation, route }: { navigation: any; route: any }) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { params } = route;
  const {
    contactId,
    contactInfo,
  }: { contactId: string; contactInfo: IContactPopulate } = params;
  if (!contactId) {
    toast('Invalid User');
    navigation.goBack();
  }

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader />
      <Header
        navigation={navigation}
        title={contactInfo.nickname || ''}
        showBack
      />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Contact;
