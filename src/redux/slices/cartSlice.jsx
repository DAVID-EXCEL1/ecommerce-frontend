import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find((x) => x._id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find((x) => x._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // if quantity is 1 and user clicks -, remove item
                state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            }
        }

    },
});



export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
} = cartSlice.actions;
export default cartSlice.reducer;
