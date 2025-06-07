import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    orders:[]
    //orderedItem : [],
    //orderQuantity:[],
    //isCancelled:false,
    //time:"30",

}

const orderSlice = createSlice({
    name : 'order',
    initialState : initialValue,
    reducers : {
        setOrderData : (state,action)=>{
            state.orders.push(action.payload)
        },
        removeOneOrderData: (state, action) => {
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

export const {setOrderData , removeOneOrderData,handleOrderConfirmed} = orderSlice.actions

export default orderSlice.reducer