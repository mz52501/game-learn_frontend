import {useFetchData} from "../hooks/UseFetchData";
import {useParams} from "react-router-dom";

export default function SelectGame() {

    const {id} = useParams();

    const {data, loading, error} = useFetchData(`/subject/${id}/games`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const array = [
        {...data[0]},  // Copy of the first object in the data array
        {...data[0]},  // Copy of the first object in the data array
        {...data[0]},
        {...data[0]}// Copy of the first object in the data array
    ];

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center justify-evenly bg-gradient-to-br from-indigo-200 to-indigo-600">
            <div className="bg-lime-300 rounded-lg py-6 w-1/4 flex justify-center items-center">
                <p className="text-6xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Select
                    game!</p>
            </div>
            <div className="flex justify-center items-center w-full flex-wrap">
                {array.map((game, index) => {
                    return (
                        <button className="group bg-lime-300 hover:bg-lime-100 rounded-lg py-20 mx-16 w-1/3 mb-16">
                            <p className="text-6xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">
                                {index + 1 + ". " + game.name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )

}
