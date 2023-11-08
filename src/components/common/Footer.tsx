import { IconProps, ChatDots, Users, Gear } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { themeConfig } from '../../constants/styles';
import { ITheme } from '../../types/theme';
import invertColor from '../../utils/invertColor';

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
    { Icon: ChatDots, to: 'Home' },
    { Icon: Users, to: 'Contacts' },
    { Icon: Gear, to: 'Setting' },
  ];

  const theme = useSelector((state: any) => state.theme as ITheme);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        minHeight: 40,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: theme.themeColor,
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
            color={invertColor(theme.themeColor)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;
