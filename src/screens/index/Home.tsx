import { DotsThreeVertical } from 'phosphor-react-native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import contactApi from '../../api/contact';
import msgApi from '../../api/msg';
import Footer from '../../components/common/Footer';
import Loading from '../../components/common/Loading';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import useData from '../../hooks/useData';
import { addUnreadAction } from '../../store/sliceUnreadMsg';
import { IChatOverview, IChatUnread } from '../../types/chat';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';

const Home = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);

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
        loading: true,
        loadingMore: !!dataChat.length,
      }));
      // chat list
      const resChat = (await msgApi.getOverviewMsg({
        page: page || controlChat.page,
        pageSize: controlChat.pageSize,
      })) as IChatOverview[];

      setDataChat(resChat || []);
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
        loading: true,
        loadingMore: !!dataCon.length,
      }));
      // chat list
      const resCon = (await contactApi.getContact({
        page: page || controlCon.page,
        pageSize: controlCon.pageSize,
      })) as IContactPopulate[];

      setDataCon(resCon || []);
      console.log(resCon, 'resCon');

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
    getInfoChat();
    getInfoCon();
    getInfoUnread();
  }, []);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader />
      <View style={{}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 15,
          }}>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>Messages</Text>
          <DotsThreeVertical size={20} color={theme.themeColor} weight="bold" />
        </View>
      </View>
      {(controlChat.loading || controlCon.loading) && <Loading />}
      <View style={{ flex: 1 }}></View>
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Home;
