import React, { useEffect } from "react";

import { FastForwardIcon, StopIcon, UserCircleIcon, MicrophoneIcon } from "@heroicons/react/solid"
import { LogoutIcon, RefreshIcon } from "@heroicons/react/outline";
import Recorder from "../../components/recorder";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import { getNewAudio, getNotRecordedNb, getUserRecorded, sendAudio, setDataAudio, setLoading, startRecord, stopRecord } from "../../features/audio/audioSlice";
import { COOKIES } from "../../config/constants";
import { setInvestigated } from "../../features/user/userSlice";
import { useNavigate } from "react-router";
import Loading from "../../components/loading";

export default function Lecture() {

    const investigated = useSelector((state: RootState) => state.user.investigated)
    const notRecordedAudio = useSelector((state: RootState) => state.audio.notRecordedNb)
    const userAudioCount = useSelector((state: RootState) => state.audio.userAudioCount)
    const loading = useSelector((state: RootState) => state.audio.loading)
    const dataAudio = useSelector((state: RootState) => state.audio.dataAudio)
    const urlAudio = useSelector((state: RootState) => state.audio.urlAudio)
    const currentAudio = useSelector((state: RootState) => state.audio.currentAudio)
    const isRecording = useSelector((state: RootState) => state.audio.isRecording)
    const dispatch = useDispatch()

    const logged = true

    let navigate = useNavigate()

    const startRecording = () => {
        dispatch(startRecord())
    }

    const newAudio = () => {
        if (investigated) {
            dispatch(getNewAudio(investigated))
            dispatch(setDataAudio(null))
        }
    }

    const sendAudioData = () => {
        if (investigated && dataAudio && currentAudio) {
            dispatch(sendAudio({ blob: dataAudio.blob, audioId: String(currentAudio.id_), ref: String(currentAudio.ref), userId: String(investigated) }))
            dispatch(getNewAudio(investigated))
            dispatch(setDataAudio(null))
        }
    }

    useEffect(() => {
        if (COOKIES.get("userinfo_audioset")) {
            dispatch(setInvestigated(COOKIES.get("userinfo_audioset")))
            dispatch(getNotRecordedNb())
            dispatch(getUserRecorded(COOKIES.get("userinfo_audioset").id_))
        } else {
            navigate("/")
        }
    }, [logged])

    useEffect(() => {
        newAudio()
    }, [logged])

    return (
        <div className="w-screen min-h-screen bg-white flex flex-col items-center">
            <div className="w-screen flex p-2 bg-red-700">
                <div className="flex space-x-3 items-center text-white">
                    <span><b>{userAudioCount}/{notRecordedAudio}</b> audio(s)</span>
                </div>
              
            </div>
            <div className="p-2 bg-gray-100 flex w-screen">
                <span className="flex-1">Compte: KMO35D</span>
                <a className="text-sm text-red-900 cursor-pointer" onClick={newAudio}>Passer l'audio</a>
            </div>
            <div className="p-1 text-right bg-gray-50 w-screen">

            </div>
            <div className="w-screen font-thin text-center py-5 flex flex-col justify-center flex-1">
                <div id="fr_text" className="px-4">
                    {currentAudio && <h1 className="text-gray-500 text-3xl">
                        {currentAudio.sourceLang}
                    </h1>}
                </div>
            </div>
            <div className="flex-1 p-2 w-screen">
                <div className="flex bg-blue-100 h-28 items-center">
                    <div className="p-2 flex-1 flex items-center">
                        <MicrophoneIcon onClick={startRecording} className="h-10 cursor-pointer text-green-600" />
                    </div>
                    <div className="p-5 bg-red-400">
                        {isRecording ? <Recorder /> : <audio id="audio" controls src={urlAudio} />
                        }

                    </div>
                </div>
            </div>
            <div className="flex-1">

            </div>
            <div id="button_record" className="flex justify-center items-center py-5">

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
                            </>
                        }
                    </>
                }
            </div>
            <button disabled={isRecording && !dataAudio} onClick={sendAudioData} className="p-2 bg-blue-600 text-white w-screen">Envoyer les audios</button>
            {loading && <Loading />}
        </div>
    )
}