import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { handleAddAddress } from "../store/addressSlice";
import { useState } from "react";

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Track loading state

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // The data object will now contain all the new fields
            await dispatch(handleAddAddress(data)).unwrap();
            reset();
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
                    <div className='grid gap-1'>
                        <label htmlFor='address_line'>Address Line:</label>
                        <input
                            type='text'
                            id='address_line'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("address_line",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City:</label>
                        <input
                            type='text'
                            id='city'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State:</label>
                        <input
                            type='text'
                            id='state'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("state",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='pincode'>Pincode:</label>
                        <input
                            type='text'
                            id='pincode'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("pincode",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country:</label>
                        <input
                            type='text'
                            id='country'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No.:</label>
                        <input
                            type='tel'
                            id='mobile'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobile",{required : true})}
                        />
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
