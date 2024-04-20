// import { Outlet } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer"
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
    const location = useLocation();

    return (
        <div className=" min-h-screen flex flex-col">
            <div className="container mx-auto">

                {
                    location.pathname.includes('login') || location.pathname.includes('register') ? "" : <Header></Header>
                }
                <Outlet></Outlet>
            </div>
            <div className="mt-auto bg-black text-white p-5">
                <div className="container mx-auto">
                    {
                        location.pathname.includes('login') || location.pathname.includes('register') ? "" : <Footer></Footer>
                    }

                </div>
            </div>
        </div>
    );
};

export default Main;