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
    logged: true | false
    loading: boolean
}

let initialState: User = {
    loading: false,
    investigated: null,
    listInvestigated: null,
    investigator: null,
    logged: false
}

export const audioSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setInvestigated: (state, action) => { state.investigated = action.payload },
        setListInvestigated: (state, action) => { state.listInvestigated = action.payload },
        setInvestigator: (state, action) => { state.investigator = action.payload },
        setLogged: (state, action) => { state.logged = action.payload },
        setLoading: (state, action) => { state.loading = action.payload }
    }
})

export const addInvestigator = createAsyncThunk("investigator/signup", async (data: object, { dispatch }) => {
    dispatch(setLoading(true))
    ApiClient.post("/investigator", data)
        .then(({ data: { data } }) => {

        })
        .catch((err) => {
            dispatch(setLoading(false))
            console.log(err);
        })
})

export const loginInvestigator = createAsyncThunk("investigator/signin", async (data: object, { dispatch }) => {
    ApiClient.post("/investigator/login", data)
        .then(({ data }) => {
            dispatch(setInvestigator(data))
            dispatch(setLogged(true))
            dispatch(setLoading(false))
        })
        .catch((err) => {
            dispatch(setLoading(false))
            console.log(err);
        })
})

export const logoutInvestigator = createAsyncThunk("investigator/logout", async (token: string, { dispatch }) => {
    ApiClient.post("/investigator/logout", token)
        .then(({ data }) => {
            dispatch(setLogged(false))
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

export const loginUser = createAsyncThunk('user/login',
    async (data: object, { dispatch }) => {

        ApiClient.post("/user", data)
            .then(({ data: { data } }) => {
                COOKIES.set("userinfo_audioset", data, { path: "/", secure: true })
                COOKIES.set("token", data.token, { path: "/" })
                dispatch(setInvestigated(data))
                dispatch(setLogged(true))

            }).catch(err => {
                console.log(err);
            })
    })

export const logoutUser = createAsyncThunk('user/logout',
    async (data: undefined, { dispatch }) => {
        COOKIES.remove("userinfo_audioset", { path: "/" })
        dispatch(setInvestigated(null))
        dispatch(setLogged(false))
    })

export const { setInvestigated, setLogged, setInvestigator, setLoading, setListInvestigated } = audioSlice.actions
export default audioSlice.reducer