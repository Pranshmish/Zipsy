import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    orders:[]
}

const vendorCurrentOrderSlice = createSlice({
    name : 'currentOrders',
    initialState : initialValue,
    reducers : {
        setCurrentOrderData : (state,action)=>{
            state.orders=[...action.payload]
        },
        removeOneCurrentOrder: (state, action) => {
            const orderIdToRemove = action.payload;
            state.orders = state.orders.filter(order => order.orderId !== orderIdToRemove);
        },
        handleOrderConfirmed:(state,action)=>{
            const {orderId,isConfirmed} = action.payload;
            const order=state.orders.find(order=>order.orderId==orderId)
            order.isConfirmed=isConfirmed;
        }
    }
})

export const {setCurrentOrderData , removeOneCurrentOrder,handleOrderConfirmed} = vendorCurrentOrderSlice.actions

export default vendorCurrentOrderSlice.reducer