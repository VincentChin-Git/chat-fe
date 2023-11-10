import dayjs from 'dayjs';
import { Check, Checks, Clock } from 'phosphor-react-native';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import BlankProfile from '../../assets/default/BlankProfile.png';
import { ITheme } from '../../types/theme';
import formatDate from '../../utils/formatDate';
import invertColor from '../../utils/invertColor';

const ChatElem = ({
  content = '',
  profileImg = '',
  isSelf = true,
  status = 'sending',
  createdAt,
}: {
  content: string;
  profileImg?: string;
  isSelf?: boolean;
  status?: string;
  createdAt?: Date;
}) => {
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
        marginBottom: 5,
        marginHorizontal: 5,
      }}>
      <View style={{ flex: 1 }} />
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          maxWidth: '70%',
          backgroundColor: bgColor,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: textColor,
            fontSize: 16,
            alignSelf: 'center',
            marginRight: 5,
          }}>
          {content}
        </Text>
        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: 10,
            color: '#ccc',
            marginRight: 3,
          }}>
          {dayjs(createdAt).format('HH:mm')}
        </Text>
        <View style={{ alignSelf: 'flex-end' }}>
          {status === 'sending' && <Clock size={12} color={'#ccc'} />}
          {status === 'sent' && <Check size={12} color={'#ccc'} />}
          {status === 'received' && <Checks size={12} color={'#ccc'} />}
          {status === 'read' && <Checks size={12} color={textColor} />}
        </View>
      </View>
      <Image
        source={profileImg ? { uri: profileImg } : BlankProfile}
        style={{ width: 20, height: 20, borderRadius: 9999 }}
      />
    </View>
  );
};

export default ChatElem;
