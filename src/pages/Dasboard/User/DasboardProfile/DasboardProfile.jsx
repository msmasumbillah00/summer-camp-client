import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContextProvider";
import useAxios from "../../../../hooks/useAxios";
import Loading from "../../../../components/Loading/Loading";
import { FaEdit } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";


const DasboardProfile = () => {
    const { user, updateUser } = useContext(UserContext);
    const image_hosting_token = import.meta.env.VITE_IMBB_API_KEY;
    const currentUser = useAxios(`users?email=${user.email}`);

    const [isEditing, setIsEditing] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [image, setImage] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        document.body.removeChild(event.target);
    };
    const sendImageToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_hosting_token}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                // console.log(data.data.display_url);
                return data.data.display_url;
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    const handleButtonClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.onchange = handleFileChange;
        document.body.appendChild(fileInput);
        fileInput.click();
    };

    const handelUpdate = async (e) => {
        e.preventDefault()
        let imageUrl = user.photoURL;
        if (imageSrc) {
            imageUrl = await sendImageToServer(image);
        }
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const gender = form.gender.value;
        const address = form.address.value;
        const photo = imageUrl || user.photoURL;
        updateUser(name, imageUrl)
        const userData = {
            name,
            phone,
            gender,
            address,
            photo
        }


        fetch(`https://summer-camp-school-server-plum.vercel.app/users?email=${user.email}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("car-access-token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        setIsEditing(false)
        setImageSrc(null)
        currentUser.refetch()

    }

    // console.log(currentUser)
    if (currentUser.loading) return <Loading></Loading>
    // console.log(currentUser)
    else if (currentUser.data) {
        const { name, email, phone, address, gender, image, role } = currentUser.data;

        return (
            <div className=" shadow-md rounded-lg overflow-hidden mt-10">
                <form onSubmit={handelUpdate}>
                    <div className="card xl:card-side  shadow-xl p-8">
                        <figure className="max-w-[500px] lg:max-w-[90%] relative">
                            <img src={isEditing && imageSrc !== null ? imageSrc : image} className="rounded-xl max-h-[900px]" alt="Profile" />
                            {
                                isEditing && <FaEdit onClick={handleButtonClick} className=" text-4xl max-w-16 max-h-16 p-2 rounded bg-gray-400 text-white absolute top-0 right-0"></FaEdit>
                            }
                        </figure>
                        <div className="card-body max-w-xl flex content-center">
                            <div className="font-semibold">
                                <h2 className="card-title text-4xl text-cyan-500 uppercase font-bold mb-2">{role}</h2>
                                <h3 className="text-gray-600 text-2xl mb-4">
                                    {!isEditing ?
                                        name :
                                        <label className="input input-sm input-bordered flex items-center gap-2">
                                            Name:-
                                            <input name="name" type="text" className="grow " placeholder="Daisy" defaultValue={name} />
                                        </label>
                                    }
                                </h3>
                                <p><span className="text-slate-500 text-[18px] font-bold">Email :- </span> {email}</p>
                                <div className="flex items-center"><span className="text-slate-500 text-[18px] font-bold">Phone:- </span>
                                    {!isEditing ?
                                        phone :
                                        <>
                                            <PhoneInput
                                                inputStyle={{ width: '100%', marginLeft: "0", borderRadius: "10px", maxHeight: "30px", }}
                                                containerStyle={{ borderRadius: "10px", maxHeight: "30px" }}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    defaultValue: { phone }

                                                }}
                                            />
                                        </>
                                    }</div>
                                <p className="flex items-center"><span className="text-slate-500  text-[18px] font-bold">Gender:- </span>
                                    {!isEditing ?
                                        gender :
                                        <select name="gender" className="select select-bordered select-sm">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>
                                        </select>
                                    }
                                </p>
                                <p className="flex items-center"><span className="text-slate-500 text-[18px] font-bold">Address:- </span>
                                    {!isEditing ?
                                        address :
                                        <label className="input input-sm input-bordered flex items-center gap-2">
                                            Full Address:-
                                            <input name="address" type="text" className="grow " placeholder="Daisy" defaultValue={address} />
                                        </label>
                                    }
                                </p>
                            </div>
                            <div className="card-actions justify-end mt-auto">
                                {
                                    !isEditing ?
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setIsEditing(true)
                                        }} className="btn w-fit min-w-40 my-4 btn-md text-white bg-gradient-to-tr  from-cyan-500 to-slate-400">Edit Profile</button> :
                                        <>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                setIsEditing(false)
                                            }} className="btn min-w-40 w-fit my-4 btn-md text-white bg-gradient-to-tr  from-yellow-500 to-yellow-600 ">Cancle</button>
                                            <button type="submit" className="btn min-w-40 w-fit my-4 btn-md text-black bg-gradient-to-tr  from-cyan-500 to-slate-400 ">update</button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


};

export default DasboardProfile;