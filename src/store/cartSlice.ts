import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { ICartItem, IInventory } from "@/types/Product";
import productsData from "@/data/products.json";
import inventoryData from "@/data/inventory.json";

import { toast } from "react-toastify";

interface CartState {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  openModal: boolean;
}

const initialState = (): CartState => {
  let cartData: string | null = null;
  if (typeof window !== "undefined") {
    cartData = window.localStorage.getItem("cart");
  } else {
    // Handle the case where localStorage is not available
    console.error("localStorage is not available in this environment.");
  }

  let state = {
    items: [],
    totalItems: 0, // Track the total number of items in the cart
    totalPrice: 0,
    openModal: false,
  }; // Track the total purchase value}
  if (cartData) {
    state = JSON.parse(cartData);
  }
  return state;
};

const ProductMap = new Map(
  productsData.products.map((product) => [product.product_id, product])
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState(),
  reducers: {
    updateCart: (state, action: PayloadAction<ICartItem>) => {
      const { product_id, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );
      const product = ProductMap.get(product_id);
      const max_cart_quantity = product?.max_cart_quantity || 0;
      const stock = (inventoryData as IInventory)[product_id] || 0;

      if (existingItem && product) {
        // Check if adding more items exceeds available stock
        if (existingItem.quantity + quantity > stock) {
          toast("Cannot add more items than available in stock.");
          return;
        }

        // Check if adding more items exceeds the maximum quantity
        if (existingItem.quantity + quantity > max_cart_quantity) {
          toast(`Max quantity can only be ${max_cart_quantity}`);
          return;
        }

        // if quantity becomes 0 remove from cart;
        if (existingItem.quantity + quantity == 0) {
          state.items = state.items.filter(
            (item) => item.product_id !== product_id
          );
        }

        existingItem.quantity += quantity;

        // Update total number of items
        state.totalItems += quantity;
        // Update total purchase value
        state.totalPrice += (product?.price || 0) * quantity;
      } else {
        // Check if adding items exceeds available stock
        if (quantity > stock) {
          toast("Cannot add more items than available in stock.");
          return;
        }

        // Check if adding items exceeds the maximum quantity
        if (quantity > max_cart_quantity) {
          toast(`Max quantity can only be ${max_cart_quantity}`);
          return;
        }

        state.items.push(action.payload);
        // Update total number of items
        state.totalItems += quantity;
        // Update total purchase value
        state.totalPrice += (product?.price || 0) * quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const removedItem = state.items.find(
        (item) => item.product_id === itemId
      );

      if (removedItem) {
        const product = ProductMap.get(itemId);

        // Remove the item from cart
        state.items = state.items.filter((item) => item.product_id !== itemId);
        // Update total number of items
        state.totalItems -= removedItem.quantity;
        // Update total purchase value
        state.totalPrice -= (product?.price || 0) * removedItem.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    setModalStatus: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  updateCart,
  removeFromCart,
  clearCart,
  setModalStatus,
} = cartSlice.actions;

const selectCartItems = (state: RootState) => state.cart.items;
const selectProductMap = (state: RootState) => ProductMap;

const memoizedSelectCartItems = createSelector(
  [selectCartItems, selectProductMap],
  (cartItems: ICartItem[], productMap) => {
    return cartItems.map((item) => ({
      ...item,
      ...productMap.get(item.product_id),
    }));
  }
);

export { memoizedSelectCartItems as selectCartItems };
export default cartSlice.reducer;
