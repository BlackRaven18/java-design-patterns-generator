import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, LoadedPatternFileInfo, PatternConfigInfo, TextFieldParamData } from "../types";


const initialState: AppState = {
    appConfig: {
        patternFamillies: []
    },

    methodGeneratorConfig: {
        generatePatterns: [],
    },

    selectedPatternFamillyIndex: 0,
    selectedPatternIndex: 0,
    selectedTabIndex: 0,
    isDrawerOpen: false,
    isEditorReadOnly: true,

    selectedPattern: {
        name: "",
        files: [
            {
                sourceFile: "",
                defaultName: "",
                currentName: "",
                extension: "",
                defaultContent: "",
                currentContent: ""

            }
        ],
        params: {
            textFieldParams: [],
            selectParams: []
        }
    }

}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<AppState>) => {

            state.appConfig = action.payload.appConfig;
            state.methodGeneratorConfig = action.payload.methodGeneratorConfig;
            state.isDrawerOpen = action.payload.isDrawerOpen;
            state.isEditorReadOnly = action.payload.isEditorReadOnly;
            state.selectedPatternFamillyIndex = action.payload.selectedPatternFamillyIndex;
            state.selectedPatternIndex = action.payload.selectedPatternIndex;
            state.selectedTabIndex = action.payload.selectedTabIndex;
            state.selectedPattern = action.payload.selectedPattern;

        },
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
        removeTextFieldParams: (state, action: PayloadAction<{ replace: string }>) => {
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
                    extension: action.payload.file.extension,
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

        setSelectedPattern: (state, action: PayloadAction<PatternConfigInfo>) => {
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
    setState,
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