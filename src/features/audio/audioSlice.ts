import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'

interface State {
    isRecording: boolean,
    recordState: any,
    dataAudio: {
        blob: Blob,
        type: string,
        url: string
    } | null,
    urlAudio: string
}

let initialState: State = {
    isRecording: false,
    recordState: null,
    dataAudio: null,
    urlAudio: ""
}

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        startRecord: (state) => {
            state.isRecording = true
            state.dataAudio = null
        },
        stopRecord: (state) => {
            state.isRecording = false
        },
        setDataAudio: (state, action) => {
            console.log(action.payload);

            state.dataAudio = action.payload
            state.urlAudio = action.payload.url
        },
        setRecordState: (state, action) => {
            state.recordState = action.payload
        }
    }
})

export const sendAudio = createAsyncThunk('audio/send',
    async (data: Blob) => {
        // let { } = getState()
        
        var formData = new FormData();
        formData.append("audio", data)
        
        ApiClient.post("/sound/send", formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }).then(data=>{
            console.log(data);
            
        }).catch(err=>{
            console.log(err);
            
        })
    })

export const { startRecord, stopRecord, setDataAudio, setRecordState } = audioSlice.actions
export default audioSlice.reducer