import { View, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { ITheme } from '../../types/theme';

const Loading = ({ mode = 'center' }) => {
  const theme = useSelector((state: any) => state.theme as ITheme);
  return (
    <>
      {mode === 'center' && (
        <View
          style={{
            position: 'absolute',
            height: '110%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
            opacity: 0.7,
            backgroundColor: '#000',
          }}>
          <View style={{ paddingTop: StatusBar.currentHeight }} />
          <ActivityIndicator size="large" color={theme.themeColor} />
        </View>
      )}

      {mode === 'top' && (
        <View>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

export default Loading;
