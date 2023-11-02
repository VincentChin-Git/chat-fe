import {
  House,
  CreditCard,
  User,
  IconProps,
  ChartBar,
} from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { themeConfig } from '@/constants/styles';
import { ITheme } from '@/types/theme';

const Footer = ({
  navigation,
  selected,
}: {
  navigation: any;
  selected: number;
}) => {
  const routes: {
    Icon: (props: IconProps) => React.JSX.Element;
    to: string;
  }[] = [
    { Icon: House, to: 'Home' },
    { Icon: CreditCard, to: 'Transaction' },
    { Icon: ChartBar, to: 'Statistic' },
    { Icon: User, to: 'Profile' },
  ];

  const theme = useSelector((state: any) => state.theme as ITheme);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        minHeight: 40,
        width: '100%',
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 15,
      }}>
      {routes.map(({ Icon, to }, index) => (
        <TouchableOpacity
          key={to}
          onPress={() => {
            if (selected === index) return;
            navigation.navigate(to);
          }}>
          <Icon
            size={28}
            weight={selected === index ? 'fill' : 'regular'}
            color={themeConfig[theme.theme].bgColor}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;
