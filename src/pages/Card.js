import React from "react";

const Card = ({content, isFlipped, onClick}) => {
    const isImage = typeof content === "string" && content.startsWith("/"); // Detect if content is a path to an image

    return (
        <div
            className={`w-40 h-52 mx-10 my-10 bg-gray-100 rounded-lg shadow-lg cursor-pointer perspective ${
                !isFlipped ? "transform hover:scale-105 transition-transform" : ""
            }`}
            onClick={onClick}
        >
            <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                    transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)", // Initially shows the back side
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front Side */}
                <div
                    className="absolute w-full h-full bg-white rounded-lg flex items-center justify-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                    }}
                >
                    {isImage ? (
                        <img
                            src={content}
                            alt="Card"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-4xl font-semibold text-gray-800">
                            {content}
                        </span>
                    )}
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full bg-lime-400 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <p className="text-6xl font-semibold text-indigo-600">?</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
