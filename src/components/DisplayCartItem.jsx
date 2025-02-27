//import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
//import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/zipSy_eatry_logo.png'
import toast from 'react-hot-toast'
import { useEffect,useState } from 'react';



const DisplayCartItem = ({close}) => {
    
    const cartItem  = useSelector(state => state.cartItem.cart)
    const productData=useSelector(state=>state.product.products)
    const productInfoData=useSelector(state=>state.product.productInfo)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [platformFee, setPlatformFee]=useState(0);
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)

     
    const cartProducts=productData.filter(product =>
        cartItem.some(category => category.productId === product.id)
        );
    const cartProductInfo=productInfoData.filter(product =>
        cartItem.some(cart => cart.productId === product.productID)
      );    

    const redirectToCheckoutPage = ()=>{
        if(user?.id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        navigate("./checkout")
        toast("Please Login")
    }
    const getProductbyProductId=(productId)=>{
        return productData.find(item=>item.id==productId)
    }

    const getTotalPrice = ()=>{
        return cartItem.reduce((totalPrice,curr)=>{
            totalPrice+(curr.productQuantity * (getProductbyProductId(curr.productId).price))
        },0)
    }
    const getTotalQuantity=()=>{
        return cartItem.reduce((totalQuantity,curr)=>{
            totalQuantity+curr.quantity
        },0)
    }

    const getQuantityByProductId=(productId)=> {
        const item = cartItem.find(item => item.productID === productId);
        return item ? item.quantity : null; // Return quantity if found, otherwise return null
    }

    const getProductInfoByProductId=(productId)=>{
        return cartProductInfo.find(item=>item.productID==productId)
    }
 
    useEffect(()=>{
        setTotalQty(getTotalQuantity())  
        setTotalPrice(getTotalPrice())
        if (totalPrice<200){
            setPlatformFee(5);
          } else if (totalPrice>200 && totalPrice<=300){
            setPlatformFee(7);
          } else if(totalPrice>300 && totalPrice <+ 500){
            setPlatformFee(9)
          } else if(totalPrice>500 ){
            setPlatformFee(13)
          }else{
            setPlatformFee(15)
          }
    },[totalPrice])

  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {/***display items */}
                {
                    cartProducts[0] ? (
                        <>
                            {/*<div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                            </div>*/}
                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartProducts[0] && (
                                            cartProducts.map((item)=>{
                                                return(
                                                    <div key={item?.id+"cartItemDisplay"} className='flex  w-full gap-4'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                            <img
                                                                src={item?.image[0]}
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.name}</p>
                                                            <p className='text-neutral-400'>{item?.unit}</p>
                                                            <p className='font-semibold'>{DisplayPriceInRupees(item?.price*getQuantityByProductId(item.id))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={getProductInfoByProductId(item.id)}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                            </div>
                            <div className='bg-white p-4'>
                                <h3 className='font-semibold'>Bill details</h3>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Items total</p>
                                    <p className='flex items-center gap-2'><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Quantity total</p>
                                    <p className='flex items-center gap-2'>{totalQty} item</p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Handling Charge</p>
                                    <p className='flex items-center gap-2'>platformFee</p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Delivery Charge</p>
                                    <p className='flex items-center gap-2'>Free</p>
                                </div>
                                <div className='font-semibold flex items-center justify-between gap-4'>
                                    <p >Grand total</p>
                                    <p>{DisplayPriceInRupees(totalPrice+platformFee)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img
                                src={imageEmpty}
                                className='w-full h-full object-scale-down' 
                            />
                            <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                        </div>
                    )
                }
                
            </div>

            {
                cartProducts[0] && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                            <div>
                                {DisplayPriceInRupees(totalPrice+platformFee)}
                            </div>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed
                                <span><FaCaretRight/></span>
                            </button>
                        </div>
                    </div>
                )
            }
            
        </div>
    </section>
  )
}

export default DisplayCartItem