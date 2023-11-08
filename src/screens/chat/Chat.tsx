import { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import msgApi from '../../api/msg';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import useData from '../../hooks/useData';
import IChat from '../../types/chat';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import toast from '../../utils/toast';

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { params } = route;
  const {
    contactId,
    contactInfo,
  }: { contactId: string; contactInfo: IContactPopulate } = params;
  if (!contactId) {
    toast('Invalid Contact Info');
    navigation.goBack();
  }
  const { control, setControl } = useControl();
  const { data, setData } = useData<IChat>([]);

  const getInfo = async () => {
    if (control.isBlock || control.isEnd) return;
    try {
      setControl(prev => ({ ...prev, isBlock: true }));
      const res = (await msgApi.getMsgs({
        page: control.page,
        pageSize: control.pageSize,
        contactId,
      })) as any as IChat[];

      if (res?.length) setData(res);

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

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <StatusHeader />
      <Header navigation={navigation} title="" />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Chat;
