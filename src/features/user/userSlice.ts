import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'
import { COOKIES } from '../../config/constants'

interface User {
    user: {
        id_: number
        name: string
        year: number
        token: string
        genre: "H" | "F"
    } | null,
    logged: true | false
}

let initialState: User = {
    user: null,
    logged: false
}

export const audioSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => { state.user = action.payload },
        setLogged: (state, action) => { state.logged = action.payload }
    }
})

export const loginUser = createAsyncThunk('user/login',
    async (data: object, { dispatch }) => {

        ApiClient.post("/user", data)
            .then(({ data: { data } }) => {
                COOKIES.set("userinfo_audioset", data, { path: "/", secure: true })
                dispatch(setUser(data))
                dispatch(setLogged(true))
            }).catch(err => {
                console.log(err);
            })
    })

export const logoutUser = createAsyncThunk('user/logout',
    async (data: undefined, { dispatch }) => {
        COOKIES.remove("userinfo_audioset", { path: "/" })
        dispatch(setUser(null))
        dispatch(setLogged(false))
    })

export const { setUser, setLogged } = audioSlice.actions
export default audioSlice.reducer