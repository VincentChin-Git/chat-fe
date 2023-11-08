import { createSlice } from '@reduxjs/toolkit';

import { IChatUnread } from '../types/chat';

const initialState = {
  unread: [],
} as { unread: IChatUnread[] };

const unreadMsgSlice = createSlice({
  name: 'unreadMsg',
  initialState,
  reducers: {
    addUnreadAction: (state, action) => {
      const unreadList: IChatUnread[] = action.payload;
      unreadList.forEach(unread => {
        const foundIndex = state.unread.findIndex(
          item => item.contactId === unread.contactId,
        );

        // append if not exist
        if (foundIndex === -1) {
          state.unread.push(unread);
        }
        // overwrite if exist
        else if (foundIndex > -1) {
          state.unread[foundIndex].unread = unread.unread;
        }
      });
    },
    removeUnreadAction: (state, action) => {
      const contactId: string = action.payload;
      const foundIndex = state.unread.findIndex(
        item => item.contactId === contactId,
      );
      if (foundIndex > -1) state.unread.splice(foundIndex, 1);
    },
  },
});

export const { addUnreadAction, removeUnreadAction } = unreadMsgSlice.actions;
export default unreadMsgSlice.reducer;
