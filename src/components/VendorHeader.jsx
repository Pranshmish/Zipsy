import { useEffect } from 'react'
import logo from '../assets/zipSy_eatry_svg_logo.svg'

import { Link, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';


const VendorHeader = () => {
    const [ isMobile ] = useMobile()
    //const location = useLocation()
    //const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const vendor = useSelector((state)=> state.vendorData)
    //const [openUserMenu,setOpenUserMenu] = useState(false)
    
 
    const redirectToVendorLoginPage = ()=>{
        navigate("/vendor/login")
    }
    const redirectToVendorProfilePage = ()=>{
        navigate("/vendor/profile")
    }


    const handleMobileUser = ()=>{
        if(!vendor.id){
            redirectToVendorLoginPage()            
        }
        redirectToVendorProfilePage()
    }

    //total item and total price
     useEffect(()=>{
         
         
     },[])

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !( isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                                {/**logo */}
                                <div className='h-full'>
                                    <Link to={"/vendor"} className='h-full flex justify-center items-center'>
                                        <img 
                                            src={logo}
                                            width={170}
                                            height={60}
                                            alt='logo'
                                            className='hidden lg:block'
                                        />
                                        <img 
                                            src={logo}
                                            width={120}
                                            height={60}
                                            alt='logo'
                                            className='lg:hidden'
                                        />
                                    </Link>
                                </div>

                                


                                {/**login and my cart */}
                                <div className=''>
                                    {/**user icons display in only mobile version**/}
                                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                        <FaRegCircleUser size={26}/>
                                    </button>

                                      {/**Desktop**/}
                                    <div className='hidden lg:flex  items-center gap-10'>
                                        {
                                            vendor?.id ? (
                                                <div className='relative'>
                                                    <div onClick={redirectToVendorProfilePage} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>{vendor.name}</p>                                                    
                                                       
                                                    </div>
                                                    
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectToVendorLoginPage} className='text-lg px-2'>Login</button>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                </div>
            )
        }
        
        
    </header>
  )
}

export default VendorHeader