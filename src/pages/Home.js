export default function Home() {
    return (
        <div
            className="flex-1 flex overflow-auto items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            <button className="bg-lime-300 hover:bg-lime-400 rounded-lg px-48 py-20"
                    onClick={() => console.log("something")}>
                <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Play</p>
            </button>
        </div>
    )
}
