// teamSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
  name: 'team',
  initialState: {
    selectedUserIds: []
  },
  reducers: {
    addUser: (state, action) => {
      state.selectedUserIds.push(action.payload);
    },
    removeUser: (state, action) => {
      state.selectedUserIds = state.selectedUserIds.filter(id => id !== action.payload);
    },
    clearSelectedUsers: (state) => {
      state.selectedUserIds = [];
    }
  }
});

export const { addUser, removeUser, clearSelectedUsers } = teamSlice.actions;

export const selectSelectedUserIds = state => state.team.selectedUserIds;

export default teamSlice.reducer;
