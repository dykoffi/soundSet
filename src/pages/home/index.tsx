import { ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { COOKIES } from "../../config/constants";

export default function Index() {

  const [data, setData] = useState({
    nom: "",
    age: 0,
    sexe: "Homme"
  })

  let navigate = useNavigate()

  const saveInfoUser = () => {
    COOKIES.set("userinfo", data, { path: "/", secure: true })
    navigate("/lecture")
  }

  return (
    <div className="w-screen min-h-screen flex-col flex md:flex-row">
      <div className="flex-1 p-5 md:min-h-screen flex flex-col justify-center space-y-5">
        <span className="text-green-600 font-bold text-5xl">Campagne</span>
        <h1 className="text-gray-200 text-4xl font-extralight">
          de collecte audio pour la traduction de language </h1>
        <h1 className="text-gray-200 text-4xl font-bold"><span className="underline decoration-sky-500">Français</span> <ArrowRightIcon className="h-10 inline text-green-500" /> <span className="underline decoration-pink-500 text-green-500">Baoulé</span></h1>
      </div>
      <div id="connexion_box" className="flex flex-col p-5 space-y-3 flex-1 md:flex-none md:p-24 md:justify-center">
        <input onChange={(ev) => {
          setData({ ...data, nom: ev.target.value })
        }} placeholder="nom (pseudo)" className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none" type="text" />
        <input onChange={(ev) => {
          setData({ ...data, age: Number(ev.target.value) })
        }} placeholder="Age" min={1} className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none text-opacity-50" type="number" />
        <select onChange={(ev) => {
          setData({ ...data, sexe: ev.target.value })
        }} placeholder="Sexe" className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none" name="" id="">
          <option className="text-white bg-gray-700" value="Homme">Homme</option>
          <option className="text-white bg-gray-700" value="Femme">Femme</option>
        </select>
        <button disabled={data.age <= 0} onClick={saveInfoUser} className={`p-3 text-white ${data.age <= 0 ? "bg-gray-500 cursor-default" : "bg-green-500"} rounded-md`} >Commencer</button>
      </div>
    </div>

  );
};


