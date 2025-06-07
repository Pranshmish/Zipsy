import { useEffect, useState } from 'react'
//import CardLoading from '../components/CardLoading.jsx'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import noDataImage from '../assets/nothing here yet.webp'
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
const SearchPage = () => {
  const productData=useSelector(state=>state.product.products)
  const productInfoData=useSelector(state=>state.product.productInfo)
  const [data,setData] = useState([])
  const [productName,setProductName]=useState([]);
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  //const [page,setPage] = useState(1)
  //const [totalPage,setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const getProductName=()=>{
    const productName=[];
    productData.map((product)=>{
      productName.push(product.name)
    })
    return productName;
  }


  const refineSearchTerm = (term) => {
    let refinedTerm = term;
    while (refinedTerm.length > 0) {
      // Filter products that match the current refined term
      const matchedProducts = productName.filter(product =>
        product.toLowerCase().includes(refinedTerm.toLowerCase())
      );

      // If any products match, return the filtered list
      if (matchedProducts.length > 0) {
        return matchedProducts;
      }

      // Otherwise, trim the last character and try again
      refinedTerm = refinedTerm.slice(0, refinedTerm.length - 1);
    }

    return []; // If no match found, return an empty array
  };
  
  const fetchData = async() => {
    try {
      setLoading(true)
      const response=refineSearchTerm(searchText);
      const responseProductInfoData=[];
      response.map((item)=>{
        const product=productData.find(product=>product.name==item)
        const productInfo=productInfoData.find(info=>info.productId==product.id)
        responseProductInfoData.push(productInfo)
      })

      setData(responseProductInfoData)
        
    } catch (error) {
        console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    
    setProductName(getProductName())
    fetchData()
  },[searchText])

  


  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Results: {data.length}  </p>

        <InfiniteScroll
              dataLength={data.length}
              hasMore={true}
              
        >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
              {
                data.map((p,index)=>{
                  return(
                    <CardProduct data={p} key={p?.productId+"searchProduct"+index}/>
                  )
                })
              }

            {/***loading data */}
            {
              loading && (
                loadingArrayCard.map((_,index)=>{
                  return(
                    <CardLoading key={"loadingsearchpage"+index}/>
                  )
                })
              )
            }
        </div>
        </InfiniteScroll>

              {
                //no data 
                !data[0] && !loading && (
                  <div className='flex flex-col justify-center items-center w-full mx-auto'>
                    
                    <p className='font-semibold my-2'>No Data found</p>
                  </div>
                )
              }
      </div>
    </section>
  )
}

export default SearchPage