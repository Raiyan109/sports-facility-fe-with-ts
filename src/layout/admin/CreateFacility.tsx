import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateFacilityMutation } from "@/redux/features/facility/facilityApi";
import { TFacility } from "@/types";

const CreateFacility = () => {
    const [createFacility] = useCreateFacilityMutation()
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<TFacility>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isBackendError(error: any): error is { data: { errors?: { message: string }[], message?: string } } {
        return error && error.data;
    }

    const onSubmit: SubmitHandler<TFacility> = async (data) => {
        try {
            const res = await createFacility(data).unwrap()
            MySwal.fire({
                title: res.message,
                icon: "success",
            });
            navigate("/admin-dashboard/facilities-table");
            return res
        } catch (error) {
            console.log(error);

            // Handle backend validation errors
            if (isBackendError(error)) {
                // Handle backend validation errors
                if (error?.data?.errors) {
                    console.log(error?.data);

                    error.data.errors.forEach((err) => {
                        MySwal.fire({
                            title: "Error",
                            text: err.message, // Display the validation error message
                            icon: "error",
                        });
                    });
                } else {
                    MySwal.fire({
                        title: "Error",
                        text: error.data.message || "An error occurred during sign up.",
                        icon: "error",
                    });
                }
            }
        } finally {
            // setLoading(false);
        }
    }
    return (
        <div>
            <div className="rounded-md space-y-10 flex flex-col items-center py-12">
                <h1 className="text-3xl md:text-5xl text-grayText text-center font-bold">Create Facility</h1>
                <form className="space-y-10 w-96 px-2 lg:px-0" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-x-10 gap-y-5 items-end">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 text-sm text-grayText">Name</label>
                            <input
                                type="text"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: "Name is required."
                                    }, minLength: { value: 5, message: 'This input requires 5 character' }
                                })}
                                className="w-full appearance-none text-grayText focus:text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100"
                            />
                        </div>
                        <div>
                            {errors.name && <p className="text-grayText/60 text-sm">{errors.name?.message}</p>}
                        </div>
                        {/* Desc */}
                        <div>
                            <label className="block mb-1 text-sm text-grayText">Description</label>
                            <input
                                type="text"
                                {...register('description', {
                                    required: {
                                        value: true,
                                        message: "Description is required."
                                    }, minLength: { value: 20, message: 'This input requires 20 character' }
                                })}
                                className="w-full appearance-none text-grayText focus:text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100 "
                            />
                        </div>
                        <div>
                            {errors.description && <p className="text-grayText/60 text-sm">{errors.description?.message}</p>}
                        </div>
                        {/* Price */}
                        <div>
                            <label className="block mb-1 text-sm text-grayText">Price Per Hour</label>
                            <input
                                type="number"
                                // onChange={(e) => setPricePerHour(Number(e.target.value))}
                                {...register('pricePerHour', {
                                    valueAsNumber: true,
                                    required: {
                                        value: true,
                                        message: "Price is required."
                                    }, maxLength: { value: 5, message: 'Price cannot exceed from 5 digit' }
                                },)}
                                className="w-full appearance-none text-grayText focus:text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100 "
                            />
                        </div>
                        <div>
                            {errors.pricePerHour && <p className="text-grayText/60 text-sm">{errors.pricePerHour?.message}</p>}
                        </div>
                        {/* Location */}
                        <div>
                            <label className="block mb-1 text-sm text-grayText">Location</label>
                            <input
                                type="text"
                                {...register('location', {
                                    required: {
                                        value: true,
                                        message: "Location is required."
                                    }
                                })}
                                className="w-full appearance-none text-grayText focus:text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100 "
                            />
                        </div>
                        <div>
                            {errors.location && <p className="text-grayText/60 text-sm">{errors.location?.message}</p>}
                        </div>
                        {/* Image */}
                        <div>
                            <label className="block mb-1 text-sm text-grayText">Image Url</label>
                            <input
                                type="text"
                                {...register('image', {
                                    required: {
                                        value: true,
                                        message: "Image is required."
                                    }
                                })}
                                className="w-full appearance-none text-grayText focus:text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100 "
                            />
                        </div>
                        <div>
                            {errors.image && <p className="text-grayText/60 text-sm">{errors.image?.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <motion.button className="w-full bg-accent hover:bg-accent/80 text-grayText font-medium py-3 px-6 rounded-full ease-in-out duration-100">
                            Create
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFacility