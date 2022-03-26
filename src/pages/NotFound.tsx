import React from "react";
import NFsvg from "../assets/images/notfound.svg";

export const NotFound = () => {
  return (
    <div className="h-screen  font-bold flex flex-col items-center w-screen bg-purple-200">
      <div className="w-1/2 h-2/3 flex flex-col">
        <img className="lg:w-full  xl:w-full md:w-full h-full z-50" src={NFsvg} alt="" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-purple-50 w-screen z-20">
        <h1 className="text-9xl text-purple-400 font-extrabold">404</h1>
        <h1 className="text-2xl text-center text-gray-500 font-extralight animate-ping">
          Not found
        </h1>
      </div>
    </div>
  );
};
