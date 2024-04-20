import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Newslater from './../Newslater/Newslater';
import TripTricks from "../TripTricks/TripTricks";

const Home = () => {

    return (
        <div className="p-4">
            <Helmet>
                <title>Home | Capture School</title>
            </Helmet>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <div className=" mt-24">
                <PopularInstructor></PopularInstructor>
            </div>
            <div>
                <TripTricks></TripTricks>
            </div>
            <div className=" my-24">
                <Newslater></Newslater>
            </div>

        </div>
    );
};

export default Home;