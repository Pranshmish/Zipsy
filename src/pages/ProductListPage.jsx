import { useEffect, useState } from 'react'
import { useParams ,useLocation} from 'react-router-dom'
//import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'

const ProductListPage = () => {
  const productData=useSelector(state=>state.product.products)
  const trendingData = useSelector(state => state.product.trendingProducts)
  const bestsellersData = useSelector(state => state.product.bestsellerProducts)
  const productInfoData=useSelector(state=>state.product.productInfo)
  //const outletData = useSelector(state => state.product.allOutlet)
  //const categoryData = useSelector(state => state.product.allCategory)

  const [data, setData] = useState([])
  const [name, setName] = useState("")
  //const [page, setPage] = useState(1)
  //const [loading, setLoading] = useState(false)
  //const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const location=useLocation()
  
  //const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  const fetchProductData=()=>{
    if (location.pathname==="./trending"){
        setData(trendingData)
        setName("Trending")        
    }else if(location.pathname==="./bestsellers"){
        setData(bestsellersData) 
        setName("BestSellers")   
    }else if (location.pathname=="./outlet/:outlet" && params.outlet){
        const outletID=params.outlet;
        const outletProducts=productData.filter(item=>item.outletID === outletID);
        const filteredProducts = productInfoData.filter(product =>
          outletProducts.some(category => category.productInfo === product.id)
        );
        setData(filteredProducts)
        setName(outletProducts[1].outletName)
    }else if (location.pathname=="./category/:category" && params.category){
        const categoryID=params.category;
        const categoryProducts=productData.filter(item=>item.categoryID === categoryID);
        const filteredProducts = productInfoData.filter(product =>
          categoryProducts.some(category => category.productInfo === product.id)
        );
        setData(filteredProducts)
        setName(categoryProducts[1].categoryName)
    }else{
        setData([])
    }
  }
 

  useEffect(() => {
    fetchProductData()    
  }, [params,location])



  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        


        {/**Product **/}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{name}</h3>
          </div>
          <div>

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p.id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
           </div>

            {/*
              loading && (
                <Loading />
              )*/
            }

          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage