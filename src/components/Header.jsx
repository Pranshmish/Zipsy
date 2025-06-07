import { useState, useEffect, useRef } from 'react'
//import logo from '../assets/zipSy_eatry_svg_logo.svg'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import DisplayCartItem from './DisplayCartItem';
import gsap from 'gsap';

const Header = ({ cartButtonRef }) => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    //const [openUserMenu,setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const productData = useSelector(state => state.product.products)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    
    const logo = "https://res.cloudinary.com/dcd5xkb4q/image/upload/v1740461709/zipSy_eatry_svg_logo_w44jol.svg"
    const [openCartSection, setOpenCartSection] = useState(false)

    // Refs for animations
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const searchRef = useRef(null);
    const actionsRef = useRef(null);
    const cartRef = useRef(null);
 
    const redirectToLoginPage = () => {
        navigate("/googleLogin")
    }

    const getProductbyProductId = (productId) => {
        return productData?.find(item => item.id === productId)
    }

    const getTotalPrice = () => {
        if (!cartItem?.length) return 0
        return cartItem.reduce((totalPrice, curr) => {
            const product = getProductbyProductId(curr.productId)
            if (!product) return totalPrice
            return totalPrice + (curr.productQuantity * product.price)
        }, 0)
    }

    const getTotalQuantity = () => {
        if (!cartItem?.length) return 0
        return cartItem.reduce((totalQuantity, curr) => {
            return totalQuantity + (curr.quantity || 0)
        }, 0)
    }

    /*const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }*/
    const handleUserAccount = () => {
        if (user?.id) {
            navigate("/user")
        } else {
            navigate("/login")
        }
    }

    const handleMobileUser = () => {
        if (!user?.id) {
            navigate("/login")
            return
        }
        navigate("/user")
    }

    //total item and total price
    useEffect(() => {
        setTotalQty(getTotalQuantity())
        setTotalPrice(getTotalPrice())
    }, [cartItem, productData])

    useEffect(() => {
        // Create a context to handle cleanup
        const ctx = gsap.context(() => {
            // Animate header elements on mount
            if (logoRef.current) {
                gsap.from(logoRef.current, {
                    duration: 0.8,
                    y: -20,
                    opacity: 0,
                    ease: "power3.out"
                });
            }

            if (searchRef.current) {
                gsap.from(searchRef.current, {
                    duration: 0.8,
                    y: -20,
                    opacity: 0,
                    delay: 0.2,
                    ease: "power3.out"
                });
            }

            if (actionsRef.current) {
                gsap.from(actionsRef.current, {
                    duration: 0.8,
                    y: -20,
                    opacity: 0,
                    delay: 0.4,
                    ease: "power3.out"
                });
            }

            // Use the provided cartButtonRef if available, otherwise use the local cartRef
            const cartElement = cartButtonRef || cartRef;
            if (cartElement.current) {
                gsap.from(cartElement.current, {
                    duration: 0.8,
                    y: -50,
                    opacity: 0,
                    delay: 0.6,
                    ease: "bounce.out"
                });
            }
        }, headerRef);

        return () => ctx.revert();
    }, [cartButtonRef]);

    return (
        <header ref={headerRef} className='sticky top-0 z-50 bg-white shadow-sm'>
            <div className='h-20'>
                {!(isSearchPage && isMobile) && (
                    <div className='container mx-auto h-full px-4'>
                        <div className='flex items-center justify-between h-full'>
                            {/* Logo */}
                            <Link to={"/"} className='flex items-center h-full'>
                                <div ref={logoRef} className='relative h-12 lg:h-14 w-auto'>
                                    <img 
                                        src={logo}
                                        alt='Zipsy'
                                        className='h-full w-auto object-contain'
                                    />
                                </div>
                            </Link>

                            {/* Search - Desktop */}
                            <div ref={searchRef} className='hidden lg:block flex-1 max-w-2xl mx-8'>
                                <Search />
                            </div>

                            {/* Right Section */}
                            <div ref={actionsRef} className='flex items-center gap-6'>
                                {/* Mobile User Icon */}
                                <button 
                                    className='text-gray-600 hover:text-green-600 transition-colors duration-300' 
                                    onClick={handleMobileUser}
                                >
                                    <FaRegCircleUser size={24} />
                                </button>

                                {/* Mobile Cart Button */}
                                <button 
                                    onClick={() => setOpenCartSection(true)}
                                    className='lg:hidden flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-white transition-all duration-300'
                                >
                                    <div className='relative'>
                                        <BsCart4 size={20} />
                                        {totalQty > 0 && (
                                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                                                {totalQty}
                                            </span>
                                        )}
                                    </div>
                                    {cartItem?.[0] && (
                                        <span className='text-sm font-medium'>
                                            {DisplayPriceInRupees(totalPrice)}
                                        </span>
                                    )}
                                </button>

                                {/* Desktop Actions */}
                                <div className='hidden lg:flex items-center gap-6'>
                                    {user?.id ? (
                                        <button 
                                            onClick={handleUserAccount}
                                            className='flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-300'
                                        >
                                            <FaRegCircleUser size={20} />
                                            <span className='font-medium'>Account</span>
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={redirectToLoginPage}
                                            className='text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium'
                                        >
                                            Login
                                        </button>
                                    )}

                                    <button 
                                        ref={cartButtonRef || cartRef}
                                        onClick={() => setOpenCartSection(true)}
                                        className='flex items-center gap-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-105'
                                    >
                                        <div className='relative'>
                                            <BsCart4 size={20} />
                                            {totalQty > 0 && (
                                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                                                    {totalQty}
                                                </span>
                                            )}
                                        </div>
                                        <div className='font-medium'>
                                            {cartItem?.[0] ? (
                                                <span>{DisplayPriceInRupees(totalPrice)}</span>
                                            ) : (
                                                <span>Cart</span>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Search */}
            <div className='lg:hidden border-t'>
                <div className='container mx-auto px-4 py-2'>
                    <Search />
                </div>
            </div>

            {/* Cart Section */}
            {openCartSection && (
                <DisplayCartItem close={() => setOpenCartSection(false)} />
            )}
        </header>
    )
}

export default Header