import { useEffect, useState } from 'react'

import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useDispatch, useSelector } from 'react-redux'
import  database  from "../appwrite/dbConfig.js";
import { useNavigate } from 'react-router-dom'
import { handleRemoveItemCart } from '../store/cartSlice.js'
import { setOrderData } from '../store/orderSlice.js'



const CheckoutPage = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  
  const [openAddress, setOpenAddress] = useState(false)
  const address = useSelector(state => state.addresses.address)
  const userId =useSelector(state=>state.user.id)
  
  const [addressList,setAddressList]=useState(address);
  //const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const productData = useSelector(state => state.product.products)
  const outletData=useSelector(state=>state.product.allOutlet)
  
 
  const getOutletSeparatedProducts=()=>{
    const outletMap = new Map();

    productData.forEach(product => {
        if (!outletMap.has(product.outletId)) {
            outletMap.set(product.outletId, []);
        }
        outletMap.get(product.outletId).push(product);
    });

    return Array.from(outletMap.values());
  }

  const outletSeparatedProducts=getOutletSeparatedProducts();

  const totalQuantityByOutletId=(outletId)=>{
    return cartItemsList
        .filter(item => item.outletId === outletId)  // Get items with matching outletId
        .reduce((sum, item) => sum + item.productQuantity, 0); // Sum up productQuantity 
  }

  const priceByProductId=(productID)=>{
    const product=productData.find(item=>item.id==productID);
    return product.price;
  }

  const totalPriceByOutletId=(outletId)=>{
    const cartByOutlet=cartItemsList.filter(item=>item.outletId === outletId);
    return cartByOutlet.reduce((totalPrice,item)=> totalPrice+(priceByProductId(item.productID)*item.productQuantity),0);
  }

  const outletNameByOutletId=(outletId)=>{
    const outlet=outletData.find(item=>item.id==outletId)
    return outlet.name;
  }

  const platformFee=(outletId)=>{
    const totalPrice=totalPriceByOutletId(outletId);
     if (totalPrice<100){
      return 0;
    }else if(totalPrice>= 100 && totalPrice<=200){
       return 5;
    } else if (totalPrice>200 && totalPrice<=300){
      return 7;
    } else if(totalPrice>300 && totalPrice <= 500){
      return 9;
    } else if(totalPrice>500 ){
      return 13;
    }else{
      return 15;
    }
  }

  const handlePlacedOrder=async(outletId,amount)=>{
    const productIdsOfAOutlet=[]
    
    
    const cartDataOfAnOutletId=cartItemsList.filter(item => item.outletId==outletId)
    cartDataOfAnOutletId.map((item)=>{
      productIdsOfAOutlet.push(item.productId)
    })

    const productQuantityOfAnOutlet=[];
    cartDataOfAnOutletId.map((item)=>{
      productQuantityOfAnOutlet.push(item.quantity)
    })
    const orderData={
      userId:userId,
      outletId:outletId,
      productData:productIdsOfAOutlet,
      totalAmount:(totalPriceByOutletId(outletId)+platformFee(outletId)),
      productQuantity:productQuantityOfAnOutlet,
      deliveryAddress:addressList,
      platformFee:platformFee(outletId),
      isFulfilled:false
    }
    

    const orderId=await database.placeOrder(orderData);  
    // update productInfo -> todaySale, totalSale
    
    // Clear store's slices ->cartSlice ,addressSlice
    dispatch(handleRemoveItemCart(outletId))
    const orderSliceData={
      orderId:orderId,
      outletId:outletId,
      amount:amount,
      orderedItem:productIdsOfAOutlet,
      orderedQuantity:productQuantityOfAnOutlet,
      isCancelled:false,
      time:"30"
    }
    dispatch(setOrderData(orderSliceData))
    navigate("/order-tracking")
  }

  
 useEffect(()=>{
  setAddressList(address)
  
 },[addressList])

  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          {/***address***/}
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            
              
                  <label htmlFor={"address" } >
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      
                      <div>
                        <p>{addressList}</p>                        
                      </div>
                    </div>
                  </label>
                )
              
            
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>



        </div>
        {outletSeparatedProducts[0] &&(
          outletSeparatedProducts.map((outletProducts) => {
            return(
              <div key={outletProducts[0].id} className='w-full max-w-md bg-white py-4 px-2'>
                {/**summary**/}
                <h3 className='text-lg font-semibold'>{outletNameByOutletId(outletProducts[0].outletId)}</h3>
                <div className='bg-white p-4'>
                  <h3 className='font-semibold'>Bill details</h3>
                  <div className='flex gap-4 justify-between ml-1'>
                    <p>Items total</p>
                    <p className='flex items-center gap-2'><span>{DisplayPriceInRupees(totalPriceByOutletId(outletProducts[0].outletId))}</span></p>
                  </div>
                  <div className='flex gap-4 justify-between ml-1'>
                    <p>Quantity total</p>
                    <p className='flex items-center gap-2'>{totalQuantityByOutletId(outletProducts[0].outletId)} item</p>
                  </div>
                  <div className='flex gap-4 justify-between ml-1'>
                    <p>Handling Charge</p>
                    <p className='flex items-center gap-2'>{platformFee(outletProducts[0].outletId)}</p>
                  </div>
                  <div className='flex gap-4 justify-between ml-1'>
                    <p>Delivery Charge</p>
                    <p className='flex items-center gap-2'>Free</p>
                  </div>
                  <div className='font-semibold flex items-center justify-between gap-4'>
                    <p >Grand total</p>
                    <p>{DisplayPriceInRupees(totalPriceByOutletId(outletProducts[0].outletId)+platformFee(outletProducts[0].outletId))}</p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-4'>  
                  {totalPriceByOutletId(outletProducts[0].outletId)<100?
                  <button className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white' >
                    {`Order above ${DisplayPriceInRupees(100)}`}</button>:
                    <button className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'
                     onClick={handlePlacedOrder(outletProducts[0].outletId,totalPriceByOutletId(outletProducts[0].outletId)+platformFee(outletProducts[0].outletId))}>
                    Place Order</button>}
                </div>
              </div>
            )
          })
        )}        
        
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage