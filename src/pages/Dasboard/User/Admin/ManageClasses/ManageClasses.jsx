import CommonCards from "../../../../commoon/CommonCards";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";

const ManageClasses = () => {
    const { data, refetch, loading } = useAxios("classes");
    const accessToken = localStorage.getItem('car-access-token');


    console.log(data)
    const handelDelete = (id) => {
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
                fetch(`https://summer-camp-school-server-plum.vercel.app/classes?class=${id}`, {
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


    if (!loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold my-10 text-center">All  Course</h1>
                {
                    data.map(ele => <CommonCards ele={ele} handelDelete={handelDelete} key={ele._id}></CommonCards>)
                }
            </div>
        );
    }

};

export default ManageClasses;