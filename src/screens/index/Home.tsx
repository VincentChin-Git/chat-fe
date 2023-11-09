import { useIsFocused } from '@react-navigation/native';
import { Plus } from 'phosphor-react-native';
import { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import contactApi from '../../api/contact';
import msgApi from '../../api/msg';
import Footer from '../../components/common/Footer';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import ProfileImage from '../../components/contact/ProfileImage';
import appConfig from '../../constants/config';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import useData from '../../hooks/useData';
import { addUnreadAction } from '../../store/sliceUnreadMsg';
import { IChatOverview, IChatUnread } from '../../types/chat';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import isCloseToBottom from '../../utils/isCloseToBottom';

const Home = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const { control: controlChat, setControl: setControlChat } = useControl();
  const { control: controlCon, setControl: setControlCon } = useControl();
  const { data: dataChat, setData: setDataChat } = useData<IChatOverview>([]);
  const { data: dataCon, setData: setDataCon } = useData<IContactPopulate>([]);

  const getInfoUnread = async () => {
    try {
      const resUnread = (await msgApi.getUnreadMsg()) as any as IChatUnread[];
      if (resUnread.length > 0) dispatch(addUnreadAction(resUnread));
    } catch (error) {
      console.error(error, 'errGetUnread');
    }
  };

  const getInfoChat = async (page?: number) => {
    if (controlChat.isBlock || controlChat.isEnd) return;
    try {
      setControlChat(prev => ({
        ...prev,
        isBlock: true,
        loadingMore: !!dataChat.length,
      }));
      // chat list
      const resChat = (await msgApi.getOverviewMsg({
        page: page || controlChat.page,
        pageSize: controlChat.pageSize,
      })) as IChatOverview[];

      if (resChat?.length) setDataChat(resChat);
      console.log(resChat, 'resChat');

      setControlChat(prev => ({
        ...prev,
        page: page ? page + 1 : controlChat.page! + 1,
        isEnd: resChat?.length < controlChat.pageSize!,
      }));
    } catch (error) {
      console.error(error, 'errGetHomeInfo');
    } finally {
      setControlChat(prev => ({
        ...prev,
        loading: false,
        loadingMore: false,
        isBlock: false,
      }));
    }
  };

  const getInfoCon = async (page?: number) => {
    if (controlCon.isBlock || controlCon.isEnd) return;
    try {
      setControlCon(prev => ({
        ...prev,
        isBlock: true,
        loadingMore: !!dataCon.length,
      }));
      // chat list
      const resCon = (await contactApi.getContacts({
        page: page || controlCon.page,
        pageSize: controlCon.pageSize,
      })) as IContactPopulate[];

      if (resCon?.length) setDataCon(resCon);
      console.log(resCon?.length, 'resCon');

      setControlCon(prev => ({
        ...prev,
        page: page ? page + 1 : controlCon.page! + 1,
        isEnd: resCon?.length < controlCon.pageSize!,
      }));
    } catch (error) {
      console.error(error, 'errGetHomeInfo');
    } finally {
      setControlCon(prev => ({
        ...prev,
        loading: false,
        loadingMore: false,
        isBlock: false,
      }));
    }
  };

  useEffect(() => {
    const track = setInterval(() => {
      getInfoUnread();
    }, 15000);

    return () => clearInterval(track);
  }, []);

  useEffect(() => {
    console.log(isFocused, 'isFocus');
    // screen unfocused, prepare to reload
    if (!isFocused) {
      setControlChat(prev => ({ ...prev, isEnd: false }));
      setControlCon(prev => ({ ...prev, isEnd: false }));
    }
    // screen back, reload
    else {
      getInfoChat(1);
      getInfoCon(1);
    }
  }, [isFocused]);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
      }}>
      <StatusHeader bgColor="#eee" />
      <View
        style={{
          backgroundColor: theme.themeColor,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              backgroundColor: '#eee',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            {/* header  */}
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 15,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  color: theme.themeColor,
                }}>
                {appConfig.appTitle}
              </Text>
              <ProfileImage avatar={user?.avatar} />
            </View>

            {/* contacts */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...styles.contact,
                }}
                onPress={() => navigation.navigate('NewContact')}>
                <Plus color={theme.themeColor} size={28} weight="bold" />
              </TouchableOpacity>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
                horizontal
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) getInfoCon();
                }}
                scrollEventThrottle={400}>
                {dataCon.map((item, index) => (
                  <View
                    key={item._id}
                    style={{
                      marginLeft: 15,
                      marginRight: index === dataCon.length - 1 ? 15 : 0,
                    }}>
                    <ProfileImage
                      avatar={item?.avatar}
                      dim={40}
                      handlePress={() => {
                        navigation.navigate('Contact', { contactId: item._id });
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <Footer navigation={navigation} selected={0} />
      {(controlChat.loading || controlCon.loading) && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    height: 48,
    width: 48,
    backgroundColor: '#ddd',
    borderRadius: 9999,
  },
});

export default Home;
