import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import AppConfigJSON from "../app_config.json";
import { Config, ExtendedPatternInfo, LoadedPatternFileInfo, TextFieldParamData } from "../types";



interface AppState {
    appConfig: Config,

    isDrawerOpen: boolean,

    selectedPatternFamillyIndex: number,
    selectedPatternIndex: number,
    selectedTabIndex: number,

    selectedPattern: ExtendedPatternInfo,

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
        params: {
            textFieldParams: [...AppConfigJSON.patternFamillies[0].patterns[0].params.textFieldParams.map(param => {
                let extendedParam: TextFieldParamData = {
                    ...param,
                    currentValue: param.defaultValue,
                }
                return extendedParam;
            })],
            selectParams: AppConfigJSON.patternFamillies[0].patterns[0].params.selectParams
        }
    },

    isEditorReadOnly: true,

}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        removeFilesFromPattern: (state, action: PayloadAction<{ filename: string }>) => {
            state.selectedPattern.files
                = state.selectedPattern.files.filter(file => file.sourceFile !== action.payload.filename)
        },

        //--------------
        removeTextFieldParamsConnectedToFile: (state, action: PayloadAction<{ filename: string }>) => {
            state.selectedPattern.params.textFieldParams
                = state.selectedPattern.params.textFieldParams
                    .filter(param => param.filename !== action.payload.filename)
        },

        //-------------------------------
        removeTextFieldParams: (state, action: PayloadAction<{replace: string}>) => {
            state.selectedPattern.params.textFieldParams
                = state.selectedPattern.params.textFieldParams
                    .filter(param => param.replace !== action.payload.replace)
        },

        addFilesAndParamsToSelectedPattern: (
            state,
            action: PayloadAction<{ file: LoadedPatternFileInfo, patterns: TextFieldParamData[], howMany: number }>
        ) => {

            state.selectedTabIndex = 0;

            let parts = action.payload.file.defaultName.split(".");

            let fileNameWithNoExtension = parts[0];
            let extension = parts[1];


            for (let i = 0; i < action.payload.howMany; i++) {

                let newFileName: string = i === 0 ?
                    fileNameWithNoExtension + "." + extension :
                    fileNameWithNoExtension + "(" + i + ")." + extension;

                let patterns = [...action.payload.patterns];

                let patternsConnectedWithFile = [...patterns.map(pattern => {
                    let newPattern: TextFieldParamData = {
                        ...pattern,
                        filename: newFileName
                    }
                    return newPattern;
                })];

                patternsConnectedWithFile.forEach(pattern => {
                    state.selectedPattern.params.textFieldParams.push(pattern);
                })


                state.selectedPattern.files.push({
                    sourceFile: action.payload.file.sourceFile,
                    defaultName: newFileName,
                    currentName: newFileName,
                    defaultContent: action.payload.file.defaultContent,
                    currentContent: action.payload.file.currentContent,
                })
            }

        },

        updatePatternTextFieldParamValue: (state, action: PayloadAction<{ value: string, index: number }>) => {
            state.selectedPattern.params.textFieldParams[action.payload.index].currentValue = action.payload.value;
        },

        updatePatternFile: (state, action: PayloadAction<{ newContent: string, fileIndex: number }>) => {
            state.selectedPattern.files[action.payload.fileIndex].currentContent = action.payload.newContent;
        },

        updatePatternFilesContent: (state, action: PayloadAction<{ newContent: string[] }>) => {
            state.selectedPattern.files.map((file, index) => {
                file.currentContent = action.payload.newContent[index];
            })
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


        setIsEditorReadOnly: (state, action: PayloadAction<boolean>) => {
            state.isEditorReadOnly = action.payload;
        },

        changeSelectedPatternCurrentFileName: (state, action: PayloadAction<
            {
                currentName: string,
                fileIndex: number
            }>
        ) => {
            state.selectedPattern.files[action.payload.fileIndex].currentName = action.payload.currentName;
        },



    }
})

export const {
    removeFilesFromPattern,
    removeTextFieldParamsConnectedToFile,
    removeTextFieldParams,
    addFilesAndParamsToSelectedPattern,

    updatePatternTextFieldParamValue,
    updatePatternFile,
    updatePatternFilesContent,
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