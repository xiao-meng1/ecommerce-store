import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const { id, quantity } = item;

      state.items.push({ id, quantity });
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const newItems = state.items.filter((item) => item.id !== id);

      state.items = newItems;
    },
    incrementItemQuantity: (state, action) => {
      const id = action.payload;
      const newItems = state.items.map((item) => {
        if (item.id === id) {
          const quantity = item.quantity + 1;

          return {
            ...item,
            quantity,
          };
        }
        return item;
      });

      state.items = newItems;
    },
    decrementItemQuantity: (state, action) => {
      const id = action.payload;
      const newItems = state.items.map((item) => {
        if (item.id === id) {
          const quantity = item.quantity - 1;

          return {
            ...item,
            quantity,
          };
        }
        return item;
      });

      state.items = newItems;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
