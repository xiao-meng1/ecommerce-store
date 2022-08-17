import { createSlice } from '@reduxjs/toolkit';

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState: {
    isActive: false,
  },
  reducers: {
    toggleOverlayOn: (state) => {
      state.isActive = true;
    },
    toggleOverlayOff: (state) => {
      state.isActive = false;
    },
  },
});

export const { toggleOverlayOn, toggleOverlayOff } = overlaySlice.actions;

export const selectOverlayIsActive = (state) => state.overlay.isActive;

export default overlaySlice.reducer;
