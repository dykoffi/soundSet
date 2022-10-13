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
        town: string
        genre: "H" | "F"
    }[],
    investigated: number | null
    notif: true | false
    loading: boolean
}

let initialState: User = {
    loading: false,
    investigated: null,
    listInvestigated: [],
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
            COOKIES.set("investigator_info", data, { path: "/", sameSite: "strict" })
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
    ApiClient.post("/investigator/logout", { token })
        .then(() => {
            dispatch(setNotif(false))
            COOKIES.remove("investigator_token", { path: "/", sameSite: true, secure: true })
            COOKIES.remove("investigator_info", { path: "/", sameSite: true, secure: true })
            window.location.replace("/signin")
        })
        .catch((err) => {
            dispatch(setLoading(false))
            console.log(err);
        })
})

export const addInvestigated = createAsyncThunk("investigator/create", async (data: object, { dispatch, getState }) => {
    dispatch(setLoading(true))
    let state: any = getState()
    let InvestigatorId = state.user ? Number(state.user.investigator.id_) : null
    ApiClient.post("/investigated", { data, InvestigatorId })
        .then(async ({ data }) => {
            dispatch(getListInvestigated())
        })
        .catch((err) => {
            dispatch(setLoading(false))
            dispatch(setNotif(true))
            console.log(err);
        })
})

export const getListInvestigated = createAsyncThunk("investigator/create", async (data: undefined, { dispatch, getState }) => {
    dispatch(setLoading(true))
    let state: any = getState()
    let InvestigatorId = state.user ? Number(state.user.investigator.id_) : null
    ApiClient.get(`/investigator/${InvestigatorId}/investigated`)
        .then(({ data }) => {
            dispatch(setLoading(false))
            dispatch(setListInvestigated(data))
        })
        .catch((err) => {
            dispatch(setLoading(false))
            dispatch(setNotif(true))
            console.log(err);
        })
})


export const { setInvestigated, setNotif, setInvestigator, setLoading, setListInvestigated } = audioSlice.actions
export default audioSlice.reducer