import { configureStore } from '@reduxjs/toolkit';

import sliceUser from '@/store/sliceUser';

const appStore = configureStore({
  reducer: {
    user: sliceUser,
  },
});

export default appStore;
