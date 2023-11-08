import { Plus } from 'phosphor-react-native';
import { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import contactApi from '../../api/contact';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import StatusHeader from '../../components/common/StatusHeader';
import ContactCard from '../../components/contact/ContactCard';
import { commonStyles, themeConfig } from '../../constants/styles';
import useControl from '../../hooks/useControl';
import useData from '../../hooks/useData';
import { IContactPopulate } from '../../types/contact';
import { ITheme } from '../../types/theme';
import IUser from '../../types/user';
import isCloseToBottom from '../../utils/isCloseToBottom';

const RightChild = ({ navigation }: any) => {
  const theme = useSelector((state: any) => state.theme as ITheme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewContact')}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <Plus color={theme.themeColor} size={24} weight="bold" />
    </TouchableOpacity>
  );
};

const Contacts = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);
  const { data, setData } = useData<IContactPopulate>([]);
  const { control, setControl } = useControl({ pageSize: 15 });

  const getInfo = async () => {
    if (control.isBlock || control.isEnd) return;
    try {
      setControl(prev => ({ ...prev, isBlock: true }));
      const res = (await contactApi.getContacts({
        page: control.page,
        pageSize: control.pageSize,
        sortBy: 'name',
      })) as any as IContactPopulate[] | undefined;

      if (res?.length) setData(res);
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
      }}>
      <StatusHeader />
      <Header
        navigation={navigation}
        title="Contacts"
        RightChild={RightChild}
      />
      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) getInfo();
        }}
        scrollEventThrottle={400}>
        {data.map((item, index) => (
          <View
            key={item._id}
            style={{
              marginTop: 10,
              marginBottom: index === data.length - 1 ? 15 : 0,
            }}>
            <ContactCard navigation={navigation} contactInfo={item} />
          </View>
        ))}
      </ScrollView>
      <Footer navigation={navigation} selected={1} />
    </View>
  );
};

export default Contacts;
