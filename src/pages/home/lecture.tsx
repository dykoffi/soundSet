import React from "react";

import { FastForwardIcon, StopIcon, UserCircleIcon } from "@heroicons/react/solid"
import { MicrophoneIcon, RefreshIcon } from "@heroicons/react/outline";
import Recorder from "../../features/useRecorder";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import { sendAudio, startRecord, stopRecord } from "../../features/audio/audioSlice";
import { COOKIES } from "../../config/constants";

export default function Lecture() {

    const data = COOKIES.get("userinfo")

    const dataAudio = useSelector((state: RootState) => state.audio.dataAudio)
    const urlAudio = useSelector((state: RootState) => state.audio.urlAudio)
    const isRecording = useSelector((state: RootState) => state.audio.isRecording)
    const dispatch = useDispatch()

    const startRecording = () => {
        dispatch(startRecord())
    }

    const sendAudioData = () => {
        if (dataAudio) {
            dispatch(sendAudio(dataAudio.blob))
        }
    }

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-screen flex p-3">
                <span className="p-2 rounded-full text-white bg-green-500 font-bold text-sm flex items-center">
                    12
                </span>
                <div className="flex-1 flex justify-end items-center mx-3 space-x-3">
                    {data && <>
                        <span className="text-gray-200 font-light text-sm">{data.nom}, {data.age} ans ({data.sexe})</span>
                        <UserCircleIcon className="h-12 text-gray-300 opacity-60" />
                    </>
                    }
                </div>
            </div>
            <div className="text-center flex-1 space-y-5 flex flex-col justify-center">
                <hr className="w-24 mx-auto border-green-700" />
                <div id="fr_text">
                    <h1 className="text-green-400 font-bold text-2xl opacity-70">
                        Et si demain est dimanche  et que aujourd'hui n'est pas samedi
                    </h1>
                </div>
                <div id="bci_text">
                    <h1 className="text-gray-300 font-bold px-3 text-4xl md:text-5xl">
                        And if tomorrow is Sunday and today is not Saturday
                    </h1>
                </div>
                <div id="button_record" className="flex justify-center items-center py-10">
                    {!isRecording
                        &&

                        <>
                            {
                                dataAudio ?
                                    <audio id="audio" controls src={urlAudio} /> :
                                    <div className="flex flex-col">
                                        <MicrophoneIcon onClick={startRecording} className="h-32 cursor-pointer text-green-600 opacity-40" />
                                        <small className="text-white">Appuyer le micro pour enregistrer</small>
                                    </div>

                            }
                        </>
                    }

                    <Recorder />
                </div>
                <div id="menu_after_recording" className="flex justify-center items-center space-x-5">
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
                                        Enregistrer
                                    </button>
                                </>
                            }
                            <button className="p-3 text-white rounded-md bg-red-800 hover:opacity-90 transition-opacity">Passer <FastForwardIcon className="h-5 inline" /></button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}