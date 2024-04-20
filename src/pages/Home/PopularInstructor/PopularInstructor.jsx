import { useEffect, useState } from "react";
import InstructorCard from "../../commoon/InstructorCard";

const PopularInstructor = () => {
    const [popularinstructors, setPopularInstructors] = useState([]);

    useEffect(() => {
        fetch("https://summer-camp-school-server-plum.vercel.app/popularinstructors")
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setPopularInstructors(data);
            })

    }, []);
    return (
        <div className="mb-10  px-2">
            <div className="text-5xl font-semibold text-center mt-10 ">Our Popular Instructors</div>
            <p className="md:w-9/12 text-[18px] lg:w-6/12 mx-auto mt-2 border-b pb-5 mb-20 first-letter:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa vitae libero repudiandae quas, odio similique eaque minus aperiam accusantium.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {
                    popularinstructors.map(ele => {
                        return (
                            <InstructorCard ele={ele} key={ele._id}></InstructorCard>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default PopularInstructor;