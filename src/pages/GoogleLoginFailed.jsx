import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import database from "../appwrite/dbConfig";

const GoogleLoginFailed = () => {
    const account=database.account;

    const handleGoogleSignIn = () => {
      account.createOAuth2Session("google", "http://localhost:3000/loginRedirect", "http://localhost:3000/googleLoginFailed")
      .then(() => console.log("Google Sign-In Success"))
      .catch((error) => console.error("OAuth Login Error:", error));    
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
        {/* Sad Face Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <p className="text-7xl">😞</p>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-red-600 mt-4"
        >
          Google Sign In Failed !!
        </motion.h1>

        {/* Retry Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center gap-3 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md transition-all hover:bg-red-600"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="text-xl" />
          Try Sign in with Google again
        </motion.button>
      </div>
    );
};  

export default GoogleLoginFailed;
