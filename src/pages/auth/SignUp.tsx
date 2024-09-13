import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import heroImg from '../../assets/pexels-yogendras31-4747326.jpg'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput, {
    isPossiblePhoneNumber,
} from 'react-phone-number-input'
import { TSignUpFormValues } from "@/types";
import { useSignupMutation } from "@/redux/features/auth/authApi";

const SignUp = () => {
    const [role] = useState('user')
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [signup] = useSignupMutation()
    const { register, handleSubmit, formState: { errors }, control } = useForm<TSignUpFormValues>();

    // Utility function to type guard and check if the error is a backend error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isBackendError(error: any): error is { data: { errors?: { message: string }[], message?: string } } {
        return error && error.data;
    }

    const onSubmit: SubmitHandler<TSignUpFormValues> = async (data) => {
        const userInfo = {
            ...data,
            role
        }

        try {
            await signup(userInfo)
            MySwal.fire({
                title: "Sign up successfully! ",
                text: "Redirecting to Login page",
                icon: "success",
            });
            navigate("/login");
        } catch (error: unknown) {
            console.log(error);

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

    // const isRequiredInput = (value: number) => {
    //     return value ? true : 'This is a required input, can not escape';
    // }
    return (
        <div className="max-w-[1480px] mx-auto container overflow-hidden px-10">
            {/* <Navbar /> */}
            <div className="flex justify-center items-center flex-col md:flex-row relative bg-secondary mt-5 rounded-2xl">
                <div className="flex-1 rounded-md space-y-10 w-96 flex flex-col items-center py-12">
                    <h1 className=" text-3xl md:text-5xl text-grayText text-center font-bold">Sign Up Here</h1>
                    <form className="space-y-10 w-96 px-2 lg:px-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-5 items-end">
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Name</label>
                                <input
                                    type="text"
                                    // onChange={(e) => setName(e.target.value)}
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "Name is required."
                                        }, minLength: { value: 5, message: 'This input requires 5 character' }
                                    })}
                                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                />
                            </div>
                            <div>
                                {errors.name && <p>{errors.name?.message}</p>}
                                {/* <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>} />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    }
                  /> */}

                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Email</label>
                                <input
                                    type="email"
                                    // onChange={(e) => setEmail(e.target.value)}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Email is required."
                                        }
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
                                        }
                                    })}
                                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                />
                            </div>
                            <div>
                                {errors.password && <p>{errors.password?.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Phone</label>
                                {/* <input
                    type="number"
                    {...register('phone', { required: true })}
                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                  /> */}
                                <Controller
                                    name="phone"
                                    control={control}
                                    // rules={{
                                    //   validate: (value) => isPossiblePhoneNumber(`${value}`)
                                    // }}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Phone number is required'
                                        },
                                        // validate: (value) => isPossiblePhoneNumber(`${value}`)
                                        // validate: { isRequired: isRequiredInput }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <PhoneInput
                                            defaultCountry="BD"
                                            id='phone'
                                            placeholder=""
                                            value={value}
                                            onChange={onChange}
                                            error={value ? (isPossiblePhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number is required'}
                                            numberInputProps={{
                                                className: 'rounded-md px-4 focus:outline-none bg-transparent' // my Tailwind classes
                                            }}
                                            className="w-full appearance-none text-grayText  placeholder:text-primary bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                        />
                                    )}
                                />

                            </div>
                            <div>
                                {errors['phone'] && <p>{errors['phone']?.message}</p>}
                                {/* {errors['phone'] && <p>Invalid Phone number</p>} */}
                                {/* Is possible: {value && isPossiblePhoneNumber(value) ? 'true' : 'false'} */}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm text-grayText">Address</label>
                                <input
                                    type="text"
                                    // onChange={(e) => setAddress(e.target.value)}
                                    {...register('address', {
                                        required: {
                                            value: true,
                                            message: "Address is required."
                                        }
                                    })}
                                    className="w-full appearance-none text-grayText  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-grayText focus:text-primary"
                                />
                            </div>
                            <div>
                                {errors.address && <p>{errors.address?.message}</p>}
                            </div>
                            {/* Role */}
                            {/* <div>
                  <label className="block mb-1 text-sm text-grayText">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none text-primary  placeholder:text-primary  inline-block bg-secondary  px-3 h-9 border border-grayText  rounded-md focus:outline-none focus:bg-neutral-100 "
                  >
                    <option disabled selected>
                      {" "}
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div> */}
                        </div>
                        <div className="flex justify-center items-center">
                            {/* w-fit */}
                            <motion.button className="w-full bg-primary hover:bg-primary/80 text-grayText font-medium py-3 px-6 rounded-full ease-in-out duration-100">
                                Sign Up
                            </motion.button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center">
                        <Link to="/login" className="text-lg font-semibold text-grayText">
                            or login here
                        </Link>
                    </div>
                </div>
                <div className='hidden lg:block flex-1'>
                    <img src={heroImg} alt="" className='w-full h-[800px] object-cover rounded-2xl rounded-tl-none' />
                </div>
            </div>
        </div>
    )
}

export default SignUp