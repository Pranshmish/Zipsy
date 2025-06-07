import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    address : ""
}

const addressSlice = createSlice({
    name : 'address',
    initialState : initialValue,
    reducers : {
        handleAddAddress : (state,action)=>{
            state.addressList = action.payload
        },
        handleAddressFlush: (state) => {
            state.cart = ""; // Resets the cart to an empty array
        }
    }
})

export const {handleAddAddress,handleAddressFlush} = addressSlice.actions

export default addressSlice.reducer