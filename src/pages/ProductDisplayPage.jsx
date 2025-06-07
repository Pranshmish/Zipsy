import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import database from "../config/conf.js";
//import AxiosToastError from '../utils/AxiosToastError'

import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: [],
    unit: "",
    isAvailable: true,
    price: "",
    description: "",
    categoryData: "",
    outletData: ""
  })
  const [currentImage, setCurrentImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await database.getProductByID(productId)
      /*const response = await Axios({
        ...SummaryApi.getProductDetails,
        data : {
          productId : productId 
        }
      })*/

      //const { data : responseData } = response

      if (response.$id == productId) {
        setData(response.data)
      }
    } catch (error) {
      console.error("Error fetching product details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])
  
  /*const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }*/
  console.log("product data",data)

  if (loading) {
    return (
      <div className='container mx-auto p-4'>
        <div className='animate-pulse'>
          <div className='grid lg:grid-cols-2 gap-8'>
            <div className='bg-gray-200 rounded-lg h-96'></div>
            <div className='space-y-4'>
              <div className='h-8 bg-gray-200 rounded w-1/4'></div>
              <div className='h-12 bg-gray-200 rounded w-3/4'></div>
              <div className='h-6 bg-gray-200 rounded w-1/2'></div>
              <div className='h-32 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className='container mx-auto p-4 min-h-screen bg-gray-50'>
      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Image Gallery */}
        <div className='space-y-4'>
          <div className='relative bg-white rounded-lg overflow-hidden shadow-sm'>
            {!imageLoaded && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin'></div>
              </div>
            )}
            <img
              src={data.image[currentImage]}
              alt={data.name}
              className={`w-full h-[400px] object-contain transition-opacity duration-300 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {data.image.length > 1 && (
            <div className='flex gap-2 overflow-x-auto pb-2'>
              {data.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentImage === index ? 'border-primary scale-105' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${data.name} view ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='space-y-6'>
          <div className='bg-white rounded-lg p-6 shadow-sm'>
            <div className='inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4'>
              10 Min Delivery
            </div>
            
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{data.name}</h1>
            <p className='text-gray-600 mb-6'>{data.unit}</p>
            
            <Divider />
            
            <div className='space-y-4'>
              <div>
                <p className='text-gray-600 mb-2'>Price</p>
                <div className='flex items-center gap-4'>
                  <div className='px-4 py-2 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-2xl font-bold text-green-700'>{DisplayPriceInRupees(data.price)}</p>
                  </div>
                  {/* {
                    data.discount && (
                      <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                    )
                  }
                  {
                    data.discount && (
                      <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                    )
                  }*/}
                </div>
              </div>

              {!data.isAvailable ? (
                <div className='px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium'>
                  Out of Stock
                </div>
              ) : (
                // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                <div className='mt-6'>
                  <AddToCartButton data={data} />
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className='bg-white rounded-lg p-6 shadow-sm space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Description</h3>
              <p className='text-gray-600'>{data.description}</p>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Unit</h3>
              <p className='text-gray-600'>{data.unit}</p>
            </div>

            {data?.more_details && Object.entries(data.more_details).map(([key, value], index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>{key}</h3>
                <p className='text-gray-600'>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage