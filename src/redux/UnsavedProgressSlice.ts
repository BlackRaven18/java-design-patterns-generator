import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UnsavedProgressState{
    isChangesMade: boolean
}

const initialState: UnsavedProgressState = {
    isChangesMade: false,
}

export const unsavedProgressSlice = createSlice({
    name: "unsavedProgress",
    initialState,
    reducers: {
        setIsChangesMade: (state, action: PayloadAction<boolean>) => {
            state.isChangesMade = action.payload;
        },

    }
})

export const {

} = unsavedProgressSlice.actions

export default unsavedProgressSlice.reducer;
