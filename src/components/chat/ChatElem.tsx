import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import BlankProfile from '../../assets/default/BlankProfile.png';
import { ITheme } from '../../types/theme';
import invertColor from '../../utils/invertColor';

const ChatElem = ({ content = '', profileImg = '', isSelf = true }) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  const bgColor = isSelf ? theme.themeColor : '#ccc';
  const textColor = invertColor(bgColor);
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: isSelf ? 'row' : 'row-reverse',
        justifyContent: isSelf ? 'flex-end' : 'flex-start',
        columnGap: 10,
        flex: 1,
        marginBottom: 10,
        marginHorizontal: 10,
      }}>
      <View style={{ flex: 1 }} />
      <Text
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          maxWidth: '70%',
          color: textColor,
          backgroundColor: bgColor,
          borderRadius: 20,
        }}>
        {content}
      </Text>
      <Image
        source={profileImg ? { uri: profileImg } : BlankProfile}
        style={{ width: 20, height: 20, borderRadius: 9999 }}
      />
    </View>
  );
};

export default ChatElem;
