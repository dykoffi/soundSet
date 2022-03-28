import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../config/axios'
import { COOKIES } from '../../config/constants'

interface User {
    user: {
        name: string
        year: number
        token: string
        genre: "H" | "F"
    } | null
}

let initialState: User = {
    user: null
}

export const audioSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => { state.user = action.payload }
    }
})

export const loginUser = createAsyncThunk('audio/send',
    async (data: object, { dispatch }) => {

        ApiClient.post("/user", data)
            .then(({ data: { data } }) => {
                COOKIES.set("userinfo_audioset", data, { path: "/", secure: true })
                dispatch(setUser(data))
            }).catch(err => {
                console.log(err);
            })
    })



export const { setUser } = audioSlice.actions
export default audioSlice.reducer