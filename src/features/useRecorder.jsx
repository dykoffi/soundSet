import React, { useEffect } from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useDispatch, useSelector } from 'react-redux'
import { setDataAudio, setRecordState } from './counter/audioSlice'


export default function Recorder() {

    const recordState = useSelector((state) => state.audio.recordState)
    const isRecording = useSelector((state) => state.audio.isRecording)
    const dispatch = useDispatch()


    useEffect(() => {
        if (isRecording) {
            dispatch(setRecordState(RecordState.START))
        } else {
            dispatch(setRecordState(RecordState.STOP))
        }
    }, [isRecording])


    const onStop = (dataAudio) => {
        dispatch(setDataAudio(dataAudio))
    }

    return (
        <div className={isRecording ? '' : 'hidden'}>
            <AudioReactRecorder
                foregroundColor="rgb(16, 185, 129)"
                backgroundColor="rgb(17, 24, 39)"
                state={recordState}
                onStop={onStop}
                canvasHeight={120}
                canvasWidth={400}
            />
        </div>
    )
}