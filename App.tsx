import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
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
import Setting from './src/screens/setting/Setting';
import SettingDetail from './src/screens/setting/SettingDetail';
import appStore from './src/store/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const routes: { name: string; elem: (props: any) => React.JSX.Element }[] = [
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

  return (
    <Provider store={appStore}>
      <PaperProvider>
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
}
