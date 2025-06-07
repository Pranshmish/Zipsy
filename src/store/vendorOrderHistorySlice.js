import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    products:[],
    orders:[]
    //orderedItem : [],
    //orderQuantity:[],
    //isCancelled:false,
    //time:"30",

}

const vendorOrderHistorySlice = createSlice({
    name : 'orderHistory',
    initialState : initialValue,
    reducers : {
        setOrderHistoryData : (state,action)=>{
            state.orders=[...action.payload]
        },
        setProductData : (state,action)=>{
            state.products=[...action.payload]
        },
        flushProductData: (state) => {
            state.products=[]
        },
        flushHistoryOrderData: (state) => {
            state.orders=[]
        }        
    }
})

export const {setOrderHistoryData ,setProductData,flushProductData,flushHistoryOrderData} = vendorOrderHistorySlice.actions

export default vendorOrderHistorySlice.reducer