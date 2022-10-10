import React, { useEffect } from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { useDispatch, useSelector } from 'react-redux'
import { setDataAudio, setRecordState } from '../features/audio/audioSlice'


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
                foregroundColor="rgb(200, 10, 10)"
                backgroundColor="rgb(243, 244, 246)"
                state={recordState}
                onStop={onStop}
                canvasHeight={60}
                canvasWidth={250}
            />
        </div>
    )
}