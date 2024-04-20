import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";





const Login = () => {
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { singInWithEmailPAss, setLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location?.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data)
        singInWithEmailPAss(data.email, data.password)
            .then((result) => {
                if (result.user) {
                    // console.log(result.user)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
                navigate(path)
                setLoading(false)
                reset();
            })
            .catch((error) => {
                setError(error.message)
            });

    }
    useEffect(() => {
        loadCaptchaEnginge(6);

    }, [])

    return (
        <div>
            <Helmet>
                <title>Login | Capture School</title>
            </Helmet>
            <Link to="/"><button className="btn btn-outline absolute top-2 right-3 btn-sm">Go Back to Homepage</button></Link>
            <div className="hero min-h-screen bg-base-100 mb-10">
                <div className="hero-content flex-col  md:flex-row-reverse">
                    <div className="text-center md:text-left w-9/12 md:w-6/12">
                        <h1 className="text-5xl font-bold text-center">Login now!</h1>
                        <div>
                            <img src="https://i.pinimg.com/564x/14/47/c3/1447c3dde903d7ac5681ca2e774a3411.jpg" alt="" />
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body mb-0">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                                </label>
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input relative input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input {...register("password", { required: true })} type={`${showPass ? "text" : "password"}`} className="grow" placeholder="password" />
                                    <span onClick={() => setShowPass(!showPass)}>
                                        {
                                            !showPass ? <FaEyeSlash></FaEyeSlash> : <FaRegEye></FaRegEye>
                                        }
                                    </span>
                                </label>
                                {errors.password && <span className="text-red-500">This field is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input onBlurCapture={(e) => {
                                        if (validateCaptcha(e.target.value) === true) {
                                            setDisabled(false)
                                        }
                                        else {
                                            setDisabled(true)
                                        }
                                    }}  {...register("captcha", { required: true })} type="text" className="grow" placeholder="Enter Captcha Key" />
                                </label>
                                {errors.captcha?.type === "required" && <span className="text-red-500">You must have to enter Captcha</span>}
                            </div>
                            {error && <span className="text-red-500">Email or Password Does not Matched</span>}

                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-primary font-serif text-white" type="submit" >
                                    Login
                                </button>
                            </div>
                            <span className="text-xs my-0">
                                New to Capture School?
                                <span className="btn btn-link btn-sm">
                                    <Link to="/register"> Register</Link>
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

export default Login;