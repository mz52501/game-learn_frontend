import {useEffect, useState} from "react";

export default function Subjects() {

    const [data, setData] = useState([]);

    const fetchSubjects = () => {
        setData([{subject_id: 1, name: "Math"}, {subject_id: 2, name: "English"}])
    }

    useEffect(() => {
        fetchSubjects();
    }, []);


    return (
        <div
            className="flex-1 flex overflow-auto items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {data.map((subject, index) => {
                return (
                    <button className="bg-lime-300 hover:bg-lime-400 rounded-lg px-48 py-20 mx-16"
                            onClick={() => console.log("something")}>
                        <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">{subject.subject_id + ". " + subject.name}</p>
                    </button>
                )
            })}

        </div>
    )
}
