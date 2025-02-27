import { useEffect, useState } from "react";
import  database  from "../appwrite/dbConfig.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { FaUser, FaMobileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [data, setData] = useState({ name: "", mobileNumber: "", address: "" });
  const [userId, setUserId] = useState("");
  const account = database.account;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserId = async () => {
      const data = await account.get();
      setUserId(data.$id);
    };
    getUserId();
  }, []);

  const saveSession = async () => {
    try {
      const user = await account.get();
      localStorage.setItem("user", JSON.stringify(user));
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      localStorage.setItem("expiry", expiry.toISOString());
    } catch (error) {
      console.error("Error fetching user session:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobileNumber, address } = data;
    try {
      await database.setUserCredentials({ userId, name, mobileNumber, address });
      dispatch(setUserDetails({ name, mobileNumber, address }));
      setData({ name: "", mobileNumber: "", address: "" });
      saveSession();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Welcome to zipSy</h2>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none"
            />
          </div>

          <div className="relative">
            <FaMobileAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              name="mobileNumber"
              value={data.mobileNumber}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none"
            />
          </div>

          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <select
              name="address"
              value={data.address}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:border-red-500 outline-none cursor-pointer"
            >
              <option value="" disabled>Select your address</option>
              {[
                "V.S Hostel", "Tagore Hostel", "Tilak Hostel", "New Girls Hostel", "Sarojini Hostel",
                "Saraswati Hostel", "Kalpana Chawla Hostel", "MPH", "Takshila Complex", "Subhash Hostel",
                "Raman Hostel", "Ramanujan Hostel", "Ambedkar Hostel"
              ].map((hostel) => (
                <option key={hostel} value={hostel}>{hostel}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!isValid}
            className={`${isValid ? "bg-red-600 hover:bg-red-500" : "bg-gray-400"} text-white py-3 rounded-lg font-semibold`}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;

