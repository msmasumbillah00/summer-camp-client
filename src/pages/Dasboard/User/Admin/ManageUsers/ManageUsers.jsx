import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";
import ManageUsersCard from "./ManageUsersCard/ManageUsersCard";


const ManageUsers = () => {
    const { data, refetch, loading } = useAxios("allusers");
    const accessToken = localStorage.getItem('car-access-token');


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-school-server-plum.vercel.app/allusers?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(async data => {
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });

    }
    const handelUpdate = (id, role) => {
        // console.log(id, role);
        fetch(`https://summer-camp-school-server-plum.vercel.app/allusers?id=${id}&role=${role}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("car-access-token")}`,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }
    if (!loading) {
        // console.log(data)
        return (
            <div className="p-4">
                <h1 className="text-3xl font-bold my-10 text-center">All  Users</h1>

                {
                    data.map(ele => <ManageUsersCard handelUpdate={handelUpdate} key={ele._id} ele={ele} handleDelete={handleDelete}></ManageUsersCard>)
                }
            </div>
        );
    }
};

export default ManageUsers;