import {Link, useNavigate} from "react-router-dom";

export default function Home() {

    return (
        <div
            className="flex-1 flex overflow-auto items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            <Link className="group bg-lime-300 hover:bg-lime-100 rounded-lg px-48 py-20 shadow-md"
                  to="subject">
                <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">Play</p>
            </Link>
        </div>
    )
}
