import { useEffect, useState } from "react";
import VendorProductCard from "../components/VendorProductCard";
import { useSelector } from "react-redux";

const CurrentMenu = () => {
    const vendorData=useSelector(state=>state.vendorData.vendor)
    const productData=useSelector(state=>state.orderHistory.products)
    const productInfoData=useSelector(state=>state.currentMenu.productInfo)
    const [products, setProducts] = useState([]);

    const getProductInfoByProductId=(productId)=>{
        return productInfoData.find(product=>product.productId==productId)
    }

    const getCurrentMenuProductData=()=>{
        return productData.filter(product=>product.outletId==vendorData.outletId)
    }

    useEffect(()=>{
        setProducts(getCurrentMenuProductData())
    },[])

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Current Menu</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <VendorProductCard key={product.id} product={product} productInfo={getProductInfoByProductId(product.id)} />
          ))}
        </div>
      </div>
    );
};

export default CurrentMenu