import { FaHome, FaBookReader, FaUserGraduate, FaWallet } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";


import { Link, Outlet } from "react-router-dom";
import ActiveLink from "../../components/ActiveLink/ActiveLink";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import useAxios from "../../hooks/useAxios";
import { LuLogOut } from "react-icons/lu";

const Dasboard = () => {
    const { user, logOut } = useContext(UserContext);

    const currentUser = useAxios(`users?email=${user.email}`);
    // console.log(currentUser)


    return (
        <div className=" bg-slate-100 min-h-screen">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden absolute right-0 top-0">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>

                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-gradient-to-tr from-slate-100 to-slate-200 text-base-content">
                        {/* Sidebar content here */}
                        <ActiveLink to="/" className=" font-serif text-nowrap mb-5 font-semibold text-2xl underline">Capture School.com</ActiveLink>
                        {
                            currentUser?.data?.role &&
                            <>
                                {
                                    currentUser.data.role === "instructor" &&
                                    <>
                                        <li><Link to="/dasboard"> <FaHome /> Instructors Home</Link></li>
                                        <li><Link to="/dasboard/addclasses"> <FaBookBookmark />Add Classes</Link></li>
                                        <li><Link to="/dasboard/myClass"> <FaBookReader /> My Classes</Link></li>
                                    </>
                                }
                                {
                                    currentUser.data.role == "admin" &&
                                    <>
                                        <li><Link to="/dasboard"> <FaHome /> Admin Home</Link></li>
                                        <li><Link to="/dasboard/manageClasses"> <FaBookBookmark />Manage Classes</Link></li>
                                        <li><Link to="/dasboard/manageUsers"> <FaBookReader /> Manage Users</Link></li>
                                    </>
                                }
                                {
                                    currentUser.data.role == "student" &&
                                    <>
                                        <li><Link to="/dasboard"> <FaHome /> Students Home</Link></li>
                                        <li><Link to="/dasboard/myclasses"> <FaBookBookmark />My Selected Classes</Link></li>
                                        <li><Link to="/dasboard/enrolledClass"> <FaBookReader /> My Enrolled Classes</Link></li>
                                        <li><Link to="/dasboard/payment"> <FaWallet /> Payment History</Link></li>
                                    </>
                                }
                            </>

                        }


                        <div className="border-b border-slate-400 my-5"></div>
                        <li><Link to="/"> <FaHome /> Home</Link></li>
                        <li><Link to="/classes"> <FaBookReader /> Classes</Link></li>
                        <li><Link to="/instructors"> <FaUserGraduate /> Instructors</Link></li>
                        <li><Link onClick={logOut}> <LuLogOut className="font-bold text-xl" /> Logout</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dasboard;