import dayjs, { Dayjs } from 'dayjs';
import { PaperPlaneRight } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import msgApi from '../../api/msg';
import ChatElem from '../../components/chat/ChatElem';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import ProfileImage from '../../components/contact/ProfileImage';
import { commonStyles } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import IChat, { IChatUnread } from '../../types/chat';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import isCloseToBottom from '../../utils/isCloseToBottom';
import toast from '../../utils/toast';

const LeftChild = ({
  contactInfo,
  contactId,
  navigation,
}: {
  contactInfo: IContactPopulate;
  contactId: string;
  navigation: any;
}) => {
  const { avatar = '' } = contactInfo;
  const handlePress = () => {
    navigation.navigate('Contact', { contactId, contactInfo });
  };
  const theme = useSelector((state: any) => state.theme as ITheme);
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        display: 'flex',
        columnGap: 3,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 3,
      }}>
      <ProfileImage avatar={avatar} dim={30} />
      <Text
        style={{ fontWeight: '700', flex: 1, color: theme.themeColor }}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {contactInfo.nickname}
      </Text>
    </TouchableOpacity>
  );
};

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const unread = useSelector(
    (state: any) => state.unread as { unread: IChatUnread[] },
  );
  console.log(unread, 'unread');

  const { params } = route;
  const {
    contactId,
    contactInfo,
  }: { contactId: string; contactInfo: IContactPopulate } = params;
  if (!contactId) {
    toast('Invalid Contact Info');
    navigation.goBack();
  }
  const unreadThis = unread.unread.find(item => item.contactId === contactId);

  const { control, setControl } = useControl();
  const [data, setData] = useState<IChat[]>([]);
  const [typeMsg, setTypeMsg] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [tempMsg, setTempMsg] = useState<IChat[]>([]);

  const getInfo = async () => {
    if (control.isBlock || control.isEnd) return;
    try {
      setControl(prev => ({ ...prev, isBlock: true }));
      const res = (await msgApi.getMsgs({
        page: control.page,
        pageSize: control.pageSize,
        contactId,
        createdAt: dayjs(),
      })) as any as IChat[];

      if (res?.length) {
        res.forEach(item => {
          const msg = data.find(dataElem => item._id === dataElem._id);
          if (msg) return;
          // add to front
          setData(prev => [item, ...prev]);
        });
      }

      setControl(prev => ({
        ...prev,
        isEnd: res?.length < prev.pageSize!,
        page: prev.page! + 1,
      }));
    } catch (error) {
      console.error(error, 'errGetMsgs');
    } finally {
      setControl(prev => ({
        ...prev,
        loading: false,
        loadingMore: false,
        isBlock: false,
      }));
    }
  };

  const getNewMsg = async () => {
    try {
      const readMsg = [];
      const res = (await msgApi.getMsgs({
        page: 1,
        pageSize: 30,
        contactId,
      })) as any as IChat[];

      if (res?.length) {
        for (let index = res.length - 1; index >= 0; index--) {
          const item = res[index];
          const msg = data.find(dataElem => item._id === dataElem._id);
          // add to back
          if (!msg) {
            setData(prev => [...prev, item]);
            if (
              item.senderId === contactId &&
              ['sent', 'received'].includes(item.status)
            ) {
              readMsg.push({ _id: item._id, status: 'read' });
            }
          }
        }

        if (readMsg.length) {
          await msgApi.updateMsgToReceived();
          msgApi.updateMsgStatus(readMsg);
        }
      }

      setTempMsg([]);
    } catch (error) {
      console.error(error, 'newMsgError');
    }
  };

  const handleTypeMsg = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    console.log(e.nativeEvent, 'event');
    const height =
      Math.round((e?.nativeEvent?.contentSize?.height || 40) / 20) * 20;
    console.log(height, 'height');
    setInputHeight(height < 100 ? height : 100);
  };

  const handleSendMsg = async () => {
    if (!typeMsg) return;
    const payload = {
      senderId: user._id,
      receiveId: contactId,
      content: typeMsg,
      contentType: 'text',
    } as IChat;
    setTempMsg(prev => [...prev, payload]);
    try {
      const res = await msgApi.sendMsg(payload);
      if (res) {
        setTypeMsg('');
        getNewMsg();
      }
    } catch (error) {
      console.error(error, 'errSendMsg');
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (!unreadThis || !unreadThis.unread) return;
    getNewMsg();
  }, [unreadThis?.unread]);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
      }}>
      <StatusHeader />
      <Header
        navigation={navigation}
        title=""
        mode="notCenter"
        showBack
        LeftChild={() => (
          <LeftChild
            contactInfo={contactInfo}
            contactId={contactId}
            navigation={navigation}
          />
        )}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) getInfo();
        }}
        scrollEventThrottle={400}>
        {[...data, ...tempMsg].map(item => (
          <ChatElem
            key={dayjs(item.createdAt).valueOf()}
            content={item.content}
            profileImg={
              item.senderId === contactId ? contactInfo.avatar : user.avatar
            }
            isSelf={item.senderId === user._id}
          />
        ))}
      </ScrollView>
      {/* input bar  */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 15,
          alignItems: 'center',
          columnGap: 10,
          marginBottom: 15,
        }}>
        <View style={{ flex: 1 }}>
          <TextInput
            multiline
            style={{ padding: 0, margin: 0, height: inputHeight }}
            value={typeMsg}
            onChangeText={setTypeMsg}
            mode="outlined"
            outlineColor="transparent"
            outlineStyle={{
              borderColor: theme.themeColor,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 20,
            }}
            dense
            textColor={theme.themeColor}
            placeholder="Type message here..."
            placeholderTextColor={theme.themeColor}
            onContentSizeChange={handleTypeMsg}
          />
        </View>
        <TouchableOpacity onPress={handleSendMsg}>
          <PaperPlaneRight color={theme.themeColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
