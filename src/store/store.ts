import { configureStore } from '@reduxjs/toolkit';

import sliceTheme from './sliceTheme';
import sliceUnreadMsg from './sliceUnreadMsg';
import sliceUser from './sliceUser';

const appStore = configureStore({
  reducer: {
    user: sliceUser,
    theme: sliceTheme,
    unread: sliceUnreadMsg,
  },
});

export default appStore;
