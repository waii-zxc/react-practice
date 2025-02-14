import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  selectedRegion: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload ? {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
      } : null;
    },
    setSelectedRegion(state, action) {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setUser, setSelectedRegion } = userSlice.actions;
export default userSlice.reducer;
