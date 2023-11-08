import { Image, TouchableOpacity } from 'react-native';

import BlankProfile from '../../assets/default/BlankProfile.png';

const ProfileImage = ({
  dim = 36,
  avatar,
  handlePress = () => {
    console.log('press');
  },
}: {
  handlePress?: () => void;
  dim?: number;
  avatar?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 9999,
        borderStyle: 'solid',
        padding: 2,
      }}>
      <Image
        source={avatar ? { uri: avatar } : BlankProfile}
        style={{ width: dim, height: dim }}
      />
    </TouchableOpacity>
  );
};

export default ProfileImage;
