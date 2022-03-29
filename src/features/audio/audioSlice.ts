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
    urlAudio: string,
    userAudioCount: number
    notRecordedNb: number
}

let initialState: State = {
    isRecording: false,
    recordState: null,
    dataAudio: null,
    urlAudio: "",
    notRecordedNb: 0,
    userAudioCount: 0
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
        },
        setNotRecordedNb: (state, action) => {
            state.notRecordedNb = action.payload
        },
        setUserAudioCount: (state, action) => {
            state.userAudioCount = action.payload
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
        }).then(data => {
            console.log(data);

        }).catch(err => {
            console.log(err);

        })
    })


export const getNotRecordedNb = createAsyncThunk('audio/getNotRecorded',
    async (data: undefined, { dispatch }) => {

        ApiClient.get("/sound/count/unrecorded").then(({ data }) => {
            dispatch(setNotRecordedNb(data))
        }).catch(err => {
            console.log(err);
        })
    })

export const getUserRecorded = createAsyncThunk('audio/getUserRecorded',
    async (userId: number, { dispatch }) => {
        ApiClient.get(`/sound/count/recorded/${userId}`).then(({ data }) => {
            dispatch(setUserAudioCount(data))
        }).catch(err => {
            console.log(err);
        })
    })

export const { startRecord, stopRecord, setDataAudio, setRecordState, setNotRecordedNb, setUserAudioCount } = audioSlice.actions
export default audioSlice.reducer