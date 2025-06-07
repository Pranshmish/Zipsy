import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    vendor:{
        outletId:"",
        name:"",
        isOutletOpen:null,
        outletTiming:"",       
             
    }
}

const vendorSlice = createSlice({
    name : 'vendorData',
    initialState : initialValue,
    reducers : {
        setVendorData : (state,action)=>{
            const data=action.payload
            state.vendor={
                outletId:data.outletId,
                name:data.name,
                isOutletOpen:data.isOutletOpen,
                outletTiming:data.outletTiming,
               
            }
        },
        updateVendorData: (state, action) => {
            const data = action.payload;
            state.vendor ={
                outletId:data.outletId,
                name:data.name,
                isOutletOpen:data.isOutletOpen,
                outletTiming:data.outletTiming,
                
            }
        },
        handleOutletStatus:(state,action)=>{
            const outletStatus=action.payload;
            state.vendor={
                ...state.vendor,
                isOutletOpen:outletStatus
            }
        },
        flushVendorData:(state)=>{
            state.vendor={
                outletId:"",
                name:"",
                isOutletOpen:null,
                outletTiming:"",
                
            };
        }
    }
})

export const {setVendorData,updateVendorData,flushVendorData,handleOutletStatus} = vendorSlice.actions

export default vendorSlice.reducer