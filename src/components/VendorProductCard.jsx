import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { handleIsAvailableStock } from '../store/vendorCurrentMenuSlice';

const VendorProductCard = ({product,productInfo}) => {   
    const dispatch=useDispatch();    

    const handleToggleStock = (id) => {        
        dispatch(handleIsAvailableStock(id,true))
      };
        
  
  return (
    <Link  className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={product.image[0]}
                className='w-full h-full object-scale-down lg:scale-125'
            />
      </div>
      <div className='flex items-center gap-1'>
        
        
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {product.name}
      </div>
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {product.unit} 
        
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold'>
              {DisplayPriceInRupees(product.price)} 
          </div>
          
          
        </div>
        <div className=''>
          {
            <button
            onClick={() => handleToggleStock(product.id)}
            className={`mt-2 w-full py-1 rounded text-white font-semibold ${
              productInfo.isAvailable ? "bg-red-500" : "bg-green-500" 
            }`}
          >
            {productInfo.isAvailable ? "Out of Stock" : "In Stock"}
          </button>
          }
            
        </div>
      </div>

    </Link>
  )
}

export default VendorProductCard