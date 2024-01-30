import { UserType } from '@/interfaces'
import {createSlice} from '@reduxjs/toolkit'

export interface UserState {
    currentUserData: UserType | null
    currentUserId: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUserData: null,
        currentUserId: ''
    },
    reducers: {

        SetCurrentUser: (state, action) => {
            state.currentUserData = action.payload
        },
        SetCurrentUserId: (state, action) => {
            state.currentUserId = action.payload
        }


    }
})

export const { SetCurrentUser, SetCurrentUserId} = userSlice.actions

export default userSlice