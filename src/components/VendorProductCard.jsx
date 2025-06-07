import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { handleIsAvailableStock } from '../store/vendorCurrentMenuSlice';
import { useState } from 'react';

const VendorProductCard = ({product, productInfo}) => {   
    const dispatch = useDispatch();    
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleToggleStock = (id) => {        
        dispatch(handleIsAvailableStock(id, true))
    };
        
    return (
        <div className='group border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg cursor-pointer bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/20'>
            <div className='relative min-h-20 w-full max-h-24 lg:max-h-32 rounded-lg overflow-hidden bg-gray-50'>
                {!imageLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
                    </div>
                )}
                <img 
                    src={product.image[0]}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setImageLoaded(true)}
                    alt={product.name}
                />
            </div>

            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 group-hover:text-primary transition-colors duration-300'>
                {product.name}
            </div>

            <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base text-gray-600'>
                {product.unit} 
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold text-primary'>
                        {DisplayPriceInRupees(product.price)} 
                    </div>
                </div>
                <div className=''>
                    <button
                        onClick={() => handleToggleStock(product.id)}
                        className={`mt-2 w-full py-1.5 rounded-lg text-white font-medium transition-all duration-300 ${
                            productInfo.isAvailable 
                                ? "bg-red-500 hover:bg-red-600" 
                                : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {productInfo.isAvailable ? "Out of Stock" : "In Stock"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VendorProductCard