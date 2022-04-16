import { MicrophoneIcon } from "@heroicons/react/solid";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute flex justify-center items-center w-screen h-screen bg-gray-900 top-0 left-0 bg-opacity-90">
            <MicrophoneIcon className="h-20 self-center text-green-600 animate-ping" />
        </div>
    )
}