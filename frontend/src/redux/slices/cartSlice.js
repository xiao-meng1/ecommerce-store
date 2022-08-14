import { createSlice, createSelector } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
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
    incrementItemQuantityByAmount: (state, action) => {
      const { id, amount } = action.payload;
      const newItems = state.items.map((item) => {
        if (item.id === id) {
          const quantity = item.quantity + amount;

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
  incrementItemQuantityByAmount,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemById = (id) =>
  createSelector(selectCartItems, (items) =>
    items.find((item) => item.id === id)
  );

export default cartSlice.reducer;
