import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";



const Register = () => {
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const { createUserWithEmailPAss, updateUser, setLoading } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const image_hosting_token = import.meta.env.VITE_IMBB_API_KEY;
    const navigate = useNavigate();
    const location = useLocation();
    const path = location?.state?.from?.pathname || "/";
    const [phoneNumber, setPhoneNumber] = useState(null);


    // console.log(image_hosting_token);
    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
    };
    const sendImageToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_hosting_token}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                // console.log(data.data.display_url);
                return data.data.display_url;
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const password = watch("password", "");

    const onSubmit = (data) => {

        // console.log(userData)
        setError("")
        createUserWithEmailPAss(data.email, data.password)
            .then(async () => {
                const imageUrl = await sendImageToServer(image)
                updateUser(data.name, imageUrl)
                    .then(() => {
                        const userData = {
                            email: data.email,
                            name: data.name,
                            image: imageUrl,
                            phone: "+" + phoneNumber,
                            gender: data.gender,
                            address: data.address,
                            role: "student"

                        }
                        fetch("https://summer-camp-school-server-plum.vercel.app/users", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userData),
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Registration successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })

                        navigate(path)
                        setLoading(false)
                        reset();
                    })
                    .catch(error => {
                        setError(error)
                    })

            })
            .catch((error) => {
                setError(error.message || error);
            });
        // console.log(data)
    }

    // summer-camp-school-21dc4

    return (
        <div>
            <Helmet>
                <title>Registration | Capture School</title>
            </Helmet>
            <Link to="/"><button className="btn btn-outline absolute top-2 right-3 btn-sm">Go Back to Homepage</button></Link>

            <div className="hero min-h-screen bg-base-100 mb-10">
                <div className="hero-content flex-col  md:flex-row-reverse">
                    <div className="text-center md:text-left w-9/12 md:w-6/12">
                        <h1 className="text-5xl font-bold text-center">Register Here</h1>
                        <div>
                            <img src="https://i.pinimg.com/564x/36/f0/e7/36f0e76abd4a79445d4914b5d9c72bf3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body mb-0">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input {...register("name", { required: true })} type="text" className="grow" placeholder="Name" />
                                </label>
                                {errors.name?.type === "required" && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                                </label>
                                {errors.email?.type === "required" && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-sm relative input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/i })} type={`${showPass ? "text" : "password"}`} className="grow" placeholder="password" />
                                    <span onClick={() => setShowPass(!showPass)}>
                                        {
                                            !showPass ? <FaEyeSlash></FaEyeSlash> : <FaRegEye></FaRegEye>
                                        }
                                    </span>
                                </label>
                                {errors.password?.type === "required" && <span className="text-red-500">This field is required</span>}
                                {errors.password?.type === "pattern" && <span className="text-red-500">One uppercase One Lowercase</span>}
                                {errors.password?.type === "minLength" && <span className="text-red-500">Must have 6 chrecter</span>}
                                {errors.password?.type === "maxLength" && <span className="text-red-500">Your password should not big then 20 chrecter</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <label className="input input-sm relative input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input {...register("confirmPassword", { required: true, validate: value => value === password })} type={`${showPass ? "text" : "password"}`} className="grow" placeholder="Confirm password" />
                                    <span onClick={() => setShowPass(!showPass)}>
                                        {
                                            !showPass ? <FaEyeSlash></FaEyeSlash> : <FaRegEye></FaRegEye>
                                        }
                                    </span>
                                </label>
                                {errors.confirmPassword?.type === "required" && <span className="text-red-500">This field is required</span>}
                                {errors.confirmPassword?.type === "validate" && <span className="text-red-500">Password not Matched</span>}
                            </div>
                            <div className="form-control">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Pick a photo</span>
                                    </div>
                                    <input accept="image/*" onChangeCapture={handleImageChange} {...register("photo", { required: true })} type="file" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                                </label>
                                {errors.photo?.type === "required" && <span className="text-red-500">This field is required</span>}

                            </div>
                            <div className="form-control  flex flex-row gap-3">
                                <label className=" -mt-1 w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <select {...register("gender", { required: true })} className="select select-bordered select-sm">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                    {errors.gender?.type === "required" && <span className="text-red-500">This field is required</span>}

                                </label>
                                <label className=" -mt-1 w-[600px] ">
                                    <div className="label">
                                        <span className="label-text">Phone</span>
                                    </div>
                                    <PhoneInput
                                        country={'bd'}
                                        inputStyle={{ width: '100%', marginLeft: "0", borderRadius: "10px", maxHeight: "30px" }}
                                        containerStyle={{ borderRadius: "10px", maxHeight: "30px" }}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: true
                                        }}
                                    />
                                </label>


                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 0 1 1 1v1h4a1 1 0 0 1 0 2h-1v2h2a1 1 0 0 1 0 2h-2v2h2a1 1 0 0 1 0 2h-2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5zm3 5V5H7v2h6zm0 4v2H7v-2h6z" clipRule="evenodd" />
                                    </svg>
                                    <input {...register("address", { required: true })} type="text" className="grow" placeholder="Enter Full Address" />
                                </label>
                                {errors.address?.type === "required" && <span className="text-red-500">This field is required</span>}
                            </div>





                            <div className="form-control mt-2">
                                <span>
                                    {
                                        error && <span className="text-red-500 mb-2 block">{error}</span>
                                    }
                                </span>
                                <button className="btn btn-sm btn-primary font-serif text-white" type="submit" >
                                    Register now
                                </button>
                            </div>
                            <span className="text-xs my-0">
                                Already Have an Account?
                                <span className="btn btn-link btn-sm">
                                    <Link to="/login"> Login</Link>
                                </span>
                            </span>

                        </form>
                        <div className="divider mt-0 px-4">OR</div>
                        <SocialLogin setError={setError}></SocialLogin>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;