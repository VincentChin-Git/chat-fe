import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import IUser from '../types/user';

const initialState = {
  _id: undefined,
  username: undefined,
  mobile: undefined,
  password: undefined,
  nickname: undefined,
  avatar: undefined,
  describe: undefined,
  status: undefined,
  lastActive: undefined,
  createdAt: undefined,
  updatedAt: undefined,
} as IUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { user, token }: { user?: IUser; token?: string } = action.payload;
      if (!user || !token) return;
      Object.keys(user).forEach(k => {
        state[k] = user[k];
      });
      AsyncStorage.setItem('userAuthToken', token);
      console.log('login success');
    },

    logoutAction: state => {
      const tempState = JSON.parse(JSON.stringify(state));
      Object.keys(tempState).forEach(k => {
        state[k] = undefined;
      });
      AsyncStorage.removeItem('userAuthToken');
      console.log('logout success');
    },

    changeUserInfoAction: (state, action) => {
      const { k, v } = action.payload;
      state[k] = v;
    },
  },
});

export const { loginAction, logoutAction, changeUserInfoAction } =
  userSlice.actions;
export default userSlice.reducer;
