import { ArrowLeft } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';

const Header = ({
  navigation,
  title,
  mode = 'center',
  showBack = false,
  LeftChild = () => <></>,
  RightChild = () => <></>,
}: {
  navigation: any;
  title: string;
  mode?: string;
  showBack?: boolean;
  LeftChild?: (props: any) => React.JSX.Element;
  RightChild?: (props: any) => React.JSX.Element;
}) => {
  const theme = useSelector((state: any) => state.theme as ITheme);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 15,
      }}>
      {/* left */}
      <View
        style={{
          width: mode === 'center' ? '25%' : '50%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={28} color={theme.themeColor} />
          </TouchableOpacity>
        )}

        {LeftChild && <LeftChild />}
      </View>

      {/* middle */}
      {mode === 'center' && (
        <Text
          style={{
            width: '50%',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 20,
            color: theme.themeColor,
          }}>
          {title}
        </Text>
      )}

      {/* right */}
      <View style={{ width: mode === 'center' ? '25%' : '50%' }}>
        <RightChild />
      </View>
    </View>
  );
};

export default Header;
