
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  itemId: number;
  name: string;
  price: number;
}

interface CartState {
  selectedItems: CartItem[];
}

const initialState: CartState = {
  selectedItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart(state, action: PayloadAction<CartItem>) {
      // Удаление старых данных из localStorage перед добавлением новых данных
      localStorage.removeItem('cartState');

      state.selectedItems = [
        ...state.selectedItems, action.payload
      ]
      localStorage.setItem('cartState', JSON.stringify(state));
    },

    clearCart(state) {
      state.selectedItems = [];
      localStorage.removeItem('cartState');
    },

    deleteItem(state, action: PayloadAction<number>) {
      // Ищем элемент с заданным itemId
      const itemIdToRemove = action.payload;
      const updatedItems = state.selectedItems.filter(item => item.itemId !== itemIdToRemove);

      state.selectedItems = updatedItems;

      localStorage.setItem('cartState', JSON.stringify({ selectedItems: updatedItems }));
    },

    loadCartState(state, action: PayloadAction<CartItem[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const { addToCart, clearCart, deleteItem, loadCartState } = cartSlice.actions;
export default cartSlice.reducer;

