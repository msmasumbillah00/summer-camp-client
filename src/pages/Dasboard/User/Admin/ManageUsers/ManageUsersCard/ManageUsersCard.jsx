import { CiEdit } from "react-icons/ci";
import { useContext, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { UserContext } from "../../../../../../context/UserContextProvider";


const ManageUsersCard = ({ ele, handleDelete, handelUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [role, setRole] = useState(ele.role)
    const { user } = useContext(UserContext)

    return (
        <div>
            <div className="border rounded-md overflow-hidden shadow-lg flex mb-10">
                <div className="p-4 border-b flex justify-center items-center">
                    <div className="flex justify-center items-center">
                        <img className="max-w-32 rounded-md h-auto" src={ele.image} /> {/* Adjust image size */}
                    </div>
                </div>
                <div className="p-4 border-b font-bold flex flex-col justify-center max-w-4xl">
                    <div className="text-slate-500 lg:text-xl">
                        <p className="mb-2 text-teal-600 text-3xl">
                            {!isEditing ?
                                ele.role :
                                <select defaultValue={role} onChange={(e) => setRole(e.target.value)} name="gender" className="select select-bordered select-sm">
                                    <option >admin</option>
                                    <option >instructor</option>
                                    <option >student</option>
                                </select>
                            }
                            {
                                isEditing ?
                                    <>
                                        <MdCancel onClick={() => setIsEditing(false)} className="inline ms-2" />
                                        <GrUpdate onClick={() => {
                                            setIsEditing(false)
                                            handelUpdate(ele._id, role)
                                        }} className="inline ms-2" />

                                    </>
                                    : <CiEdit onClick={() => setIsEditing(true)} className={` ${user.email === ele.email ? "hidden" : "inline"} inline ms-2`} />
                            }
                        </p>
                        <p className="mb-2">Name: {ele.name}</p>
                        <p className="mb-2">Email: {ele.email}</p>
                        <p className="mb-2">Gender: {ele.gender}</p>
                        <p className="mb-2">Phone: {ele.phone}</p>
                        <p className="mb-2">Address: {ele.address}</p>

                    </div>
                </div>
                <div className="p-4 border-b flex justify-center items-center ms-auto">
                    <button
                        className={`bg-red-500 hover:bg-red-700 ${user.email === ele.email ? "hidden" : "visible"} text-white font-bold py-2 px-4 rounded`}
                        onClick={() => handleDelete(ele._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageUsersCard;