import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'
import { COOKIES } from '../../config/constants'

interface User {
    investigator: {
        id_: number
        name: string
        email: string
        phone: string
        town: string
        token: string
    } | null,
    listInvestigated: {
        id_: number
        name: string
        year: number
        ville: string
        genre: "H" | "F"
    }[] | null,
    investigated: number | null
    notif: true | false
    loading: boolean
}

let initialState: User = {
    loading: false,
    investigated: null,
    listInvestigated: null,
    investigator: COOKIES.get("investigator_info"),
    notif: false
}

export const audioSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setInvestigated: (state, action) => { state.investigated = action.payload },
        setListInvestigated: (state, action) => { state.listInvestigated = action.payload },
        setInvestigator: (state, action) => { state.investigator = action.payload },
        setNotif: (state, action) => { state.notif = action.payload },
        setLoading: (state, action) => { state.loading = action.payload }
    }
})

export const addInvestigator = createAsyncThunk("investigator/signup", async (data: object, { dispatch }) => {
    dispatch(setLoading(true))
    ApiClient.post("/investigator", data)
        .then(({ data: { data } }) => {
            window.location.replace("/signin")
        })
        .catch((err) => {
            dispatch(setLoading(false))
            dispatch(setNotif(true))
            console.log(err);
        })
})

export const loginInvestigator = createAsyncThunk("investigator/signin", async (data: object, { dispatch }) => {
    dispatch(setLoading(true))
    ApiClient.post("/investigator/login", data)
        .then(({ data }) => {
            COOKIES.set("investigator_info", data, { path: "/", sameSite: "strict", secure: true })
            COOKIES.set("investigator_token", data.token, { sameSite: "strict", path: "/" })
            dispatch(setInvestigator(data))
            dispatch(setLoading(false))
            window.location.replace("/participants")
        })
        .catch((err) => {
            dispatch(setLoading(false))
            dispatch(setNotif(true))
            console.log(err);
        })
})

export const logoutInvestigator = createAsyncThunk("investigator/logout", async (token: string, { dispatch }) => {
    ApiClient.post("/investigator/logout", { data: token })
        .then(({ data }) => {
            dispatch(setNotif(false))
            COOKIES.remove("investigator_token", { path: "/" })
            COOKIES.remove("investigator_info", { path: "/" })
            window.location.replace("/signin")
        })
        .catch((err) => {
            dispatch(setLoading(false))
            console.log(err);
        })
})

export const addInvestigated = createAsyncThunk("investigator/create", async (data: object, { dispatch }) => {
    ApiClient.post("/investigated", data)
        .then()
        .catch()
})


export const { setInvestigated, setNotif, setInvestigator, setLoading, setListInvestigated } = audioSlice.actions
export default audioSlice.reducer