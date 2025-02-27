import  { useEffect, useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { handleAddItemCart,updateItemCart } from "../store/cartSlice.js";
//import { useGlobalContext } from '../provider/GlobalProvider'
//import Axios from '../utils/Axios'
//import SummaryApi from '../common/SummaryApi'
//import toast from 'react-hot-toast'
//import AxiosToastError from '../utils/AxiosToastError'
//import Loading from './Loading'

import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const dispatch=useDispatch();
    const cartData=useSelector(state=>state.cartItem.cart)
    const products=useSelector(state=>state.product.products);
    //const [loading, setLoading] = useState(false)    
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails,setCartItemsDetails] = useState()

    const product=products.find(item=>item.id==data.productID);

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            //setLoading(true)

            dispatch(handleAddItemCart(data.productID))

            /*const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }*/
        } catch (error) {
            console.log(error)
        } 
    }


    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartData.some(item => item.productId === data.productID)
        setIsAvailableCart(checkingitem)

        const product = cartData.find(item => item.productId === data.productID)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartData])


    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
    
       dispatch(handleAddItemCart(cartItemDetails?.productID,product.outletID))   
       
    }

    const decreaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()       
        dispatch(updateItemCart(cartItemDetails?.productID,qty-1))        
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                       Add {/*loading ? <Loading /> : "Add"*/}
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton