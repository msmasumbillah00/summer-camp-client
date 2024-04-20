
const TripTricks = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">Photography Tips and Tricks</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Composition Techniques */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Composition Techniques</h3>
                        <p className="text-gray-700 mb-4">
                            Learn how to create compelling compositions that capture attention and evoke emotion.
                        </p>
                        {/* Image placeholder */}
                        <img src="https://i.pinimg.com/564x/84/6b/73/846b734bec86eb37de766e20d55ab5d5.jpg" alt="Composition Techniques" className="w-full h-auto rounded-lg mb-4" />
                        <ul className="list-disc list-inside">
                            <li>Rule of Thirds</li>
                            <li>Leading Lines</li>
                            <li>Framing</li>
                        </ul>
                    </div>

                    {/* Lighting Tips */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Lighting Tips</h3>
                        <p className="text-gray-700 mb-4">
                            Master the art of lighting to create stunning photographs with depth and dimension.
                        </p>
                        {/* Image placeholder */}
                        <img src="https://i.pinimg.com/236x/ee/53/dd/ee53ddddc8801eaa90470f5c25934df9.jpg" alt="Lighting Tips" className="w-full h-auto rounded-lg mb-4" />
                        <ul className="list-disc list-inside">
                            <li>Natural Light vs. Artificial Light</li>
                            <li>Golden Hour Photography</li>
                            <li>Using Reflectors and Diffusers</li>
                        </ul>
                    </div>

                    {/* Camera Settings and Techniques */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Camera Settings and Techniques</h3>
                        <p className="text-gray-700 mb-4">
                            Explore different camera settings and techniques to achieve the desired effects in your photos.
                        </p>
                        {/* Image placeholder */}
                        <img src="https://i.pinimg.com/736x/ea/31/03/ea3103066656241d09bdd52da7c81d75.jpg" alt="Camera Settings and Techniques" className="w-full h-auto rounded-lg mb-4" />
                        <ul className="list-disc list-inside">
                            <li>Aperture, Shutter Speed, and ISO</li>
                            <li>Depth of Field</li>
                            <li>Shooting in Manual Mode</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripTricks;