import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import AppConfigJSON from "../app_config.json";
import { Config, ExtendedPatternInfo, LoadedPatternFileInfo, PatternFileInfo, PatternInfo, TextFieldParamData } from "../types";



interface AppState {
    appConfig: Config,

    isDrawerOpen: boolean,

    selectedPatternFamillyIndex: number,
    selectedPatternIndex: number,
    selectedTabIndex: number,

    selectedPattern: ExtendedPatternInfo,
    // selectedFile: LoadedPatternFileInfo,

    isEditorReadOnly: boolean,

}


const initialState: AppState = {
    appConfig: AppConfigJSON,

    isDrawerOpen: false,

    selectedPatternFamillyIndex: 0,
    selectedPatternIndex: 0,
    selectedTabIndex: 0,

    selectedPattern: {
        patternName: AppConfigJSON.patternFamillies[0].patterns[0].patternName,
        patternFilesDirectory: AppConfigJSON.patternFamillies[0].patterns[0].patternFilesDirectory,
        files: [...AppConfigJSON.patternFamillies[0].patterns[0].files.map(file => {
            
            let loadedPatternFileInfo: LoadedPatternFileInfo = {
                sourceFile: file.defaultName,
                defaultName: file.defaultName,
                currentName: file.defaultName,
                defaultContent: "",
                currentContent: "",
            }

            return loadedPatternFileInfo;
        })],
        params: AppConfigJSON.patternFamillies[0].patterns[0].params
    },

    isEditorReadOnly: true,

}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        removeFilesFromPattern: (state, action: PayloadAction<{ filename: string }>) => {
            state.selectedPattern.files
                = state.selectedPattern.files.filter(file => file.defaultName !== action.payload.filename)
        },

        removeTextFieldParamsConnectedToFile: (state, action: PayloadAction<{ filename: string }>) => {
            state.selectedPattern.params.textFieldParams
                = state.selectedPattern.params.textFieldParams
                    .filter(param => param.filename !== action.payload.filename)
        },

        addFilesAndParamsToSelectedPattern: (
            state,
            action: PayloadAction<{ filename: string, patterns: TextFieldParamData[], howMany: number }>
        ) => {

            let parts = action.payload.filename.split(".");

            let fileNameWithNoExtension = parts[0];
            let extension = parts[1];


            for (let i = 0; i < action.payload.howMany; i++) {
                let patternsConnectedWithFile = [...action.payload.patterns];

                patternsConnectedWithFile.forEach(pattern => {
                    //pattern.filename = action.payload.filename;

                    state.selectedPattern.params.textFieldParams.push(pattern);
                })



                state.selectedPattern.files.push({
                    sourceFile: action.payload.filename,
                    defaultName: fileNameWithNoExtension + "(" + (i + 1) + ")." + extension,
                    currentName: fileNameWithNoExtension + "(" + (i + 1) + ")." + extension,
                    defaultContent: "",
                    currentContent: ""
                })
            }

        },

        updatePatternFile: (state, action: PayloadAction<{newContent: string, fileIndex: number}>) => {
            state.selectedPattern.files[action.payload.fileIndex].currentContent = action.payload.newContent;
        },

        setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },

        setSelectedPatternFamillyIndex: (state, action: PayloadAction<number>) => {
            state.selectedPatternFamillyIndex = action.payload;
        },

        setSelectedPatternIndex: (state, action: PayloadAction<number>) => {
            state.selectedPatternIndex = action.payload;
        },

        setSelectedTabIndex: (state, action: PayloadAction<number>) => {
            state.selectedTabIndex = action.payload;
        },

        setSelectedPattern: (state, action: PayloadAction<ExtendedPatternInfo>) => {
            state.selectedPattern = action.payload;
        },

        setSelectedPatternFiles: (state, action: PayloadAction<LoadedPatternFileInfo[]>) => {
            state.selectedPattern.files = action.payload;
        },
        // setSelectedFile: (state, action: PayloadAction<LoadedPatternFileInfo>) => {
        //     state.selectedFile = action.payload;
        // },

        setIsEditorReadOnly: (state, action: PayloadAction<boolean>) => {
            state.isEditorReadOnly = action.payload;
        },
        // addNewFile: (state, action: PayloadAction<PatternFileInfo>) => {
        //     state.selectedPattern.files.push({
        //         defaultName: action.payload.defaultName,
        //         currentName: action.payload.currentName,
        //     })
        // },
        changeSelectedPatternCurrentFileName: (state, action: PayloadAction<
            {
                currentName: string,
                fileIndex: number
            }>
        ) => {
            state.selectedPattern.files[action.payload.fileIndex].currentName = action.payload.currentName;
        }



    }
})

export const {
    removeFilesFromPattern,
    removeTextFieldParamsConnectedToFile,
    addFilesAndParamsToSelectedPattern,

    updatePatternFile,
    setIsDrawerOpen,
    setSelectedPatternFamillyIndex,
    setSelectedPatternIndex,
    setSelectedTabIndex,
    setSelectedPattern,
    setSelectedPatternFiles,
    // setSelectedFile,
    setIsEditorReadOnly,
    //addNewFile,
    changeSelectedPatternCurrentFileName


} = appStateSlice.actions

export default appStateSlice.reducer