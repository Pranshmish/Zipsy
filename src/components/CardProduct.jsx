import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddToCartButton from './AddToCartButton'
import { useDispatch, useSelector } from 'react-redux'

const CardProduct = ({data}) => {
  const dispatch = useDispatch()
  const allProductData = useSelector(state => state.product.products)
  const url = `/product/${data.productId}`
  const [productData, setProductData] = useState({})
  const [imageLoaded, setImageLoaded] = useState(false)
  
  useEffect(() => {
    const productData = allProductData.find(obj => obj.id === data.productId) || null;
    setProductData(productData)
  }, [dispatch])
    
  return (
    <Link 
      to={url} 
      className='group border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg cursor-pointer bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/20'
    >
      <div className='relative min-h-20 w-full max-h-24 lg:max-h-32 rounded-lg overflow-hidden bg-gray-50'>
        {!imageLoaded && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
          </div>
        )}
        <img 
          src={productData.image}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoaded(true)}
          alt={productData.name}
        />
      </div>
      
      <div className='flex items-center gap-1'>
        <div className='rounded-full text-xs w-fit px-2 py-0.5 text-green-600 bg-green-50 transition-colors duration-300 group-hover:bg-green-100'>
          30 min 
        </div>
      </div>
      
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 group-hover:text-primary transition-colors duration-300'>
        {productData.name}
      </div>
      
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base text-gray-600'>
        {productData.unit} 
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold text-primary'>
            {DisplayPriceInRupees(productData.price)} 
          </div>
        </div>
        <div className=''>
          {data.isAvailable == 0 ? (
            <p className='text-red-500 text-sm text-center font-medium'>Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default CardProduct