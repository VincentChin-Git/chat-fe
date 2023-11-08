import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Footer from './src/components/common/Footer';
import Header from './src/components/common/Header';
import { commonStyles, themeConfig } from './src/constants/styles';
import IUser from './src/types/user';
import { ITheme } from './src/types/theme';
import StatusHeader from './src/components/common/StatusHeader';
import useData from './src/hooks/useData';
import useControl from './src/hooks/useControl';
import { useEffect } from 'react';

const Template = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);

  // TODO 1: set data type
  const { data, setData } = useData<any>([]);
  const { control, setControl } = useControl();

  const getInfo = async () => {
    if (control.isBlock || control.isEnd) return;
    try {
      setControl(prev => ({ ...prev, isBlock: true }));

      // TODO 2: call api
      const res: any = [];

      setData(res || []);
      setControl(prev => ({
        ...prev,
        isEnd: !res || res?.length < prev.pageSize!,
        page: (prev.page || 1) + 1,
      }));
    } catch (error) {
      // TODO 3: define err
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

export default Template;
