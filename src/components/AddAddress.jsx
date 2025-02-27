import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { handleAddAddress } from "../store/addressSlice";
import { useState } from "react";

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm();
    //const { fetchAddress } = useGlobalContext();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Track loading state

    const onSubmit = async (data) => {
        console.log("Selected Address:", data.address);
        setLoading(true);

        try {
            await dispatch(handleAddAddress(data)).unwrap(); // Ensure Redux action completes
            reset();
            //fetchAddress();
            close();
        } catch (error) {
            console.error("Failed to add address:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto">
            <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
                <div className="flex justify-between items-center gap-4">
                    <h2 className="font-semibold">Add Address</h2>
                    <button onClick={close} className="hover:text-red-500">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Dropdown for Address Selection */}
                    <div className="grid gap-1">
                        <label htmlFor="address">Select Address:</label>
                        <select
                            id="address"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("address", { required: true })}
                        >
                            <option value="">Select an Address</option>
                            <option value="V.S Hostel">V.S Hostel</option>
                            <option value="Tagore Hostel">Tagore Hostel</option>
                            <option value="MPH">MPH</option>
                            <option value="Tilak Hostel">Tilak Hostel</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddAddress;
