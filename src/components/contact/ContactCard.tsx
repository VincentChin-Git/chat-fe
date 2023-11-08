import { Text, TouchableOpacity, View } from 'react-native';

import ProfileImage from './ProfileImage';
import { IContactPopulate } from '../../types/contact';

const ContactCard = ({
  navigation,
  contactInfo,
}: {
  navigation: any;
  contactInfo: IContactPopulate;
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('', {})}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15,
      }}>
      <ProfileImage avatar={contactInfo.avatar} />
      <View>
        <Text style={{ fontWeight: '500', fontSize: 14 }}>
          {contactInfo.nickname}
        </Text>
        {contactInfo.describe && (
          <Text numberOfLines={2} style={{ color: '#999', fontSize: 12 }}>
            {contactInfo.describe}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
