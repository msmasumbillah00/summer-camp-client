import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const AdminCheck = ({ children }) => {
    const { user, logOut } = useContext(UserContext);
    const currentUser = useAxios(`users?email=${user.email}`);
    const navigate = useNavigate()

    if (currentUser.loading) return <Loading></Loading>


    if (!(currentUser.data.role === "admin")) {
        logOut
        navigate("login")
    }


    if (currentUser.data.role === "admin") {
        return children
    }
    else {
        logOut
    }
};

export default AdminCheck;