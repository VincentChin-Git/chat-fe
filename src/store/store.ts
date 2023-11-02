import { configureStore } from '@reduxjs/toolkit';

import sliceTheme from './sliceTheme';
import sliceUser from './sliceUser';

const appStore = configureStore({
  reducer: {
    user: sliceUser,
    theme: sliceTheme,
  },
});

export default appStore;
