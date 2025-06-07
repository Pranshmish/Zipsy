import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [], // Stores product IDs
     // Stores quantities corresponding to cart items
};

const cartSlice = createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        handleAddItemCart: (state, action) => {
            const { productId,outletId } = action.payload;
            const existingItem = state.cart.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item exists
            } else {
                state.cart.push({ productId,outletId:outletId, quantity: 1 }); // Add new item
            }
        },

        handleRemoveItemCart: (state, action) => {
            const { outletId } = action.payload;
            state.cart = state.cart.filter(item => item.outletId !== outletId);
        },

        updateItemCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cart.find(item => item.productId === productId);

            if (item) {
                item.quantity = quantity; // Update quantity
                if (item.quantity <= 0) {
                    state.cart = state.cart.filter(item => item.productId !== productId);
                }
            }
        },
        handleCartFlush: (state) => {
            state.cart = []; // Resets the cart to an empty array
        }
    }
});

export const { handleAddItemCart, handleRemoveItemCart, updateItemCart ,handleCartFlush} = cartSlice.actions;

export default cartSlice.reducer;
