import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import { IThemeOption } from '@/types/theme';

const initialState = { themeColor: '#ff4262', theme: IThemeOption.LIGHT };

const themeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setThemeColorAction: (state, action) => {
      const themeColor = action.payload as string;
      if (themeColor.length === 7 && themeColor[0] === '#') {
        state.themeColor = themeColor;

        AsyncStorage.setItem('themeColor', themeColor);
      }
    },

    setThemeAction: (state, action) => {
      const theme = action.payload;
      if ([IThemeOption.LIGHT, IThemeOption.DARK].includes(theme)) {
        state.theme = theme;

        AsyncStorage.setItem('theme', theme);
      }
    },
  },
});

export const { setThemeColorAction, setThemeAction } = themeSlice.actions;
export default themeSlice.reducer;
