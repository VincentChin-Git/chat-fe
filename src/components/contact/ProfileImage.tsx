import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import BlankProfile from '../../assets/default/BlankProfile.png';

const ProfileImage = ({
  dim = 36,
  avatar,
  handlePress,
}: {
  handlePress?: () => void;
  dim?: number;
  avatar?: string;
}) => {
  const ImageChild = () => (
    <Image
      source={avatar ? { uri: avatar } : BlankProfile}
      style={{ width: dim, height: dim, borderRadius: 9999 }}
    />
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      disabled={!handlePress}>
      <ImageChild />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 9999,
    borderStyle: 'solid',
    padding: 2,
  },
});

export default ProfileImage;
