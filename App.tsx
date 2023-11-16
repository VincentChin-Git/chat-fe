import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import React from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { Provider } from 'react-redux';

import ForgetPassword from './src/screens/auth/ForgetPassword';
import Login from './src/screens/auth/Login';
import ResetPassword from './src/screens/auth/ResetPassword';
import Signup from './src/screens/auth/Signup';
import Chat from './src/screens/chat/Chat';
import Contact from './src/screens/contact/Contact';
import Contacts from './src/screens/contact/Contacts';
import NewContact from './src/screens/contact/NewContact';
import SearchContact from './src/screens/contact/SearchContact';
import Home from './src/screens/index/Home';
import Index from './src/screens/index/Index';
import ChangePassword from './src/screens/setting/ChangePassword';
import Setting from './src/screens/setting/Setting';
import SettingDetail from './src/screens/setting/SettingDetail';
import appStore from './src/store/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const routes: { name: string; elem: (props: any) => React.JSX.Element }[] = [
    { name: 'ChangePassword', elem: ChangePassword },
    { name: 'Chat', elem: Chat },
    { name: 'Contact', elem: Contact },
    { name: 'Contacts', elem: Contacts },
    { name: 'ForgetPassword', elem: ForgetPassword },
    { name: 'Home', elem: Home },
    { name: 'Index', elem: Index },
    { name: 'Login', elem: Login },
    { name: 'NewContact', elem: NewContact },
    { name: 'ResetPassword', elem: ResetPassword },
    { name: 'SearchContact', elem: SearchContact },
    { name: 'Setting', elem: Setting },
    { name: 'SettingDetail', elem: SettingDetail },
    { name: 'Signup', elem: Signup },
  ];

  console.log(process.env.EXPO_PUBLIC_API_URL, 'Config');
  console.log(Device, 'device');

  // set custom theme
  const theme: ThemeProp = {
    ...MD3LightTheme,
    dark: false, // use only light theme
  };

  return (
    <Provider store={appStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
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
};

export default App;
