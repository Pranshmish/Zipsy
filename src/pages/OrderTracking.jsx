//import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import  database  from "../appwrite/dbConfig.js";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
//import AddToCartButton from './AddToCartButton'
//import { pricewithDiscount } from '../utils/PriceWithDiscount'
//import imageEmpty from '../assets/empty_cart.webp'
//import toast from 'react-hot-toast'
import { useEffect} from 'react';
import { handleOrderConfirmed } from '../store/orderSlice.js';

const OrderTracking = () => {
    const dispatch=useDispatch();
    const orderData  = useSelector(state => state.order.orders)
    const productData=useSelector(state=>state.product.products)
    //const productInfoData=useSelector(state=>state.product.productInfo)
    
    const navigate = useNavigate()
    //const [platformFee, setPlatformFee]=useState(0);

    const fetchHasOrderBeenConfirmed=async(orderId)=>{
        return await database.hasOrderBeenConfirmed(orderId);          
    } 

    const isOrderConfirmed=()=>{
        orderData.map((order)=>{
           const isConfirmed= fetchHasOrderBeenConfirmed(order.orderId);
           isConfirmed ? dispatch(handleOrderConfirmed(order.orderId,true)) : null
        })
    }
     
      

    const redirectToConfirmCancel=(orderID)=>{
        navigate(`./cancel/${orderID}`)
    }

    

    
    const getProductByProductId=(productId)=>{
        return productData.find(item=>item.id==productId)
    }
 
    useEffect(()=>{
        isOrderConfirmed()
    },[])

  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Order Tracking</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {
                    orderData[0]&&(
                        orderData.map((order)=>{
                            return(
                                <div key={order.orderId} className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        order.isConfirmed ?
                                        (<div className='bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold rounded-md shadow'>
                                            `✅ Order Confirmed by Vendor, Delivery in ${order.time}`
                                        </div>):
                                        (<div className='bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold rounded-md shadow'>
                                            Order not Confirmed yet by Vendor, Wait for few Minutes
                                        </div>)
                                    }
                                    <div  className='flex  w-full gap-4'>
                                        
                                            
                                        {(order.orderedItem).map((item,index)=>{
                                            return(    
                                                <>                                            
                                                <div key={item[index]} className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                    <img
                                                        src={getProductByProductId(item).image[0]}
                                                        className='object-scale-down'
                                                    />
                                                </div>
                                                <div className='w-full max-w-sm text-xs'>
                                                    <p className='text-xs text-ellipsis line-clamp-2'>{getProductByProductId(item).name}</p>
                                                    <p className='text-neutral-400'>{getProductByProductId(item).unit}</p>
                                                    <p className='font-semibold'>{order.orderedQuantity[index]}</p>
                                                    <p className='font-semibold'>{DisplayPriceInRupees(getProductByProductId(item).price*(order.orderedQuantity[index]))}</p>
                                                </div> 
                                                </>                                           
                                            )
                                        })}
                                        
                                        
                                    </div>
                                    <div className='bg-white p-4'>
                                        <h3 className='font-semibold'>Amount to Pay</h3>                                        
                                        <div className='font-semibold flex items-center justify-between gap-4'>
                                            <p >Grand total</p>
                                            <p>{DisplayPriceInRupees(order.amount)}</p>
                                        </div>
                                    </div>
                                    <div className='p-2'>
                                        <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>                                            
                                            <button onClick={redirectToConfirmCancel(order.orderId)} className='flex items-center gap-1'>
                                                Cancel Order
                                                <span><FaCaretRight/></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>   
                                 
                            )
                        })
                    )
                }
                
                
            </div>            
        </div>
    </section>
  )
}

export default OrderTracking