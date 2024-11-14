import React from "react";

export default function LoadingPage() {

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            <div>
                <p className="text-6xl bg-gradient-to-br from-lime-300 to-lime-600 bg-clip-text text-transparent">Loading...</p>
            </div>
        </div>
    )
}
