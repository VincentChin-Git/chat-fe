import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Footer from './src/components/common/Footer';
import Header from './src/components/common/Header';
import { commonStyles, themeConfig } from './src/constants/styles';
import IUser from './src/types/user';
import { ITheme } from './src/types/theme';
import StatusHeader from './src/components/common/StatusHeader';

const Template = ({ navigation }: { navigation: any }) => {
  const user = useSelector((state: any) => state.user as IUser);
  const theme = useSelector((state: any) => state.theme as ITheme);

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
