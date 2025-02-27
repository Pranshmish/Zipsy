import { Outlet } from "react-router-dom";
import "./Vendor.css";
import VendorHeader from "./components/VendorHeader";
import Navigation from "./components/Navigation.jsx";
import { useEffect, useState } from "react";
import { setVendorData } from "./store/vendorSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import database  from "./appwrite/dbConfig.js";
import { setOrderHistoryData, setProductData } from "./store/vendorOrderHistorySlice.js";
import { handleAddCurrentMenu } from "./store/vendorCurrentMenuSlice.js";
import { setCurrentOrderData } from "./store/vendorCurrentOrderSlice.js";

function Vendor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("current");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorOutletId, setVendorOutletId] = useState("");

  const getDatafromLocalStorage = async () => {
    const storedUser = localStorage.getItem("vendor");
    const expiry = localStorage.getItem("expiry");

    if (storedUser && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);

      if (now < expiryDate) {
        console.log("User session valid. Auto-logging in...");
        return JSON.parse(storedUser);
      } else {
        navigate("/vendor/googleLogin");
        return null;
      }
    }
    navigate("/vendor/googleLogin");
    return null;
  };

  const fetchAndLoadVendorData = async () => {
    try {
      const vendorData = await database.getVendorData(vendorEmail);
      setVendorOutletId(vendorData.outletId);
      dispatch(setVendorData(vendorData));
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  const fetchAndLoadOrderHistoryData = async () => {
    try {
      const data = await database.getOrderHistoryByOutletId(vendorOutletId);
      dispatch(setOrderHistoryData(data));
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const fetchAndLoadProductData = async () => {
    try {
      const data = await database.getProductData();
      dispatch(setProductData(data));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchAndLoadCurrentOrderData = async () => {
    try {
      const data = await database.getCurrentOrderDataByOutletId(vendorOutletId);
      dispatch(setCurrentOrderData(data));
    } catch (error) {
      console.error("Error fetching current orders:", error);
    }
  };

  const fetchAndLoadProductInfoData = async () => {
    try {
      const data = await database.getProductInfo();
      dispatch(handleAddCurrentMenu(data));
    } catch (error) {
      console.error("Error fetching product info:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const vendorData = await getDatafromLocalStorage();
      if (vendorData) {
        setVendorEmail(vendorData.email);
        fetchAndLoadVendorData();
        fetchAndLoadProductData();
        fetchAndLoadProductInfoData();
        fetchAndLoadOrderHistoryData();
        fetchAndLoadCurrentOrderData();
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <VendorHeader />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  );
}

export default Vendor;
