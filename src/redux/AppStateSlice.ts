import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Config, LoadedPatternFileInfo, ParamsInfo, PatternFileInfo, PatternInfo } from "../types";
import { editor } from "monaco-editor";
import {useRef} from "react"
import AppConfigJSON from "../app_config.json"
import ParametersJSON from '../parameters.json'

import App from "../App";


interface AppState {
    appConfig: Config,
    parameters: ParamsInfo,

    editorRef:editor.IStandaloneCodeEditor | null, 

    selectedPatternFamillyIndex: number,
    selectedPatternIndex: number,
    selectedTabIndex: number,

    selectedPattern: PatternInfo,
    selectedFile: LoadedPatternFileInfo,
    editorLoadedFileName: string,
    editorValueArray: string[],

}


const initialState: AppState = {
    appConfig: AppConfigJSON,
    parameters: ParametersJSON,

    editorRef: null,

    selectedPatternFamillyIndex: 0,
    selectedPatternIndex: 0,
    selectedTabIndex: 0,

    selectedPattern: AppConfigJSON.patternFamillies[0].patterns[0],
    selectedFile: {
        name: AppConfigJSON.patternFamillies[0].patterns[0].files[0].name,
        loaded: AppConfigJSON.patternFamillies[0].patterns[0].files[0].loaded,
        content: "",
    },
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

        setSelectedFile: (state, action: PayloadAction<LoadedPatternFileInfo>) => {
            state.selectedFile = action.payload;
        },

        setEditorLoadedFileName: (state, action: PayloadAction<string>) => {
            state.editorLoadedFileName = action.payload;
        },
        setEditorRef: (state, action: PayloadAction<editor.IStandaloneCodeEditor>) => {
            state.editorRef = action.payload;
        }

        

    }
})

export const {
    setSelectedPatternFamillyIndex,
    setSelectedPatternIndex,
    setSelectedTabIndex,
    setSelectedPattern,
    setSelectedFile,
    setEditorLoadedFileName,
    setEditorRef,

 } = appStateSlice.actions

export default appStateSlice.reducer