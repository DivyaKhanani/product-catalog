import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import layoutReducer from './layoutSlice';
import compareReducer from './compareSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    layout: layoutReducer,
    compare: compareReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
