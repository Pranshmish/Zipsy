import { useSelector } from "react-redux";
import { FaListAlt,  FaStore, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const VendorProfile = () => {
    const navigate=useNavigate();
    const vendorData=useSelector(state=>state.vendorData.vendor)

    const redirectToOrderHistory=()=>{
        navigate("./vendor/orderHistory")
    }
    const redirectToVendorInfo=()=>{
        navigate("./vendor/vendorInfo")
    }
    const confirmCloseOrOpenOutlet=(isOpen)=>{
        navigate(`./vendor/confirm/:${isOpen}`)
    }

    useEffect(()=>{

    },[vendorData])

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Vendor Profile</h2>
        <div className="grid gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2" onClick={redirectToOrderHistory()}>
            <FaListAlt /> Order History
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded flex items-center gap-2" onClick={redirectToVendorInfo()}>
            <FaInfoCircle /> Vendor Info
          </button>
          <button
            className={`py-2 px-4 rounded flex items-center gap-2 text-white ${
              vendorData.isOutletOpen ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={confirmCloseOrOpenOutlet(vendorData.isOutletOpen)}
          >
            {vendorData.isOutletOpen ? <FaTimesCircle /> : <FaStore />} {vendorData.isOutletOpen ? "Close the Outlet" : "Open the Outlet"}
          </button>
        </div>
      </div>
    );
};



export default VendorProfile