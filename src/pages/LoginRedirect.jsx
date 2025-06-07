import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHamburger, FaPizzaSlice, FaUtensils } from "react-icons/fa";
import  database  from "../appwrite/dbConfig"; // Make sure to import your Appwrite instance

const LoginRedirect = () => {
    const navigate = useNavigate();
    const account=database.account;

    const saveSession = async () => {
        try {
          const user = await account.get();
          localStorage.setItem("user", JSON.stringify(user));
      
          // Set expiration time (1 week from now)
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 7);
          localStorage.setItem("expiry", expiry.toISOString());
      
          console.log("User logged in:", user);
        } catch (error) {
          console.error("Error fetching user session:", error);
        }
    };/*
        export const autoLogin = async () => {
  const storedUser = localStorage.getItem("user");
  const expiry = localStorage.getItem("expiry");

  if (storedUser && expiry) {
    const now = new Date();
    const expiryDate = new Date(expiry);

    if (now < expiryDate) {
      console.log("User session valid. Auto-logging in...");
      return JSON.parse(storedUser);
    } else {
      console.log("Session expired. Logging out...");
      logout();
    }
  }

  return null;
};


export const logout = async () => {
  try {
    await account.deleteSession("current");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

    */
      
    const doesUserExist=async(userId)=>{
        return await database.doesUserExist(userId);
    }

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await account.get();
          console.log("User Details:", user);
          if (doesUserExist(user.$id)){
              saveSession();  
              navigate("/"); 
          } else {
              navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/googleLogin");  // Redirect to failure page
        }
      };
    
      fetchUser();
    }, [navigate]);
    
        
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-red-600 text-4xl font-bold flex items-center gap-2"
      >
        <FaUtensils className="text-5xl animate-bounce" />
        Zomato
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="mt-6 w-12 h-12 border-4 border-t-red-500 border-gray-200 rounded-full"
      />

      {/* Animated Food Icons */}
      <div className="flex gap-4 mt-6">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", repeatType: "mirror" }}
        >
          <FaPizzaSlice className="text-yellow-500 text-4xl" />
        </motion.div>
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: -10 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", repeatType: "mirror" }}
        >
          <FaHamburger className="text-red-400 text-4xl" />
        </motion.div>
      </div>

      {/* Text Pulse Effect */}
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: "mirror" }}
        className="mt-4 text-lg text-gray-600 font-semibold"
      >
        Getting your food ready...
      </motion.p>
    </div>
  );
};



    

export default LoginRedirect;
