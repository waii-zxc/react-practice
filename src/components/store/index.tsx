import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './Slicer/basketSlice';
import userReducer from './Slicer/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
