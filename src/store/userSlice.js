import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    id : "",
    name : "",
    email : "",    
    mobile_number : "",
    default_address : "",
    orderHistory : []    
}

const userSlice  = createSlice({
    name : 'user',
    initialState : initialValue,
    reducers : {
        setUserDetails : (state,action) =>{
            state.id = action.payload?.id
            state.name  = action.payload?.name
            state.email = action.payload?.email            
            state.mobile_number = action.payload?.mobile_number         
            state.default_address = action.payload?.default_address
            state.orderHistory = action.payload?.orderHistory
            
        },
        
        logout : (state)=>{
            state.id = ""
            state.name  = ""
            state.email = ""            
            state.mobile_number = ""           
            state.default_address=""
            state.orderHistory = []            
        },
    }
})

export const { setUserDetails, logout } = userSlice.actions

export default userSlice.reducer