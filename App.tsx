import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { Provider } from 'react-redux';

import { commonStylesC } from '@/constants/styles';
import appStore from '@/store/store';

const Stack = createNativeStackNavigator();

// set custom theme
const theme: ThemeProp = {
  ...MD3LightTheme,
  dark: false, // use only light theme
};

export default function App() {
  const routes: { name: string; elem: (props: any) => React.JSX.Element }[] =
    [];

  return (
    <Provider store={appStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* <View style={styles.container} /> */}
          <Stack.Navigator
            screenOptions={{
              contentStyle: {
                backgroundColor: commonStylesC.backgroundColor,
              },
            }}
            initialRouteName="Index">
            {routes.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.elem}
                options={{ headerShown: false }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
