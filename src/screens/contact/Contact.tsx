import { Text, View } from 'react-native';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import ProfileImage from '../../components/contact/ProfileImage';
import { commonStyles } from '../../constants/styles';
import { IContactPopulate } from '../../types/contact';
import toast from '../../utils/toast';

const Contact = ({ navigation, route }: { navigation: any; route: any }) => {
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
      }}>
      <StatusHeader />
      <Header
        navigation={navigation}
        title={contactInfo.nickname || ''}
        showBack
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 15,
            rowGap: 10,
          }}>
          <ProfileImage dim={100} avatar={contactInfo.avatar} />
          <Text style={{ fontWeight: '700', fontSize: 18 }}>
            +65 {contactInfo.mobile?.slice(0, 4)} {contactInfo.mobile?.slice(4)}
          </Text>

          <Text style={{ fontSize: 16 }}>{contactInfo.describe}</Text>
        </View>
      </View>
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Contact;
