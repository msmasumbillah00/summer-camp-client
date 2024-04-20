import { useEffect, useState } from "react";
import ClassCard from "../../commoon/ClassCard";

const PopularClass = () => {
    const [classesData, setclassesData] = useState([]);

    useEffect(() => {
        fetch("https://summer-camp-school-server-plum.vercel.app/popularClasses")
            .then(res => res.json())
            .then(data => {
                setclassesData(data);
            })

    }, []);
    return (
        <div className="mb-10 px-2">
            <div className="text-5xl font-semibold text-center mt-10 ">Our Popular Classes</div>
            <p className="md:w-9/12 text-[18px] lg:w-6/12 mx-auto mt-2 border-b pb-5 mb-20 first-letter:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium culpa vitae libero repudiandae quas, odio similique eaque minus aperiam accusantium.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {
                    classesData.map(ele => {
                        return (
                            <ClassCard ele={ele} key={ele._id}></ClassCard>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default PopularClass;