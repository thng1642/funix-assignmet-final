import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    state: false,
    id: '',
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showUp(state, action:PayloadAction<string>) {
            let tmp = {...state}
            tmp.state = true
            tmp.id = action.payload
            return tmp
        },
        closeUp(state) {
            let tmp = {...state}
            tmp.id = ''
            tmp.state = false
            return tmp
        },
    }
})

// Reducers
const popupReducers = popupSlice.reducer
export default popupReducers
// Actions
export const popupActions = popupSlice.actions