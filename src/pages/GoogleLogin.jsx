import  database  from "../appwrite/dbConfig.js";
import { motion } from "framer-motion";

const GoogleLogin = () => {
    const account = database.account;

    const handleGoogleSignIn = () => {
        account.createOAuth2Session(
            "google",
            "http://localhost:3000/loginRedirect",
            "http://localhost:3000/googleLoginFailed"
        )
        .then(() => console.log("Google Sign-In Success"))
        .catch((error) => console.error("OAuth Login Error:", error));
    };

    return (
        <section className='w-full min-h-screen flex justify-center items-center bg-gray-100 px-4'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }} 
                className='bg-white shadow-lg rounded-lg p-8 max-w-md text-center'
            >
                <motion.h2 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className='text-2xl font-bold text-gray-800 mb-4'
                >
                    Welcome to zipSy !
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='text-gray-600 mb-6'
                >
                    Sign in to explore delicious food near you.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoogleSignIn}
                    className='w-full flex items-center justify-center gap-3 py-3 px-5 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300'
                >
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
                        alt="Google Logo" 
                        className='w-6 h-6' 
                    />
                    Sign in with Google
                </motion.button>
            </motion.div>
        </section>
    );
};

export default GoogleLogin;
