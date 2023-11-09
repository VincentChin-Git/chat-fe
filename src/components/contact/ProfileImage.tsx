import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

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
    <>
      {handlePress && (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
          <ImageChild />
        </TouchableOpacity>
      )}

      {!handlePress && (
        <View style={styles.container}>
          <ImageChild />
        </View>
      )}
    </>
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
