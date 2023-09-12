import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import productsData from "@/data/products.json";

import { toast } from "react-toastify";

interface CompareState {
  items: number[];
  openModal: boolean;
}

const initialState = (): CompareState => {
  let compareData: string | null = null;
  if (typeof window !== 'undefined') {
    compareData = window.localStorage.getItem("compare");
  } else {
    // Handle the case where localStorage is not available
    console.error("localStorage is not available in this environment.");
  }

  let state = {
    items: [],
    openModal: false,
  }; // Track the total purchase value}
  if (compareData) {
    state = JSON.parse(compareData);
  }
  return state;
};

const ProductMap = new Map(
  productsData.products.map((product) => [product.product_id, product])
);

const compareSlice = createSlice({
  name: "compare",
  initialState: initialState(),
  reducers: {
    addToCompare: (state, action: PayloadAction<number>) => {
      const product_id = action.payload;
      const existingItem = state.items.includes(product_id);

      if (existingItem) {
        toast("Item already added to compare.");
        return;
      } else {
        if (state.items.length < 3) {
          state.items.push(product_id);
        } else {
          toast("Can add only 3 products compare.");
          return;
        }
      }

      localStorage.setItem("compare", JSON.stringify(state));
    },

    removeFromCompare: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item !== itemId);

      localStorage.setItem("compare", JSON.stringify(state));
    },

    clear: (state) => {
      state.items = [];
      localStorage.setItem("compare", JSON.stringify(state));
    },

    setModalStatus: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
      localStorage.setItem("compare", JSON.stringify(state));
    },
  },
});

export const { addToCompare, removeFromCompare, clear, setModalStatus } =
  compareSlice.actions;

export default compareSlice.reducer;
