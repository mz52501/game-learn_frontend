import {Outlet} from "react-router-dom";
import {useUser} from "./UserProvider";
import {CgProfile} from "react-icons/cg";

export default function Layout(props) {

    const {username} = useUser();

    return (
        <div className="flex flex-col h-full">
            <nav className="flex justify-evenly items-center bg-lime-300">
                <div className="ml-10 my-3 rounded-md">
                    <p className="text-4xl py-2 px-6 bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">{username}</p>
                </div>
                <button className="mr-20">
                    <CgProfile className="text-indigo-500 hover:text-indigo-700"
                               size={52}/>
                </button>
            </nav>
            <Outlet/>
        </div>
    )
}
