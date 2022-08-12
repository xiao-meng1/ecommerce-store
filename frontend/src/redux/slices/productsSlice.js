import { createSlice } from '@reduxjs/toolkit';
import fetchProducts from '../thunks/fetchProducts';
import fetchProductById from '../thunks/fetchProductById';
import fetchProductImageById from '../thunks/fetchProductImageById';

export default createSlice({
  name: 'products',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newEntities = {};

        action.payload.forEach((product) => {
          newEntities[product._id] = product;
        });
        state.entities = newEntities;
        state.isIdle = true;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const newEntities = {};
        const product = action.payload;

        newEntities[product._id] = product;
        state.entities = newEntities;
        state.isIdle = true;
      })
      .addCase(fetchProductImageById.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchProductImageById.fulfilled, (state, action) => {
        const item = action.payload;
        const { productId, image } = item;

        state.entities[productId].image = image;
        state.isIdle = true;
      });
  },
});

export const selectProducts = (state) => state.products.entities;
