import { createSlice } from '@reduxjs/toolkit';

import testApiConnection from '../thunks/testApiConnection';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    isConnected: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(testApiConnection.fulfilled, (state) => {
        state.isConnected = true;
      })
      .addCase(testApiConnection.rejected, (state) => {
        state.isConnected = false;
      });
  },
});

export const selectApiIsConnected = (state) => state.api.isConnected;

export default apiSlice.reducer;
