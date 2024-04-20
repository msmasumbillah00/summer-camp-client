
const Newslater = () => {
    return (
        <div className="bg-gray-100 py-8 px-4 md:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Stay Updated with Our Latest Photography Tips and Special Offers</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6">Join our photography community for exclusive content and updates.</p>
                <form className="flex flex-col md:flex-row items-center justify-center max-w-lg mx-auto">
                    <input className="flex-grow py-2 px-4 md:mr-2 mb-2 md:mb-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" name="email" placeholder="Enter your email address" required />
                    <button className="bg-blue-500 text-white py-2 px-6 md:px-8 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100" type="submit">Subscribe</button>
                </form>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-2">We respect your privacy. Your information will be kept secure and will not be shared with third parties.</p>
            </div>
        </div>
    );
};

export default Newslater;