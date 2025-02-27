import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import OrderTracking from "../pages/OrderTracking";
import GoogleLoginFailed from "../pages/GoogleLoginFailed";
import CurrentMenu from "../pages/CurrentMenu";
import VendorGoogleLoginFailed from "../pages/VendorGoogleLoginFailed";
import CurrentOrders from "../pages/CurrentOrders"
import Delivery from "../pages/Delivery";
import OrderHistory from "../pages/OrderHistory";
import Vendor from "../Vendor";
import Profile from "../pages/Profile";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import LoginRedirect from "../pages/LoginRedirect";
import GoogleLogin from "../pages/GoogleLogin";
import VendorGoogleLogin from "../pages/VendorGoogleLogin";
import VendorLoginRedirect from "../pages/VendorLoginRedirect";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : 'googleLogin',
                element : <GoogleLogin/>
            },
            {
                path : 'loginRedirect',
                element : <LoginRedirect/>
            },         
            {
                path:'googleLoginFailed',
                element:<GoogleLoginFailed/>
            },            
            
            {
                path : "order-tracking",
                element : <OrderTracking/>
            },
            {
                path : "profile",
                element : <Profile/>
                
            },
            {
                path : "category/:category",
                element:<ProductListPage/>
                
            },
            {
                path : "trending",
                element:<ProductListPage/>
                
            },
            {
                path : "bestsellers",
                element:<ProductListPage/>
                
            },
            {
                path : "outlet/:outlet",
                element:<ProductListPage/>
                
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel/:orderId',
                element : <Cancel/>
            }
        ]
    },
    {
        path : "/vendor",
        element : <Vendor/>,
        children : [
            {
                path : "",
                element : <CurrentOrders/>
            },
            {
                path : "orderHistory",
                element :<OrderHistory/>
            },
            {
                path : "delivery",
                element :<Delivery/>
            },
            {
                path : "currentMenu",
                element : <CurrentMenu/>
            }
        ]    
    },
    {
        path : "/vendor/googleLogin",
        element : <VendorGoogleLogin/>        
    },
    {
        path : "/vendor/googleLoginFailed",
        element : <VendorGoogleLoginFailed/>        
    },
    {
        path : "/vendor/loginRedirect",
        element : <VendorLoginRedirect/>      
    },
    

])

export default router