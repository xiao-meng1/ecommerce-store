import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import overlayReducer from './slices/overlaySlice';
import apiReducer from './slices/apiSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    overlay: overlayReducer,
    api: apiReducer,
  },
});
