import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    loadingProducts : false,
    loadingCategory : false,
    loadingOutlets : false,
    
    allCategory : [],
    allOutlet:[],
    products : [],
    productInfo:[],

    bestsellerProducts:[],
    trendingProducts:[]
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory : (state,action)=>{
            state.allCategory =action.payload
        },
        setLoadingProducts : (state,action)=>{
            state.loadingProducts=action.payload
        },
        setLoadingCategory : (state,action)=>{
            state.loadingCategory = action.payload
        },
        setLoadingOutlets : (state,action)=>{
            state.loadingOutlets = action.payload
        },
        setAllOutlet : (state,action)=>{
            state.allOutlet =action.payload
        },
        setAllProducts : (state,action)=>{
            state.products = action.payload
        },
        setAllProductInfo : (state,action)=>{
            state.productInfo = action.payload
        },
        setTrendingProducts : (state,action)=>{
            state.trendingProducts = action.payload
        },
        setBestsellerProducts : (state,action)=>{
            state.bestsellerProducts = action.payload
        },
        
    }
})

export const  {setBestsellerProducts,setLoadingProducts,setTrendingProducts, setAllCategory,setAllOutlet,setLoadingCategory ,setLoadingOutlets,setAllProducts,setAllProductInfo} = productSlice.actions

export default productSlice.reducer