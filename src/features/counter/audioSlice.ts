import { createSlice } from '@reduxjs/toolkit'

export const audioSlice = createSlice({
    name: "audio",
    initialState: {
        isRecording: false,
        recordState: null,
        dataAudio: null,
        urlAudio: ""
    },
    reducers: {
        startRecord: (state) => {
            state.isRecording = true
            state.dataAudio = null
        },
        stopRecord: (state) => {
            state.isRecording = false
        },
        setDataAudio: (state, action) => {
            state.dataAudio = action.payload
            state.urlAudio = action.payload.url
        },
        setRecordState: (state, action) => {
            state.recordState = action.payload
        }
    }
})

export const { startRecord, stopRecord, setDataAudio, setRecordState } = audioSlice.actions
export default audioSlice.reducer