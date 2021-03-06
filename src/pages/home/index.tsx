import { ArrowRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { COOKIES } from "../../config/constants";
import { loginUser } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import Loading from "../../components/loading";

export default function Index() {

  const [data, setData] = useState({
    name: COOKIES.get("userinfo_audioset") ? COOKIES.get("userinfo_audioset").name : "",
    year: COOKIES.get("userinfo_audioset") ? COOKIES.get("userinfo_audioset").year : "",
    genre: COOKIES.get("userinfo_audioset") ? COOKIES.get("userinfo_audioset").genre : "M"
  })

  const loading = useSelector((state: RootState) => state.audio.loading)

  const logged = useSelector((state: RootState) => state.user.logged)

  const dispatch = useDispatch()

  let location = useLocation();


  const saveInfoUser = () => {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    if (logged) {
      window.location.reload()
    }
  }, [logged])

  if (COOKIES.get("token") && COOKIES.get("userinfo_audioset")) {
    return <Navigate to={"/lecture"} state={{ from: location }} replace={true} />
  }

  return (
    <div id="home" className="w-screen flex-col min-h-screen flex md:flex-row">
      <div className="p-5 md:p-10 flex flex-col flex-1 justify-center space-y-5">
        <span className="text-green-600 font-bold text-5xl">Campagne</span>
        <h1 className="text-gray-200 text-4xl font-extralight">
          de collecte audio pour la traduction de language </h1>
        <h1 className="text-gray-200 text-4xl font-bold"><span className="underline decoration-sky-500">Français</span> <ArrowRightIcon className="h-10 inline text-green-500" /> <span className="underline decoration-pink-500 text-green-500">Baoulé</span></h1>
      </div>
      <div id="connexion_box" className="flex flex-col p-5 space-y-3 justify-center flex-1 md:flex-none md:p-24 md:justify-center">
        <input defaultValue={data.name} onChange={(ev) => {
          setData({ ...data, name: ev.target.value })
        }} placeholder="name (pseudo)" className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none" type="text" />
        <input defaultValue={data.year} onChange={(ev) => {
          setData({ ...data, year: Number(ev.target.value) })
        }} placeholder="year" min={1} className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none" type="number" />
        <select defaultValue={data.genre} onChange={(ev) => {
          setData({ ...data, genre: ev.target.value })
        }} placeholder="genre" className="p-3 md:p-2 text-white rounded-md font-bold ring-1 ring-gray-500 bg-opacity-30 bg-gray-700 outline-none" name="" id="">
          <option className="text-white bg-gray-700" value="M">Homme</option>
          <option className="text-white bg-gray-700" value="F">Femme</option>
        </select>
        <button disabled={data.year <= 0} onClick={saveInfoUser} className={`p-3 text-white ${data.year <= 0 ? "bg-gray-500 cursor-default" : "bg-green-500"} rounded-md`} >Commencer</button>
      </div>
      {loading && <Loading />}
    </div>

  );
};


