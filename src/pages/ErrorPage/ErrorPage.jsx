import { Link, useLocation } from "react-router-dom";


const ErrorPage = () => {
    const location = useLocation();
    return (
        <div>
            <div className="bg-cover bg-center  h-screen flex items-center justify-center" style={{ backgroundImage: 'url("https://i.pinimg.com/originals/cb/e0/a7/cbe0a7a7797c52f8930abe04a2f87092.gif")' }}>
                <div className="bg-opacity-50 bg-black rounded-xl  p-8 text-center">
                    <h1 className="text-5xl text-white font-bold mb-4">Oops! Something went wrong</h1>
                    <p className="text-3xl text-white mb-2">Error Code: 404 - Page Not Found</p>
                    <p className="text-lg text-white mb-8">The page at "{location.pathname}" does not exist.</p>
                    <button className="btn btn-ghost text-white btn-outline absolute top-2 right-3 btn-sm"><Link to="/">Go Back to Homepage</Link></button>
                    <p className="text-base text-white">Please try again later or contact support.</p>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;