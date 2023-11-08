import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import userApi from '../../api/user';
import Loading from '../../components/common/Loading';
import { setThemeAction, setThemeColorAction } from '../../store/sliceTheme';
import { loginAction } from '../../store/sliceUser';
import IUser from '../../types/user';

const Index = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const handleGetUserByToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userAuthToken');
      if (!token) return handleNoLogin();
      console.log('123');
      const userInfo = (await userApi.getUserInfoByToken()) as {
        userData: IUser;
        token: string;
      };
      console.log(userInfo, 'get user info by token');

      // has userInfo
      if (userInfo?.userData?._id) {
        dispatch(
          loginAction({ user: userInfo.userData, token: userInfo.token }),
        );

        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
      // no userInfo
      else handleNoLogin();
    } catch (error) {
      // await AsyncStorage.removeItem('userAuthToken');
      // handleNoLogin();
      console.error(error, 'errGetUserInfo');
    }
  };

  const handleNoLogin = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const setupTheme = async () => {
    try {
      const themeColor = await AsyncStorage.getItem('themeColor');
      if (themeColor) dispatch(setThemeColorAction(themeColor));

      const theme = await AsyncStorage.getItem('theme');
      if (theme) dispatch(setThemeAction(theme));
    } catch (error) {
      console.error(error, 'setupThemeErr');
    }
  };

  useEffect(() => {
    setupTheme();
    handleGetUserByToken();
  }, []);

  return <Loading />;
};

export default Index;
