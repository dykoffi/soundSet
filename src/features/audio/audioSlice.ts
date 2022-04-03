import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'

interface State {
    loading: false
    isRecording: boolean,
    recordState: any
    dataAudio: {
        blob: Blob
        type: string
        url: string
    } | null
    urlAudio: string
    currentAudio: {
        id_: number
        ref: string
        fr: string
        bci: string
    } | null
    userAudioCount: number
    notRecordedNb: number
}

let initialState: State = {
    loading: false,
    isRecording: false,
    recordState: null,
    dataAudio: null,
    urlAudio: "",
    notRecordedNb: 0,
    userAudioCount: 0,
    currentAudio: null
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
            state.dataAudio = action.payload
            state.urlAudio = action.payload ? action.payload.url : null
        },
        setRecordState: (state, action) => {
            state.recordState = action.payload
        },
        setNotRecordedNb: (state, action) => {
            state.notRecordedNb = action.payload
        },
        setUserAudioCount: (state, action) => {
            state.userAudioCount = action.payload
        },
        setCurrentAudio: (state, action) => {
            state.currentAudio = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

interface sentAudio {
    blob: Blob
    audioId: string
    userId: string
    ref: string
}

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


export const sendAudio = createAsyncThunk('audio/send',
    async (data: sentAudio, { dispatch }) => {
        // let { } = getState()

        var formData = new FormData();
        formData.append("audio", data.blob, data.ref);
        formData.append("soundId", data.audioId);
        formData.append("userId", data.userId);


        ApiClient.post("/sound/send", formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }).then(async ({ data: res }) => {

            // dispatch(setCurrentAudio(res))
            dispatch(getUserRecorded(Number(data.userId)))
            dispatch(getNotRecordedNb())
            // dispatch(setLoading(false))

        }).catch(err => {
            console.log(err);
        })
    })


export const getNewAudio = createAsyncThunk('audio/getNewAudio',
    async (userId: number, { dispatch }) => {
        dispatch(setLoading(true))
        ApiClient.get(`/sound/begin/${userId}`).then(({ data }) => {
            dispatch(setCurrentAudio(data))
            dispatch(getUserRecorded(userId))
            dispatch(getNotRecordedNb())
            dispatch(setLoading(false))
        }).catch(err => {
            console.log(err);
        })
    })

export const { setLoading, startRecord, stopRecord, setDataAudio, setRecordState, setNotRecordedNb, setUserAudioCount, setCurrentAudio } = audioSlice.actions
export default audioSlice.reducer