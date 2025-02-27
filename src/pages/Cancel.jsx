//import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//import { database } from "../appwrite/dbConfig.js";
import { removeOneOrderData } from "../store/orderSlice";

const Cancel = () => {
  const params=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [orderId,setOrderId]=useState("");
  const orderData=useSelector(state=>state.order.orders);

  const handleConfirmCancel=(orderId)=>{
    if (orderData.length ==1){
      dispatch(removeOneOrderData(orderId));
      navigate("./");
    }else{      
      dispatch(removeOneOrderData(orderId));
      navigate("./order-tracking");
    }
  }

  useEffect(()=>{
    setOrderId(params.orderId)
  },[])

  return (
    <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-red-800 font-bold text-lg text-center'>Do you want to cancel the Order ?</p>
        <div className='p-2'>
          <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>                                            
              <button onClick={handleConfirmCancel(orderId)} className='flex items-center gap-1'>
                  Cancel Order                  
              </button>
          </div>
        </div>
    </div>
  )
}

export default Cancel