import { createSlice, createSelector } from '@reduxjs/toolkit';
import fetchProducts from '../thunks/fetchProducts';
import fetchProductById from '../thunks/fetchProductById';
import fetchProductImageById from '../thunks/fetchProductImageById';

export const productSlice = createSlice({
  name: 'products',
  initialState: { isIdle: true, entities: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isIdle = true;
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
      .addCase(fetchProductById.rejected, (state) => {
        state.isIdle = true;
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
      .addCase(fetchProductImageById.rejected, (state) => {
        state.isIdle = true;
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

export const selectProductById = (id) =>
  createSelector(selectProducts, (products) =>
    Object.keys(products).find((key) => key === id) ? products[id] : null
  );

export const selectProductsIsIdle = (state) => state.products.isIdle;

export default productSlice.reducer;
