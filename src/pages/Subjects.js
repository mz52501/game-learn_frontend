import React, {useEffect, useState} from "react";
import {useFetchData} from "../hooks/UseFetchData";
import {Link, useLocation} from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function Subjects() {

    const location = useLocation();

    const {data, loading, error} = useFetchData('/subject');

    if (loading) return <LoadingPage/>
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center justify-evenly bg-gradient-to-br from-indigo-200 to-indigo-600">
            <div
                className="bg-white rounded-lg border-4 border-lime-400 py-6 w-1/3 flex justify-center items-center shadow-md">
                <p className="text-6xl bg-gradient-to-br from-lime-400 to-lime-600 bg-clip-text text-transparent">Select
                    subject!</p>
            </div>
            <div className="flex justify-center items-center w-full">
                {data.map((subject, index) => {
                    return (
                        <Link
                            className="group bg-lime-300 hover:bg-lime-100 rounded-lg py-14 mx-16 w-1/3 flex justify-center items-center shadow-md"
                            to={location.pathname + "/" + subject.subjectId + "/games"}>
                            <p className="text-5xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">
                                {subject.subjectId + ". " + subject.name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
