import { createBrowserRouter } from 'react-router-dom';
import Main from './../../layout/Main/Main';
import Home from './../../pages/Home/Home/Home';
import Login from './../../pages/Login/Login';
import Register from './../../pages/Register/Register';
import ErrorPage from './../../pages/ErrorPage/ErrorPage';
import Classes from '../../pages/Classes/Classes';
import Instructors from '../../pages/Instructors/Instructors';
import Dasboard from '../../pages/Dasboard/Dasboard';
import PrivateRout from './../PrivateRout/PrivateRout';
import DasboardProfile from '../../pages/Dasboard/User/DasboardProfile/DasboardProfile';
import ManageClasses from '../../pages/Dasboard/User/Admin/ManageClasses/ManageClasses';
import AdminCheck from '../AdminCheck/AdminCheck';
import ManageUsers from './../../pages/Dasboard/User/Admin/ManageUsers/ManageUsers';
import MyClasses from '../../pages/Dasboard/User/Students/MyClasses/MyClasses';
import EnroledClasses from '../../pages/Dasboard/User/Students/EnroledClasses/EnroledClasses';
import Payments from '../../pages/Dasboard/User/Students/Payments/Payments';
import AddClass from '../../pages/Dasboard/User/Instructors/AddClass/AddClass';
import MyClass from '../../pages/Dasboard/User/Instructors/MyClass/MyClass';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/profile",
                element: <PrivateRout><DasboardProfile></DasboardProfile></PrivateRout>
            },
            {
                path: "/classes",
                element: <Classes></Classes>
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>
            },

        ]

    },
    {
        path: "/dasboard",
        element: <PrivateRout> <Dasboard></Dasboard></PrivateRout>,
        children: [
            {
                path: "/dasboard",
                element: <DasboardProfile></DasboardProfile>
            },
            {
                path: "/dasboard/manageClasses",
                element: <PrivateRout><AdminCheck><ManageClasses></ManageClasses></AdminCheck></PrivateRout>
            },
            {
                path: "/dasboard/manageUsers",
                element: <PrivateRout><AdminCheck><ManageUsers></ManageUsers></AdminCheck></PrivateRout>
            },
            {
                path: "/dasboard/myclasses",
                element: <PrivateRout><MyClasses></MyClasses></PrivateRout>
            },
            {
                path: "/dasboard/enrolledClass",
                element: <PrivateRout><EnroledClasses></EnroledClasses></PrivateRout>
            },
            {
                path: "/dasboard/payment",
                element: <PrivateRout><Payments></Payments></PrivateRout>
            },
            {
                path: "/dasboard/addclasses",
                element: <PrivateRout><AddClass></AddClass></PrivateRout>
            },
            {
                path: "/dasboard/myClass",
                element: <PrivateRout><MyClass></MyClass></PrivateRout>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])

export default router;