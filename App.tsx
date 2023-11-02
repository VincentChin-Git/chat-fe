import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import appStore from '@/store/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const routes: { name: string; elem: (props: any) => React.JSX.Element }[] =
    [];

  return (
    <Provider store={appStore}>
      <PaperProvider>
        <NavigationContainer>
          {/* <View style={styles.container} /> */}
          <Stack.Navigator initialRouteName="Index">
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
