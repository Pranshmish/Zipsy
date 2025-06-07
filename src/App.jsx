import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { setAllCategory,setAllOutlet,setLoadingProducts,setLoadingCategory,setLoadingOutlets ,setAllProducts,setAllProductInfo, setTrendingProducts, setBestsellerProducts}  from './store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import  database  from "./appwrite/dbConfig.js";
import CartMobileLink from './components/CartMobile';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const productInfo=useSelector(state=>state.product.productInfo)

  const fetchUserData = async(userId)=>{
    try {
      const userData = await database.getUserData(userId)
      dispatch(setUserDetails(userData))
    } catch (error) {
        console.log(`Failed to fetchUserData of ${userId} at App.jsx ::--`,error)
    }      
  }

  const fetchCategoryData = async()=>{
    try {
      dispatch(setLoadingCategory(true))

      await database.getCategoryData().then((data) => {
        console.log("Category Data fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setAllCategory(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchCategoryData at App.jsx :-  ",error)  
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchProductData=async()=>{
    try {
      dispatch(setLoadingProducts(true))

      await database.getProductData().then((data) => {
        console.log("Product Data fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setAllProducts(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchProductData at App.jsx :-  ",error)  
    }finally{
      dispatch(setLoadingProducts(false))
    }
  }

  const fetchOutletData=async()=>{
    try {
      dispatch(setLoadingOutlets(true))

      await database.getOutletData().then((data) => {
        console.log("Outlet Data fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setAllOutlet(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchOutletData at App.jsx :-  ",error)  
    }finally{
      dispatch(setLoadingOutlets(false))
    }
  }

  const fetchProductInfo=async()=>{
    try {
      await database.getProductInfo().then((data) => {
        console.log("Product Info fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setAllProductInfo(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchProductInfo at App.jsx :-  ",error)  
    }
  }

  const calculateTrendingProducts=()=>{  
    const trendingProducts = productInfo?.filter(product => product.trending === true)
    dispatch(setTrendingProducts(trendingProducts))
  }

  const calculateBestsellerProducts=()=>{  
    const bestsellerProducts = productInfo?.filter(product => product.bestseller === true)
    dispatch(setBestsellerProducts(bestsellerProducts))
  }

  const fetchTrendingProducts=async()=>{
    try {
      await database.getTrendingProducts().then((data) => {
        console.log("Trending Products fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setTrendingProducts(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchTrendingProducts at App.jsx :-  ",error)  
    }
  }

  const fetchBestsellerProduct=async()=>{
    try {
      await database.getBestsellerProducts().then((data) => {
        console.log("Bestseller Products fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setBestsellerProducts(data)); 
      });     
        
    } catch (error) {
      console.log("Error while fetchBestsellerProduct at App.jsx :-  ",error)  
    }
  }

  const getDatafromLocalStorage = async () => {
    try {
      const userData = localStorage.getItem("userData")
      if (userData) {
        const parsedUserData = JSON.parse(userData)
        dispatch(setUserDetails(parsedUserData))
        await fetchUserData(parsedUserData.id)
      }
    } catch (error) {
      console.log("Error while getDatafromLocalStorage at App.jsx :-  ",error)  
    }
  }

  useEffect(() => {
    getDatafromLocalStorage()
  }, [])

  useEffect(() => {
    fetchCategoryData()
    fetchOutletData()    
    fetchProductData()    
    fetchProductInfo()   
  },[dispatch])

  // Check if we should show the cart mobile link
  const shouldShowCartLink = location.pathname !== '/checkout' && location.pathname !== '/cart';

  return (
    <> 
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      {shouldShowCartLink && <CartMobileLink/>}
    </>
  )
}

export default App