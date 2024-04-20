
const ClassCard = ({ ele }) => {
    return (
        <div className={`card  ${ele.availableSetes === 0 ? "bg-red-200" : "bg-slate-50"}  p-3 md:card-side bg-base-100 shadow-xl`}>
            <figure><img className="max-h-[400px] min-h-[300px] rounded-md" src={ele.image} alt="Album" /></figure>
            <div className="card-body text-gray-500">
                <h2 className="card-title text-[25px]  underline">{ele.title}</h2>
                <h2 className=" text-xl font-semibold mb-auto"> Instractor:-  <span>{ele.InstructorName}</span></h2>
                <div>
                    <p><span className="font-bold text-xl">Available seats: {ele.availableSetes}</span></p>
                    <p><span className="font-bold text-xl">Price: ${ele.price}</span></p>
                </div>
                <div className="card-actions justify-end absolute bottom-0 right-7">
                    <button disabled={ele.availableSetes === 0} className="btn  w-fit my-4 btn-sm min-w-32 shadow-xl text-white bg-gradient-to-tr  from-cyan-500  to-slate-400">Add </button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;