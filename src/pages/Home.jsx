import { useSelector } from 'react-redux'
import {/*Link,*/ useNavigate} from 'react-router-dom'
import CardProduct from "../components/CardProduct";
import CardLoading from "../components/CartLoading";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const loadingOutlets=useSelector(state=>state.product.loadingOutlets)
  const loadingProducts=useSelector(state=>state.product.loadingProducts)
  const categoryData = useSelector(state => state.product.allCategory)
  const productInfoData=useSelector(state=>state.product.productInfo)
  const outletData = useSelector(state => state.product.allOutlet)
  const bestsellerProductData=useSelector(state=> state.product.bestsellerProducts )
  const trendingProductData=useSelector(state=> state.product.trendingProducts )
  
  const loadingCardNumber=new Array(12).fill(null)

  const navigate = useNavigate()

  const handleRedirectCategoryPage = (id)=>{      
      const url = `/category/${id}`
      navigate(url)
  }

  const handleRedirectOutletPage=(id)=>{
    const url=`/outlet/${id}`
    navigate(url)
  }


  return (
    <>
    <section className="bg-white m-5">     
      
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>Food by Category</h3>
                <p></p>
      </div>
      
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat)=>{
                return(
                  <div key={cat.id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectCategoryPage(cat.id)}>
                    <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down'
                        />
                        <p>{cat.name}</p>
                    </div>
                  </div>
                )
              })
              
            )
      
      }
      </div>
    </section>  
    <section className="bg-white m-4"> 

          <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>Food by Outlet</h3>
                <p></p>
          </div>
          {
            loadingOutlets ? (
              new Array(3).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded'></div>
                    <div className='bg-blue-100 h-8 rounded'></div>
                  </div>
                )
              })
            ) : (
              outletData.map((cat)=>{
                return(
                  <div key={cat.id} className='w-full h-full' onClick={()=>handleRedirectOutletPage(cat.id,cat.name)}>
                    <div>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down'
                        />
                        <p>{cat.name}</p>
                    </div>
                  </div>
                )
              })
              
            )
          }      
    </section> 

    <section className="bg-white m-4">   
      <CategoryWiseProductDisplay 
              key={"1"} 
              name={"Trending"}
              url={"./trending"}
              data={trendingProductData}
              //loading={isTrendingLoading}
      />
    </section>

    <section className="bg-white m-4">   
      <CategoryWiseProductDisplay 
              key={"2"} 
              name={"Bestsellers"}
              url={"./bestsellers"}
              data={bestsellerProductData}
              //loading={isBestsellerLoading}
      />
    </section>
    <section className="bg-white m-4">   
       <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>All Dishes</h3>
          </div>
          

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                {
                  loadingProducts &&
                    loadingCardNumber.map((_, index) => {
                        return (
                            <CardLoading key={"products" + index} />
                        )
                    })
                }
                {
                  productInfoData.map((p, index) => {
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
        </div>   
    </section>
   </>
  )
}

export default Home