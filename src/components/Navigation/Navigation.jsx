import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ActiveLink from './../ActiveLink/ActiveLink';



const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut, setLoading } = useContext(UserContext)


    const handleSearchClick = () => {

    };
    // console.log(user)


    const handelLogout = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure want to Sing out?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Sing Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Sing Out Successful!",
                            text: "Your are just log out .",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
            setLoading(false)
        });

    }
    return (
        <div>
            <div className="navbar shadow-sm  py-0  rounded-lg">
                <div className="navbar-start md:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><ActiveLink to="/">Home</ActiveLink></li>
                            <li><ActiveLink to="dasboard">Dashboard</ActiveLink></li>
                            <li><ActiveLink to="instructors">Instructors</ActiveLink></li>
                            <li><ActiveLink to="classes">Classes</ActiveLink></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar">
                    <ActiveLink to="/" className=" font-serif text-nowrap font-semibold text-3xl underline">Capture School.com</ActiveLink>
                </div>
                <div className="navbar md:max-w-[400px] lg:max-w-[600px] overflow-x-scroll scrl">
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal px-1 ">
                            <li><ActiveLink to="/">Home</ActiveLink></li>
                            <li><ActiveLink to="dasboard">Dashboard</ActiveLink></li>
                            <li><ActiveLink to="instructors">Instructors</ActiveLink></li>
                            <li><ActiveLink to="classes">Classes</ActiveLink></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className={`relative ${isOpen ? "" : "hidden"} me-4   lg:block`}>
                        <input
                            onBlur={() => setIsOpen(false)}
                            type="text"
                            className="pl-4 pr-9 min-w-[250px] py-1 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="Search..."
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-lg"
                            onClick={handleSearchClick}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                        </button>
                    </div>
                    <div className={`lg:hidden ${isOpen ? "hidden" : ""} relative  flex`}>
                        <button onClick={() => {
                            setIsOpen(!isOpen)
                        }} className="btn  btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="profile" className="justify-between">
                                        {user?.displayName ? user.displayName : "Profile"}
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li onClick={handelLogout}><Link className="justify-between" >Logout <LuLogOut className="me-4"></LuLogOut></Link></li>
                            </ul>
                        </div>
                            :
                            <button className="btn  btn-ghost btn-circle">
                                <Link to="login"><LuLogIn className="text-2xl my-3" /></Link>
                            </button>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navigation;