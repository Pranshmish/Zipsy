import { useDispatch, useSelector } from "react-redux";
import { FaStore, FaTimesCircle } from "react-icons/fa";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";
import database from "../appwrite/dbConfig";



const OutletOpenStatusConfirm = () => {
    const params=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const vendorData=useSelector(state=>state.vendorData.vendor)

    const isOpen=params.isOpen;

    const handleConfirmCloseOrOpenOutlet=async(isOpen)=>{
        await database.changeOutletStatus(!isOpen);
        dispatch(handleConfirmCloseOrOpenOutlet(!isOpen))
        navigate("./vendor/vendorProfile")
    }

    useEffect(()=>{

    },[vendorData])

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{isOpen ?"Do you want to Close your Outlet ?":"Do you want to Open your Outlet ?"}</h2>
        
          <button
            className={`py-2 px-4 rounded flex items-center gap-2 text-white ${
              vendorData.isOutletOpen ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={handleConfirmCloseOrOpenOutlet(isOpen)}
          >
            {vendorData.isOutletOpen ? <FaTimesCircle /> : <FaStore />} {vendorData.isOutletOpen ? "Close the Outlet" : "Open the Outlet"}
          </button>
        </div>
      
    );
};



export default OutletOpenStatusConfirm