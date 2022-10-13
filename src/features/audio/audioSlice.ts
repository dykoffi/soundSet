import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'

interface State {
    loading: false
    dataAudio: {
        blob: Blob
        url: string
    } | null
    dataAudioSource: {
        blob: Blob
        url: string
    } | null
    dataAudioTarget: {
        blob: Blob
        url: string
    } | null
    urlAudio: string
    currentAudio: {
        id_: number
        ref: string
        sourceLang: string
        targetLang: string
    } | null
    userAudioCount: number
    notRecordedNb: number
    currentLangage: string
}

let initialState: State = {
    loading: false,
    dataAudio: null,
    dataAudioSource: null,
    dataAudioTarget: null,
    urlAudio: "",
    notRecordedNb: 0,
    userAudioCount: 0,
    currentAudio: null,
    currentLangage: "source"
}

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setDataAudioSource: (state, action) => {
            state.dataAudioSource = action.payload
            state.urlAudio = action.payload ? action.payload.url : null
        },
        setDataAudioTarget: (state, action) => {
            state.dataAudioTarget = action.payload
            state.urlAudio = action.payload ? action.payload.url : null
        },
        setNotRecordedNb: (state, action) => { state.notRecordedNb = action.payload },
        setUserAudioCount: (state, action) => { state.userAudioCount = action.payload },
        setCurrentAudio: (state, action) => { state.currentAudio = action.payload },
        setCurrentLangage: (state, action) => {
            state.currentLangage = action.payload
            if (action.payload === "source") {
                state.urlAudio = state.dataAudioSource ? state.dataAudioSource.url : ""
            } else {
                state.urlAudio = state.dataAudioTarget ? state.dataAudioTarget.url : ""
            }
        },
        setLoading: (state, action) => { state.loading = action.payload }
    }
})

interface sentAudio {
    blobSource: Blob
    blobTarget: Blob
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
        formData.append("audio", data.blobSource, data.ref);
        formData.append("audio", data.blobTarget, data.ref);
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
            dispatch(setLoading(false))


        }).catch(err => {
            dispatch(setLoading(false))
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
            dispatch(setLoading(false))
            console.log(err);
        })
    })

export const { setLoading, setCurrentLangage, setDataAudioSource, setDataAudioTarget, setNotRecordedNb, setUserAudioCount, setCurrentAudio } = audioSlice.actions
export default audioSlice.reducer