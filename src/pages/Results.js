import React from "react";
import Lottie from "lottie-react";
import amazing from "../animations/amazing2.json";
import good from "../animations/good.json";
import fail from "../animations/fail.json";
import {Link} from "react-router-dom";
import {GiExitDoor} from "react-icons/gi";

export default function Results(props) {

    let additionalMessage = null;

    if (props.score === props.max) {
        additionalMessage = <div className="flex flex-col justify-center items-center">
            <p className="text-4xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Great
                job! You scored perfect score!</p>
            <Lottie className="w-8/12" animationData={amazing} loop={true}/>
        </div>;
    } else if ((props.score / props.max) >= 0.6 && props.score !== props.max) {
        additionalMessage = <div className="flex flex-col justify-center items-center">
            <p className="text-4xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Not
                bad! Congratulations!</p>
            <Lottie className="w-6/12" animationData={good} loop={true}/>
        </div>;
    } else {
        additionalMessage = <div className="flex flex-col justify-center items-center">
            <p className="text-4xl text-red-600 mb-10">You didn't do so well! You should do this again!</p>
            <Lottie className="w-6/12" animationData={fail} loop={true}/>
        </div>;
    }

    return (
        <div className="mt-24 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mb-9">
                <p className="text-6xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent mr-8">Your
                    score is {props.score} out of {props.max}</p>
                <Link to="/subject" className="hover:bg-red-500 rounded-lg">
                    <GiExitDoor
                        className="text-lime-400"
                        size={70}/>
                </Link>
            </div>
            {additionalMessage}
        </div>
    )
}
