import { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import contactApi from '../../api/contact';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import useData from '../../hooks/useData';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';

const Contacts = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { data, setData } = useData<IContactPopulate>([]);
  const { control, setControl } = useControl();

  const getInfo = async () => {
    if (control.isBlock || control.isEnd) return;
    try {
      setControl(prev => ({ ...prev, isBlock: true }));
      const res = (await contactApi.getContacts({
        page: control.page,
        pageSize: control.pageSize,
      })) as any as IContactPopulate[] | undefined;

      setData(res || []);
      setControl(prev => ({
        ...prev,
        isEnd: !res || res?.length < prev.pageSize!,
        page: (prev.page || 1) + 1,
      }));
    } catch (error) {
      console.error(error, 'errGetContacts');
    } finally {
      setControl(prev => ({
        ...prev,
        isBlock: false,
        loading: false,
        loadingMore: false,
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

export default Contacts;
