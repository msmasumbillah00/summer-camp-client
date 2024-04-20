
const InstructorCard = ({ ele }) => {
    return (
        <div className="card md:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className='md:max-w-[300px] bg-slate-300' ><img className=" max-h-[500px]" src={ele.image} /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">{ele.name}</h2>
                <div>
                    <p><span className="font-bold">Total Class:-</span> <span className="font-bold  text-slate-500">{ele.classesTaken}</span></p>
                    <p><span className="font-bold">Email:</span> <span className="font-bold btn-link  text-slate-500"><a href={`mailto:${ele.email}`}>{ele.email}</a></span></p>
                    <p><span className="font-bold">Main Class:</span> <span className="font-bold  text-slate-500">{ele.classes[0]}</span></p>

                </div>
                <div className="card-actions justify-end mt-auto">
                    <button className="btn w-fit my-4 btn-md text-white bg-gradient-to-tr  from-cyan-500 to-slate-400">See All Class</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;