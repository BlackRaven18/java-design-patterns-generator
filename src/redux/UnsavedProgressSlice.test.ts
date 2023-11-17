import {setIsChangesMade, unsavedProgressSlice, UnsavedProgressState} from "./UnsavedProgressSlice";
import {PayloadAction} from "@reduxjs/toolkit";

describe('UnsavedProgressSlice', () => {

    it('should set isChangesMade', () => {

        const initialState: UnsavedProgressState = {
            isChangesMade: false,
        }

        const action: PayloadAction<boolean> = {
            type: setIsChangesMade.type,
            payload: true,
        }

        const newState = unsavedProgressSlice.reducer(initialState, action);

        expect(newState.isChangesMade).toBeTruthy();


    })
})
