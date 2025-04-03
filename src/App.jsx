import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
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
      console.log("Error while fetching productData at App.jsx :-  ",error)  
    }finally{
      dispatch(setLoadingProducts(false))
    }
  }

  const fetchOutletData=async()=>{
    try {
      dispatch(setLoadingOutlets(true))

      await database.getOutletData().then((data) => {
        console.log("Outlet Data fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(data);
        dispatch(setAllOutlet(data)); 
      });
      
    } catch (error) {
      console.log("Error while fetching outletData at App.jsx :-  ",error)  
    }finally{
      dispatch(setLoadingOutlets(false))
    }
  }

  const fetchProductInfo=async()=>{
    try {
      await database.getProductInfo().then((data) => {
        console.log("ProductInfo Data fetched here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
        console.log(data);
        dispatch(setAllProductInfo(data)); 
      });
    } catch (error) {
      console.log("Error while fetching productInfo at App.jsx :-  ",error)
    }
  }  


 const calculateTrendingProducts=()=>{  
    return productInfo
        .sort((a, b) => b.todaySale - a.todaySale) // Sort descending
        .slice(0, 10); // Take top 10
 }

const calculateBestsellerProducts=()=>{  
  return productInfo
      .sort((a, b) => b.totalSale - a.totalSale) // Sort descending
      .slice(0, 10); // Take top 10
}

 const fetchTrendingProducts=async()=>{
  try {
    const trendingProducts=await calculateTrendingProducts()
    dispatch(setTrendingProducts(trendingProducts))
  } catch (error) {
    console.log("Error while pushing trendingProducts to store",error)
  }
 }

 const fetchBestsellerProduct=async()=>{
  try {
    const bestsellerProducts=await calculateBestsellerProducts()
    dispatch(setBestsellerProducts(bestsellerProducts))
  } catch (error) {
    console.log("Error while pushing bestsellerProducts to store",error)
  }
 }

 const getDatafromLocalStorage = async () => {
  const storedUser = localStorage.getItem("user");
  const expiry = localStorage.getItem("expiry");

  if (storedUser && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);

      if (now < expiryDate) {
        console.log("User session valid. Auto-logging in...");
        console.log("User found in local storage  !!!!!!!!!!!!!!!!!!!!!! ")
        return JSON.parse(storedUser);
      } else {      
        return null;
      }
    }  
    return null;
  };
  
  fetchTrendingProducts()    
  fetchBestsellerProduct()


  useEffect(()=>{
    console.log("App component is loading !!!!!!!!! ")

    const userData=getDatafromLocalStorage()
    userData.id ? fetchUserData(userData.id) : console.log("No userData in local storage !!!!")
    userData.id && console.log(`user with ${userData.id} fetched !!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)  

    fetchCategoryData()
    fetchOutletData()    
    fetchProductData()    
    fetchProductInfo()   
  },[dispatch])


  return (
    <> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
      <Footer/>
      {
        location.pathname !== '/checkout' || location.pathname !== '/cart'  && (
          <CartMobileLink/>
        )
      }
    </>
  )
}

export default App