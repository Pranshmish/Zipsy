import  { useEffect, useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { handleAddItemCart,updateItemCart } from "../store/cartSlice.js";
import { FaMinus, FaPlus } from "react-icons/fa6";
//import { datalist } from 'framer-motion/client';

const AddToCartButton = ({ data }) => {
    const dispatch=useDispatch();
    const cartData=useSelector(state=>state.cartItem.cart)
    const products=useSelector(state=>state.product.products);
    const [isAvailableCart, setIsAvailableCart] = useState(false);
    const [qty, setQty] = useState(0);
    const [cartItemDetails,setCartItemsDetails] = useState();
    const [product,setProduct]=useState({
        id:"",
        name:"",
        outletId:""
    });
    

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            const outletId=product.outletId;
            const productId=data.productId;
            dispatch(handleAddItemCart(productId,outletId))
        } catch (error) {
            console.log(error)
        } 
    }


    //checking this item in cart or not
    

    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
    
       dispatch(handleAddItemCart(cartItemDetails?.productId,product.outletId))   
       
    }

    const decreaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()       
        dispatch(updateItemCart(cartItemDetails?.productId,qty-1))        
    }

    useEffect(() => {
        const p=products.find(item=>item.id==data.productId);
        setProduct({
            id:p.id,
            name:p.name,
            outletId:p.outletId
        })
        console.log(`Add to cart button of ${p.outletId} and ${data.productId}`)
        const checkingitem = cartData.some(item => item.productId === data.productId)
        setIsAvailableCart(checkingitem)

        const proDuct = cartData.find(item => item.productId === data.productId)
        setQty(proDuct?.quantity)
        setCartItemsDetails(proDuct)
    }, [data, cartData])


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