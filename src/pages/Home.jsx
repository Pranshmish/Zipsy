import { useSelector } from 'react-redux'
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import CardProduct from "../components/CardProduct";
import CardLoading from "../components/CartLoading";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import { FaUtensils, FaStore, FaStar, FaFire } from 'react-icons/fa'
import Search from '../components/Search'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import logo from '../assets/zipSy_eatry_logo.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const loadingOutlets = useSelector(state => state.product.loadingOutlets)
  const loadingProducts = useSelector(state => state.product.loadingProducts)
  const categoryData = useSelector(state => state.product.allCategory)
  const productInfoData = useSelector(state => state.product.productInfo)
  const outletData = useSelector(state => state.product.allOutlet)
  const bestsellerProductData = useSelector(state => state.product.bestsellerProducts)
  const trendingProductData = useSelector(state => state.product.trendingProducts)
  const productData = useSelector(state => state.product.products)
  
  const loadingCardNumber = new Array(12).fill(null)
  const navigate = useNavigate()

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const outletsRef = useRef(null);
  const trendingRef = useRef(null);
  const bestsellersRef = useRef(null);
  const cartButtonRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroImagesRef = useRef(null);

  // Function to initialize animations
  const initAnimations = () => {
    // Kill any existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Hero section animations
    if (heroTitleRef.current) {
      gsap.from(heroTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }
    
    if (heroTextRef.current) {
      gsap.from(heroTextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });
    }
    
    if (heroButtonsRef.current) {
      gsap.from(heroButtonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });
    }
    
    if (heroStatsRef.current) {
      gsap.from(heroStatsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
      });
    }
    
    if (heroImagesRef.current) {
      gsap.from(heroImagesRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });
    }

    // Categories section animation
    if (categoriesRef.current) {
      gsap.from(categoriesRef.current, {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Outlets section animation
    if (outletsRef.current) {
      gsap.from(outletsRef.current, {
        scrollTrigger: {
          trigger: outletsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Trending section animation
    if (trendingRef.current) {
      gsap.from(trendingRef.current, {
        scrollTrigger: {
          trigger: trendingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Bestsellers section animation
    if (bestsellersRef.current) {
      gsap.from(bestsellersRef.current, {
        scrollTrigger: {
          trigger: bestsellersRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  };

  // Run animations on component mount
  useEffect(() => {
    // Add a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      initAnimations();
    }, 500);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Run animations when data changes
  useEffect(() => {
    if (categoryData?.length > 0 || outletData?.length > 0 || 
        trendingProductData?.length > 0 || bestsellerProductData?.length > 0) {
      // Add a small delay to ensure DOM is fully updated
      const timer = setTimeout(() => {
        initAnimations();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [categoryData, outletData, trendingProductData, bestsellerProductData]);

  const handleRedirectCategoryPage = (id) => {      
      const url = `/category/${id}`
      navigate(url)
  }

  const handleRedirectOutletPage = (id) => {
    const url = `/outlet/${id}`
    navigate(url)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header with Cart Button */}
      <Header cartButtonRef={cartButtonRef} />

      {/* Hero Section */}
      <section className='relative min-h-screen bg-gradient-to-br from-red-600 to-red-700 pt-16'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0' style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Content */}
        <div className='container mx-auto px-4 py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Column - Text Content */}
            <div className='text-white space-y-8'>
              <div className='inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-6 py-2 rounded-full'>
                #1 Food Delivery App
              </div>
              
              <h1 ref={heroTitleRef} className='text-5xl md:text-7xl font-extrabold leading-tight text-white'>
                Delicious Food
                <br />
                <span className='text-white'>Delivered To Your Doorstep</span>
              </h1>
              
              <p ref={heroTextRef} className='text-xl md:text-2xl text-white max-w-xl'>
                Experience the best food from your favorite restaurants with lightning-fast delivery
              </p>
              
              <div ref={heroButtonsRef} className='flex flex-col sm:flex-row gap-4'>
                <button className='group bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'>
                  <span className='flex items-center justify-center gap-2'>
                    <span>Order Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className='group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:-translate-y-1'>
                  <span className='flex items-center justify-center gap-2'>
                    <span>View Restaurants</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div ref={heroStatsRef} className='grid grid-cols-3 gap-4 pt-8'>
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center'>
                  <div className='text-3xl font-bold text-white'>4.8</div>
                  <div className='text-sm text-white/80'>Rating</div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center'>
                  <div className='text-3xl font-bold text-white'>30</div>
                  <div className='text-sm text-white/80'>Minutes</div>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center'>
                  <div className='text-3xl font-bold text-white'>500+</div>
                  <div className='text-sm text-white/80'>Restaurants</div>
                </div>
              </div>
            </div>

            {/* Right Column - Search and Images */}
            <div ref={heroImagesRef} className='hidden lg:block relative'>
              {/* Floating Food Images */}
              <div className='absolute -top-10 -left-10 w-48 h-48 bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-500'>
                <img 
                  src={logo}
                  alt="Food" 
                  className='w-full h-full object-contain p-4'
                />
              </div>
              <div className='absolute top-20 -right-10 w-56 h-56 bg-white rounded-2xl shadow-2xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-500'>
                <img 
                  src={logo}
                  alt="Food" 
                  className='w-full h-full object-contain p-4'
                />
              </div>
              <div className='absolute bottom-10 left-20 w-52 h-52 bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500'>
                <img 
                  src={logo}
                  alt="Food" 
                  className='w-full h-full object-contain p-4'
                />
      </div>
      
              {/* Search Card */}
              <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 mt-40'>
                <h3 className='text-2xl font-bold mb-6 text-white'>Find Food Near You</h3>
                <div className='bg-white rounded-xl p-4 shadow-lg mb-6'>
                  <Search />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-white/20 rounded-xl p-4 text-center border border-white/30'>
                    <div className='text-white text-3xl font-bold'>500+</div>
                    <div className='text-sm text-white'>Restaurants</div>
                  </div>
                  <div className='bg-white/20 rounded-xl p-4 text-center border border-white/30'>
                    <div className='text-white text-3xl font-bold'>50+</div>
                    <div className='text-sm text-white'>Cuisines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Search (shown below hero on mobile) */}
      <div className='lg:hidden bg-white py-4 shadow-md'>
        <div className='container mx-auto px-4'>
          <div className='bg-gray-50 rounded-lg p-3 shadow-sm'>
            <Search />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div ref={categoriesRef} className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <FaUtensils className='text-2xl text-green-600' />
              <h2 className='text-2xl font-bold text-gray-900'>Food Categories</h2>
            </div>
            <button 
              onClick={() => navigate('/categories')}
              className='text-green-600 hover:text-green-700 font-medium transition-colors'
            >
              View All
            </button>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {loadingCategory ? (
              loadingCardNumber.map((_, index) => (
                <div key={index} className='animate-pulse'>
                  <div className='bg-gray-200 rounded-lg aspect-square'></div>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mt-2'></div>
                </div>
              ))
            ) : (
              categoryData?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleRedirectCategoryPage(cat.id)}
                  className='group text-center'
                >
                  <div className='relative overflow-hidden rounded-lg aspect-square bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-105'>
                        <img 
                          src={cat.image}
                      alt={cat.name}
                      className='w-full h-full object-contain'
                        />
                  </div>
                  <p className='mt-2 font-medium text-gray-700 group-hover:text-green-600 transition-colors'>
                    {cat.name}
                  </p>
                </button>
              ))
            )}
          </div>
      </div>
    </section>  

      {/* Outlets Section */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div ref={outletsRef} className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <FaStore className='text-2xl text-green-600' />
              <h2 className='text-2xl font-bold text-gray-900'>Popular Outlets</h2>
            </div>
            <button 
              onClick={() => navigate('/outlets')}
              className='text-green-600 hover:text-green-700 font-medium transition-colors'
            >
              View All
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {loadingOutlets ? (
              loadingCardNumber.slice(0, 3).map((_, index) => (
                <div key={index} className='animate-pulse'>
                  <div className='bg-gray-200 rounded-lg aspect-video'></div>
                  <div className='h-4 bg-gray-200 rounded w-1/2 mt-2'></div>
                  </div>
              ))
            ) : (
              outletData?.map((outlet) => (
                <button
                  key={outlet.id}
                  onClick={() => handleRedirectOutletPage(outlet.id)}
                  className='group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='aspect-video relative overflow-hidden'>
                    <img 
                      src={outlet.image}
                      alt={outlet.name}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                    </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
                      {outlet.name}
                    </h3>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
    </section> 

      {/* Trending Section */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div ref={trendingRef} className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <FaFire className='text-2xl text-green-600' />
              <h2 className='text-2xl font-bold text-gray-900'>Trending Now</h2>
            </div>
            <button 
              onClick={() => navigate('./trending')}
              className='text-green-600 hover:text-green-700 font-medium transition-colors'
            >
              View All
            </button>
          </div>
      <CategoryWiseProductDisplay 
              name={"Trending"}
              url={"./trending"}
              data={trendingProductData}
      />
        </div>
    </section>

      {/* Bestsellers Section */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div ref={bestsellersRef} className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <FaStar className='text-2xl text-green-600' />
              <h2 className='text-2xl font-bold text-gray-900'>Bestsellers</h2>
            </div>
            <button 
              onClick={() => navigate('./bestsellers')}
              className='text-green-600 hover:text-green-700 font-medium transition-colors'
            >
              View All
            </button>
          </div>
      <CategoryWiseProductDisplay 
              name={"Bestsellers"}
              url={"./bestsellers"}
              data={bestsellerProductData}
      />
        </div>
    </section>

      {/* All Dishes Section */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <FaUtensils className='text-2xl text-green-600' />
              <h2 className='text-2xl font-bold text-gray-900'>All Dishes</h2>
            </div>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {loadingProducts ? (
              loadingCardNumber.map((_, index) => (
                            <CardLoading key={"products" + index} />
              ))
            ) : (
              productInfoData?.map((p, index) => (
                      <CardProduct
                        data={p}
                        key={p.id + "productSubCategory" + index}
                      />
              ))
            )}
           </div>
        </div>   
    </section>
    </div>
  )
}

export default Home