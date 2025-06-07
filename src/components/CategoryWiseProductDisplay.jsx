import  {  useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
//import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';

const CardLoading = () => {
    return (
      <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white animate-pulse'>
        <div className='min-h-24 bg-blue-50 rounded'>
        </div>
        <div className='p-2 lg:p-3  bg-blue-50 rounded w-20'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'>
        </div>
  
        <div className='flex items-center justify-between gap-3'>
          <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
          </div>
          <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
          </div>
        </div>
  
      </div>
    )
  }

const CategoryWiseProductDisplay = ({ name,url,data/*,loading*/ }) => {
    const loading = useSelector(state => state.product.loadingProducts)
    const containerRef = useRef()
    const dispatch=useDispatch()
    const loadingCardNumber = new Array(6).fill(null)

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }
    
    useEffect(()=>{
    },[dispatch])

    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link  to={url} className='font-semibold text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className='relative flex items-center '>
                <div className=' flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                      loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={name + index} />
                            )
                        })
                    }


                    {
                        !loading && data.map((p, index) => {
                            return (
                                <CardProduct
                                    data={p}
                                    key={p.id + "{name}" + index}
                                />
                            )
                        })
                    }

                </div>
                <div className='w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay