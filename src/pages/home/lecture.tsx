import React, { useEffect } from "react";

import { FastForwardIcon, StopIcon, UserCircleIcon } from "@heroicons/react/solid"
import { LogoutIcon, MicrophoneIcon, RefreshIcon } from "@heroicons/react/outline";
import Recorder from "../../features/useRecorder";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import { getNewAudio, getNotRecordedNb, getUserRecorded, sendAudio, setDataAudio, startRecord, stopRecord } from "../../features/audio/audioSlice";
import { COOKIES } from "../../config/constants";
import { logoutUser, setLogged, setUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router";

export default function Lecture() {

    const data = useSelector((state: RootState) => state.user.user)
    const notRecordedAudio = useSelector((state: RootState) => state.audio.notRecordedNb)
    const userAudioCount = useSelector((state: RootState) => state.audio.userAudioCount)
    const dataAudio = useSelector((state: RootState) => state.audio.dataAudio)
    const urlAudio = useSelector((state: RootState) => state.audio.urlAudio)
    const currentAudio = useSelector((state: RootState) => state.audio.currentAudio)
    const isRecording = useSelector((state: RootState) => state.audio.isRecording)
    const dispatch = useDispatch()

    const logged = useSelector((state: RootState) => state.user.logged)

    let navigate = useNavigate()

    const startRecording = () => {
        dispatch(startRecord())
    }

    const newAudio = () => {
        if (data) {
            dispatch(getNewAudio(data.id_))
            dispatch(setDataAudio(null))
        }

    }

    const sendAudioData = () => {
        if (dataAudio && currentAudio) {
            dispatch(sendAudio({ blob: dataAudio.blob, audioId: String(currentAudio.id_), ref: String(currentAudio.ref) }))
            dispatch(setDataAudio(null))
        }
    }


    useEffect(() => {
        if (COOKIES.get("userinfo_audioset")) {
            dispatch(setLogged(true))
        }
        if (!logged) {
            navigate("/")
        }
    }, [logged])

    useEffect(() => {
        if (data) {
            dispatch(getNewAudio(data.id_))
        }
    }, [data])


    useEffect(() => {
        dispatch(setUser(COOKIES.get("userinfo_audioset")))
        dispatch(getNotRecordedNb())
        dispatch(getUserRecorded(COOKIES.get("userinfo_audioset").id_))
    }, [])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-screen flex p-3">
                <div className="flex space-x-3 items-center text-white">
                    <span className="p-2 rounded-full bg-green-500 font-bold text-sm flex items-center">
                        {userAudioCount}
                    </span>
                    <span>Il reste encore <b>{notRecordedAudio}</b> audio(s) à enregistrer</span>
                </div>
                <div className="flex-1 flex justify-end items-center mx-3 space-x-3">
                    {data && <>
                        <span className="text-gray-200 font-light text-sm">{data.name}, {data.year} ans ({data.genre})</span>
                        <UserCircleIcon className="h-12 text-gray-300 opacity-60" />
                        <LogoutIcon onClick={() => dispatch(logoutUser())} className="h-9 cursor-pointer text-red-700" />
                    </>
                    }
                </div>
            </div>
            <div className="w-screen text-center flex-1 space-y-5 flex flex-col justify-center">
                <hr className="w-24 mx-auto border-green-700" />
                <div id="fr_text">
                    {currentAudio && <h1 className="text-green-500 font-bold text-xl">
                        {currentAudio.fr}
                    </h1>}
                </div>
                <div id="bci_text">
                    {currentAudio && <h1 className="text-gray-300 font-bold px-3 text-2xl md:text-3xl">
                        {currentAudio.bci}
                    </h1>}
                </div>


            </div>
            <div id="button_record" className="flex justify-center items-center py-5">
                {!isRecording
                    &&

                    <>
                        {
                            dataAudio ?
                                <audio id="audio" controls src={urlAudio} /> :
                                <div className="flex flex-col">
                                    <MicrophoneIcon onClick={startRecording} className="h-24 cursor-pointer text-green-600 opacity-40" />
                                    <small className="text-white">Appuyer le micro pour enregistrer</small>
                                </div>

                        }
                    </>
                }

                <Recorder />
            </div>
            <div id="menu_after_recording" className="flex justify-center items-center space-x-5 p-3">
                {isRecording ?
                    <>
                        <StopIcon onClick={() => dispatch(stopRecord())} className="h-14 text-red-600 animate-pulse cursor-pointer" />
                    </>
                    :
                    <>
                        {
                            dataAudio &&
                            <>
                                <button onClick={startRecording} className="p-3 text-white rounded-md bg-blue-900 hover:opacity-90 transition-opacity">
                                    <RefreshIcon className="h-5" />
                                </button>
                                <button onClick={sendAudioData} className="p-3 text-white rounded-md bg-green-600 hover:opacity-90 transition-opacity">
                                    Envoyer
                                </button>
                            </>
                        }
                        <button onClick={newAudio} className="p-3 text-white rounded-md bg-red-800 hover:opacity-90 transition-opacity">Passer <FastForwardIcon className="h-5 inline" /></button>
                    </>
                }
            </div>
        </div>
    )
}