import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import ForgetPassword from '@/screens/auth/ForgetPassword';
import Login from '@/screens/auth/Login';
import Signup from '@/screens/auth/Signup';
import Chat from '@/screens/chat/Chat';
import Contact from '@/screens/contact/Contact';
import Contacts from '@/screens/contact/Contacts';
import NewContact from '@/screens/contact/NewContact';
import SearchContact from '@/screens/contact/SearchContact';
import Home from '@/screens/index/Home';
import Index from '@/screens/index/Index';
import Setting from '@/screens/setting/Setting';
import SettingDetail from '@/screens/setting/SettingDetail';
import appStore from '@/store/store';

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
    { name: 'SearchContact', elem: SearchContact },
    { name: 'Setting', elem: Setting },
    { name: 'SettingDetail', elem: SettingDetail },
    { name: 'Signup', elem: Signup },
  ];

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
