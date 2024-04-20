import { useEffect, useState } from "react";
import InstructorCard from "../commoon/InstructorCard";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch("https://summer-camp-school-server-plum.vercel.app/instructors")
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
            })

    }, []);
    return (
        <div className="my-16">
            <h1 className="text-[40px] my-20 pb-6 text-center font-semibold sticky top-0 z-10 bg-white">Our Instructors</h1>
            <div className="mb-20">
                <div
                    className="grid p-4 my-20 container_scrl grid-cols-1 place-items-center mt-10 lg:grid-cols-2 gap-10  ">
                    {
                        instructors.map(ele => <InstructorCard ele={ele} key={ele._id}></InstructorCard>)
                    }

                </div>
            </div>

        </div>
    );
};

export default Instructors;