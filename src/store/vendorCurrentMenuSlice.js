import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    productInfo : []
}

const vendorCurrentMenuSlice = createSlice({
    name : 'currentMenu',
    initialState : initialValue,
    reducers : {
        handleAddCurrentMenu : (state,action)=>{
            state.productInfo = [...action.payload]
        },
        handleFlushCurrentMenu: (state) => {
            state.productInfo = []; // Resets the cart to an empty array
        },
        handleIsAvailableStock:(state,action)=>{
            const {productId,status}=action.payload;
            const profuctInfo=state.productInfo.find(product=>product.productId==productId)
            profuctInfo.isAvailableStock=status; 
            
        }
    }
})

export const {handleAddCurrentMenu,handleFlushCurrentMenu,handleIsAvailableStock} = vendorCurrentMenuSlice.actions

export default vendorCurrentMenuSlice.reducer