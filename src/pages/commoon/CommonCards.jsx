
const CommonCards = ({ ele, handelDelete }) => {
    const { image, title, InstructorName, availableSetes, price, _id } = ele

    return (
        <div>
            <div className="border rounded-md overflow-hidden shadow-lg flex">
                <div className="p-4 border-b flex justify-center items-center">
                    <div className="flex justify-center items-center">
                        <img className="w-32 h-auto" src={image} alt={title} /> {/* Adjust image size */}
                    </div>
                </div>
                <div className="p-4 border-b font-bold flex flex-col justify-center max-w-4xl">
                    <div className=" text-xl md:text-2xl mb-2">{title}</div>
                    <div className="text-slate-500 md:text-xl">
                        <p className=" mb-2">Instructor: {InstructorName}</p>
                        <p className=" mb-2">Available Sets: {availableSetes}</p>
                        <p className=" mb-2">Price: ${price}</p>
                    </div>
                </div>
                <div className="p-4 border-b flex justify-center items-center ms-auto">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handelDelete(_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommonCards
