import dayjs from 'dayjs';
import { Check, Checks } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { removeUnreadAction } from '../../store/sliceUnreadMsg';
import IChat, { IChatUnread } from '../../types/chat';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import formatDate2 from '../../utils/formatDate2';
import invertColor from '../../utils/invertColor';
import ProfileImage from '../contact/ProfileImage';

const ChatCard = ({
  contactInfo,
  msg,
  navigation,
}: {
  contactInfo: IContactPopulate;
  msg: IChat;
  navigation: any;
}) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const dispatch = useDispatch();
  const unread = useSelector(
    (state: any) => state.unread as { unread: IChatUnread[] },
  );
  const unreadMsg =
    unread.unread.find(item => item.contactId === contactInfo._id)?.unread || 0;
  const handlePress = () => {
    dispatch(removeUnreadAction(contactInfo._id));
    navigation.navigate('Chat', { contactInfo, contactId: contactInfo._id });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <ProfileImage dim={60} avatar={contactInfo.avatar} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3,
          }}>
          {/* nickname  */}
          <Text style={{ fontWeight: '700', color: '#000', fontSize: 16 }}>
            {contactInfo.nickname}
          </Text>

          {/* msg time */}
          <Text>{formatDate2(dayjs(msg.createdAt).valueOf())}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 2,
            alignItems: 'center',
          }}>
          {/* status - only for sent msg  */}
          {contactInfo._id !== user._id && msg.status === 'read' && (
            <Checks color={theme.themeColor} size={20} />
          )}
          {contactInfo._id !== user._id && msg.status === 'received' && (
            <Checks color={'#ccc'} size={20} />
          )}
          {contactInfo._id !== user._id && msg.status === 'sent' && (
            <Check color={'#ccc'} size={20} />
          )}
          <Text style={{ fontSize: 14 }}>{msg.content}</Text>
          <View style={{ flex: 1 }} />
          {unreadMsg > 0 && (
            <Text
              style={{
                backgroundColor: theme.themeColor,
                borderRadius: 9999,
                color: invertColor(theme.themeColor),
                width: 30,
                textAlign: 'center',
                fontSize: 12,
              }}>
              {unreadMsg > 99 ? '99+' : unreadMsg}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
