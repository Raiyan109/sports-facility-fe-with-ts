import { motion } from "framer-motion";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import heroImg from '../../assets/pexels-yogendras31-4747326.jpg'

import { useDispatch } from "react-redux";

import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { Loading } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { TLoginFormValues } from "@/types";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal);
    const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormValues>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isBackendError(error: any): error is { data: { errors?: { message: string }[], message?: string } } {
        return error && error.data;
    }


    const onSubmit: SubmitHandler<TLoginFormValues> = async (data) => {
        console.log(data);

        try {
            const res = await login(data).unwrap()
            console.log(res.data);

            dispatch(setUser({ user: res.data, token: res.token }))
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);

            // Handle backend validation errors
            if (isBackendError(error)) {

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
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }
    return (
        <div className="max-w-[1480px] mx-auto container overflow-hidden px-10">
            <Navbar />
            <div className="flex mt-5 items-center justify-center flex-col md:flex-row relative bg-secondary rounded-2xl">
                <div className="flex-1 rounded-md space-y-10 w-96 flex flex-col items-center py-12">
                    <h1 className="text-3xl md:text-5xl text-grayText text-center font-bold">Login Here</h1>
                    <form className="space-y-10 w-96 px-2 lg:px-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-5 items-end">
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Email</label>
                                <input
                                    type="email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Email is required."
                                        },
                                        pattern:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    })}
                                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                />
                            </div>
                            <div>
                                {errors.email && <p>{errors.email?.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Password</label>
                                <input
                                    type="password"
                                    // onChange={(e) => setPassword(e.target.value)}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "Password is required."
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 6 characters"
                                        }
                                    })}
                                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                />
                            </div>
                            <div>
                                {errors.password && <p>{errors.password?.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <motion.button className="w-full bg-primary hover:bg-primary/80 text-grayText font-medium py-3 px-6 rounded-full ease-in-out duration-100">
                                Login
                            </motion.button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center">
                        <Link to="/signUp" className="text-lg font-semibold text-grayText">
                            Or Sign Up Here
                        </Link>
                    </div>
                </div>
                <div className='hidden lg:block flex-1'>
                    <img src={heroImg} alt="" className='w-full object-cover rounded-2xl rounded-tl-none h-[700px]' />
                </div>
            </div>
        </div>
    )
}

export default Login