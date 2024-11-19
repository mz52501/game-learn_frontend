import {Link, Outlet} from "react-router-dom";
import {useUser} from "./UserProvider";
import {CgProfile} from "react-icons/cg";

export default function Layout(props) {

    const {user} = useUser();

    return (
        <div className="flex flex-col h-full">
            <nav className="flex justify-evenly items-center bg-lime-300">
                <div className="ml-10 my-3 rounded-md">
                    <p className="text-4xl px-6 bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">{user.username}</p>
                </div>
                <Link to="/" className="ml-10 my-3 rounded-md">
                    <p className="text-5xl px-6 bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Game&Learn</p>
                </Link>
                <Link to={"/profile/" + user.userId}
                      className="group hover:bg-lime-100 mr-20 py-1 px-2 flex justify-center items-center text-4xl border-2 rounded-md border-indigo-400 shadow-md">
                    <p className="mr-4 bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">Profile</p>
                    <CgProfile className="text-indigo-500 group-hover:text-indigo-800"
                               size={46}/>
                </Link>
            </nav>
            <Outlet/>
        </div>
    )
}
