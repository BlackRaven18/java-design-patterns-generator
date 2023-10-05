import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Config, PatternInfo } from "../types";
import AppConfigJSON from "../app_config.json"
import App from "../App";


interface AppState {
    appConfig: Config,

    selectedPatternFamillyIndex: number,
    selectedPatternIndex: number,
    selectedTabIndex: number,

    selectedPattern: PatternInfo,
    editorLoadedFileName: string,
    editorValueArray: string[],

}


const initialState: AppState = {
    appConfig: AppConfigJSON,

    selectedPatternFamillyIndex: 0,
    selectedPatternIndex: 0,
    selectedTabIndex: 0,

    selectedPattern: AppConfigJSON.patternFamillies[0].patterns[0],
    editorLoadedFileName: AppConfigJSON.patternFamillies[0].patterns[0].files[0].name,
    editorValueArray: [],


}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setSelectedPatternFamillyIndex: (state, action: PayloadAction<number>) => {
            state.selectedPatternFamillyIndex = action.payload;
        },

        setSelectedPatternIndex: (state, action: PayloadAction<number>) => {
            state.selectedPatternIndex = action.payload;
        },

        setSelectedTabIndex: (state, action: PayloadAction<number>) => {
            state.selectedTabIndex = action.payload;
        },

        setSelectedPattern: (state, action: PayloadAction<PatternInfo>) => {
            state.selectedPattern = action.payload;
        },

        setEditorLoadedFileName: (state, action: PayloadAction<string>) => {
            state.editorLoadedFileName = action.payload;
        },

        

    }
})

export const {
    setSelectedPatternFamillyIndex,
    setSelectedPatternIndex,
    setSelectedTabIndex,
    setSelectedPattern,
    setEditorLoadedFileName

 } = appStateSlice.actions

export default appStateSlice.reducer