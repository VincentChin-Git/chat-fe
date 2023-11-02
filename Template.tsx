import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { commonStyles, themeConfig } from '@/constants/styles';
import IUser from '@/types/user';
import { ITheme } from '@/types/theme';

const Template = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.user as ITheme);

  return (
    <View
      style={{
        ...commonStyles.pageStyles,
        backgroundColor: themeConfig[theme.theme].bgColor,
      }}>
      <Header navigation={navigation} title="" />
      <Footer navigation={navigation} selected={0} />
    </View>
  );
};

export default Template;
