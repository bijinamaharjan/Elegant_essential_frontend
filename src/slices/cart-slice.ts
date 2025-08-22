import { createSlice } from "@reduxjs/toolkit";

// Function to load state from local storage
export const loadCartState = (): CartStateType | undefined => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveCartState = (state: CartStateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch {
    // ignore write errors
  }
};

export type CartItemType = {
  productItem: {
    id: string;
    type: string;
    name: string;
    image: string;
    price: number;
  };
  count: number;
  price: number;
};

export type CartStateType = {
  totalItemCount: number;
  items: CartItemType[];
  totalPrice: number;
};

const initialCartState: CartStateType = {
  totalItemCount: 0,
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action: { payload: { item: CartItemType } }) {
      const itemToUpdate = state.items.find(
        (theItem) =>
          theItem.productItem.id === action.payload.item.productItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.count += 1;
        itemToUpdate.price += action.payload.item.productItem.price;
        state.totalItemCount += 1;
        state.totalPrice += action.payload.item.productItem.price;
      } else {
        state.items.push(action.payload.item);
        state.totalItemCount += 1;
        state.totalPrice += action.payload.item.productItem.price;
      }
      saveCartState(state);
    },
    removeItemFromCart(state, action: { payload: { item: CartItemType } }) {
      const itemToUpdate = state.items.find(
        (theItem) =>
          theItem.productItem.id === action.payload.item.productItem.id
      );
      if (itemToUpdate) {
        if (itemToUpdate.count === 1) {
          let newStateItems = state.items.filter(
            (item) => item.productItem.id !== itemToUpdate.productItem.id
          );

          state.items = newStateItems;
        }
        itemToUpdate.count -= 1;
        itemToUpdate.price -= action.payload.item.productItem.price;
        state.totalItemCount -= 1;
        state.totalPrice -= action.payload.item.productItem.price;
      } else {
        state.totalItemCount -= 1;
        state.totalPrice -= action.payload.item.productItem.price;
      }
      saveCartState(state);
    },
    removeAllItemsFromcart(state, action: { payload: { item: CartItemType } }) {
      const itemToUpdate = state.items.find(
        (theItem) =>
          theItem.productItem.id === action.payload.item.productItem.id
      );

      if (itemToUpdate) {
        state.totalItemCount = state.totalItemCount - itemToUpdate.count;
        const priceToBeDeduced =
          action.payload.item.count * itemToUpdate.productItem.price;
        state.totalPrice = state.totalPrice - priceToBeDeduced;
        let newStateItems = state.items.filter(
          (item) => item.productItem.id !== itemToUpdate.productItem.id
        );

        state.items = newStateItems;
      }
      saveCartState(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalItemCount = 0;
      state.totalPrice = 0;
      saveCartState(state);
    },
    setCart(state, action: { payload: CartStateType }) {
      state.items = action.payload.items;
      state.totalItemCount = action.payload.totalItemCount;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export default cartSlice;

export const cartSliceActions = cartSlice.actions;
