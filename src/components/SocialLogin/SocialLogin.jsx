import { useContext } from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { UserContext } from '../../context/UserContextProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = ({ setError }) => {
    const { singInWithGoogle, setLoading } = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    const path = location?.state?.from?.pathname || "/";


    // const checkAccountExists = async (email) => {
    //     try {
    //       const methods = await fetchSignInMethodsForEmail(auth, email);
    //       if (methods.length === 0) {
    //         // No account exists with this email
    //         console.log("No account exists with this email.");
    //       } else {
    //         // Account exists with this email
    //         console.log("An account exists with this email.");
    //         // You can also check the methods array to see which sign-in methods are associated with the email
    //         console.log("Sign-in methods:", methods);
    //       }
    //     } catch (error) {
    //       // Error occurred while checking for account existence
    //       console.error("Error checking account existence:", error.message);
    //     }
    //   };


    const handleLogin = (provider) => {
        setLoading(true)
        if (provider === "Google") {
            singInWithGoogle()
                .then((result) => {
                    const user = result.user;
                    const userData = {
                        email: user.email,
                        name: user.displayName,
                        image: user.photoURL,
                        phone: null,
                        gender: null,
                        address: null,
                        role: "student"

                    }
                    // console.log(localStorage.getItem("car-access-token"))
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
                })
                .catch(error => {
                    setError(error.message)
                })
        }
    };

    return (
        <div className='mb-5'>
            <div className="flex justify-center items-center ">
                <div className="flex gap-4">
                    <button
                        className="bg-red-600  hover:bg-red-800 text-white btn  btn-circle  flex items-center justify-center"
                        onClick={() => handleLogin('Google')}
                    >
                        <FaGoogle className='text-3xl' />
                    </button>
                    <button
                        className="bg-blue-600  hover:bg-blue-800 text-white btn  btn-circle  flex items-center justify-center"
                        onClick={() => handleLogin('Facebook')}
                    >
                        <FaFacebook className='text-3xl' />
                    </button>
                    <button
                        className="bg-gray-700  hover:bg-gray-900 text-white btn  btn-circle  flex items-center justify-center"
                        onClick={() => handleLogin('GitHub')}
                    >
                        <FaGithub className='text-3xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;