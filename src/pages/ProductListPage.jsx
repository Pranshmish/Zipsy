import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
//import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'

const ProductListPage = () => {
  const productData = useSelector(state => state.product.products)
  const trendingData = useSelector(state => state.product.trendingProducts)
  const bestsellersData = useSelector(state => state.product.bestsellerProducts)
  const productInfoData = useSelector(state => state.product.productInfo)
  //const outletData = useSelector(state => state.product.allOutlet)
  //const categoryData = useSelector(state => state.product.allCategory)

  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  //const [page, setPage] = useState(1)
  //const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const location = useLocation()
  
  //const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  const fetchProductData = () => {
    setLoading(true)
    try {
      if (location.pathname === "./trending") {
        setData(trendingData)
        setName("Trending")        
      } else if (location.pathname === "./bestsellers") {
        setData(bestsellersData) 
        setName("BestSellers")   
      } else if (location.pathname === "./outlet/:outlet" && params.outlet) {
        const outletID = params.outlet;
        const outletProducts = productData.filter(item => item.outletID === outletID);
        const filteredProducts = productInfoData.filter(product =>
          outletProducts.some(category => category.productInfo === product.id)
        );
        setData(filteredProducts)
        setName(outletProducts[1]?.outletName || "Outlet")
      } else if (location.pathname === "./category/:category" && params.category) {
        const categoryID = params.category;
        const categoryProducts = productData.filter(item => item.categoryID === categoryID);
        const filteredProducts = productInfoData.filter(product =>
          categoryProducts.some(category => category.productInfo === product.id)
        );
        setData(filteredProducts)
        setName(categoryProducts[1]?.categoryName || "Category")
      } else {
        setData([])
      }
    } catch (error) {
      console.error("Error fetching product data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()    
  }, [params, location])

  return (
    <section className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-6'>
        <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>{name}</h1>
          <p className='text-gray-600 mt-1'>{data.length} products available</p>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, index) => (
              <div key={index} className='animate-pulse'>
                <div className='bg-gray-200 rounded-lg h-48 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {data.map((p, index) => (
              <CardProduct
                data={p}
                key={p.id + "productSubCategory" + index}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>😕</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Products Found</h3>
            <p className='text-gray-600'>We couldn't find any products matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductListPage