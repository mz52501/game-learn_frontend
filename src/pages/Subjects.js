import {useEffect, useState} from "react";
import {useFetchData} from "../hooks/UseFetchData";

export default function Subjects() {

    const {data, loading, error} = useFetchData('http://localhost:8080/subject');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center justify-evenly bg-gradient-to-br from-indigo-200 to-indigo-600">
            <div className="bg-lime-300 rounded-lg py-16 w-2/5 flex justify-center items-center">
                <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Select
                    subject!</p>
            </div>
            <div className="flex justify-center items-center w-full">
                {data.map((subject, index) => {
                    return (
                        <button className="group bg-lime-300 hover:bg-lime-100 rounded-lg py-20 mx-16 w-1/3">
                            <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">
                                {subject.subjectId + ". " + subject.name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
