import {AppState, LoadedPatternFileInfo, PatternConfigInfo, TextFieldParamData} from "../types";
import {
    addFilesAndParamsToSelectedPattern,
    appStateSlice, changeSelectedPatternCurrentFileName,
    removeFileFromPattern,
    removeTextFieldParams,
    removeTextFieldParamsConnectedToFile,
    setIsDrawerOpen, setIsEditorReadOnly, setSelectedPattern,
    setSelectedPatternFamilyIndex, setSelectedPatternFiles,
    setSelectedPatternIndex, setSelectedTabIndex,
    setState,
    updatePatternFile,
    updatePatternFilesContent,
    updatePatternTextFieldParamValue
} from "./AppStateSlice";
import {PayloadAction} from "@reduxjs/toolkit";

function getInitialState() {

    let initialState: AppState = {
        appConfig: {
            defaultSelectedPatternFamilyIndex: 0,
            defaultSelectedPatternIndex: 0,
            defaultSelectedTabIndex: 0,
            patternFamilies: []
        },

        methodGeneratorConfig: {
            generatePatterns: [],
        },

        selectedPatternFamilyIndex: 0,
        selectedPatternIndex: 0,
        selectedTabIndex: 0,
        isDrawerOpen: false,
        isEditorReadOnly: true,

        selectedPattern: {
            name: "",
            language: "",
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

    return initialState;
}


describe('AppStateSlice', () => {

    let initialState = getInitialState();

    afterEach(() => {
        initialState = getInitialState();
    })

    it('should addFilesAndParamsToSelectedPattern', () => {
        let mockFile: LoadedPatternFileInfo = {
            sourceFile: "fooName",
            defaultName: "fooName",
            currentName: "fooName",
            defaultContent: "fooContent",
            currentContent: "fooContent",
            extension: "fooExtension"
        }

        let mockParams: TextFieldParamData[] = [
            {
                shouldBeVisible: true,
                label: 'fooLabel',
                defaultValue: 'fooValue',
                replace: 'fooReplace',
                filename: []
            },
            {
                shouldBeVisible: true,
                label: 'fooLabel',
                defaultValue: 'fooValue',
                replace: 'fooReplace',
                filename: ["", "fooName"]
            },
        ]

        const action: PayloadAction<{
            file: LoadedPatternFileInfo,
            params: TextFieldParamData[],
            howMany: number
        }> = {
            type: addFilesAndParamsToSelectedPattern.type,
            payload: {
                file: mockFile,
                params: mockParams,
                howMany: 1
            }
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.files.length).toBe(2);
        expect(newState.selectedPattern.params.textFieldParams.length).toBe(2);


    })

    it('should removeFileFromPattern', () => {

        const action: PayloadAction<{ filename: string }> = {
            type: removeFileFromPattern.type,
            payload: {filename: ""}
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.files.length).toBe(0);
    })

    it('should removeTextFieldParamsConnectedToFile', () => {
        initialState.selectedPattern.params.textFieldParams.push(
            {
                currentValue: "",
                defaultValue: "",
                filename: ["fooFileNamee"],
                label: "",
                replace: "",
                shouldBeVisible: false

            },
            {
                currentValue: "",
                defaultValue: "",
                filename: ["fooFileName"],
                label: "",
                replace: "",
                shouldBeVisible: false

            }
        )


        const action: PayloadAction<{ filename: string }> = {
            type: removeTextFieldParamsConnectedToFile.type,
            payload: {filename: "fooFileName"}
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.params.textFieldParams.length).toBe(1);
    })

    it('should removeTextFieldParams', () => {

        initialState.selectedPattern.params.textFieldParams.push(
            {
                currentValue: "",
                defaultValue: "",
                filename: [],
                label: "",
                replace: "foo",
                shouldBeVisible: false
            },
            {
                currentValue: "",
                defaultValue: "",
                filename: [],
                label: "",
                replace: "foo",
                shouldBeVisible: false

            }
        )

        const action: PayloadAction<{ replace: string }> = {
            type: removeTextFieldParams.type,
            payload: {replace: "foo"}
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.params.textFieldParams.length).toBe(0);
    })

    it('should updatePatternTextFieldParamValue', () => {

        initialState.selectedPattern.params.textFieldParams.push(
            {
                currentValue: "",
                defaultValue: "",
                filename: [],
                label: "",
                replace: "",
                shouldBeVisible: false
            })

        const action: PayloadAction<{ value: string, index: number }> = {
            type: updatePatternTextFieldParamValue.type,
            payload: {
                value: "fooCurrentValue",
                index: 0,
            }
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.params.textFieldParams.length).not.toBe(0);
        expect(newState.selectedPattern.params.textFieldParams[0].currentValue).toBe("fooCurrentValue");
    })

    it('should updatePatternFile', () => {

        const action: PayloadAction<{ newContent: string, fileIndex: number }> = {
            type: updatePatternFile.type,
            payload: {
                newContent: "fooContent",
                fileIndex: 0,
            }
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.files.length).not.toBe(0);
        expect(newState.selectedPattern.files[0].currentContent).toBe("fooContent");
    })

    it('should updatePatternFilesContent', () => {

        initialState.selectedPattern.files.push({
            currentContent: "",
            currentName: "",
            defaultContent: "",
            defaultName: "",
            extension: "",
            sourceFile: ""

        })

        const fooFilesContent = ["fooContent1", "fooContent2"];

        const action: PayloadAction<{ newContent: string[] }> = {
            type: updatePatternFilesContent.type,
            payload: {
                newContent: fooFilesContent,
            }
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState.selectedPattern.files.length).toBe(2);
        expect(newState.selectedPattern.files[0].currentContent).toEqual("fooContent1");
        expect(newState.selectedPattern.files[1].currentContent).toEqual("fooContent2");
    })

    it("should setState", () => {

        const fooAppState: AppState = {
            appConfig: {
                defaultSelectedPatternFamilyIndex: 1,
                defaultSelectedPatternIndex: 1,
                defaultSelectedTabIndex: 1,
                patternFamilies: []
            },

            methodGeneratorConfig: {
                generatePatterns: [],
            },

            selectedPatternFamilyIndex: 1,
            selectedPatternIndex: 1,
            selectedTabIndex: 1,
            isDrawerOpen: true,
            isEditorReadOnly: true,

            selectedPattern: {
                name: "foo",
                language: "foo",
                files: [
                    {
                        sourceFile: "foo",
                        defaultName: "foo",
                        currentName: "foo",
                        extension: "foo",
                        defaultContent: "foo",
                        currentContent: "foo"

                    }
                ],
                params: {
                    textFieldParams: [],
                    selectParams: []
                }
            }
        }

        const action: PayloadAction<AppState> = {
            type: setState.type,
            payload: fooAppState
        }

        const newState = appStateSlice.reducer(initialState, action);

        expect(newState).toEqual(fooAppState);
    })

    it('should setIsDrawerOpen', () => {

        const action: PayloadAction<boolean> = {
            type: setIsDrawerOpen.type,
            payload: true
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.isDrawerOpen).toBeTruthy();
    })

    it('should setSelectedPatternFamilyIndex', () => {

        const action: PayloadAction<number> = {
            type: setSelectedPatternFamilyIndex.type,
            payload: 2
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedPatternFamilyIndex).toBe(2);
    })

    it('should setSelectedPatternIndex', () => {

        const action: PayloadAction<number> = {
            type: setSelectedPatternIndex.type,
            payload: 2
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedPatternIndex).toBe(2);
    })

    it('should setSelectedTabIndex', () => {

        const action: PayloadAction<number> = {
            type: setSelectedTabIndex.type,
            payload: 2
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedTabIndex).toBe(2);
    })

    it('should setSelectedPattern', () => {

        const fooPatternInfo: PatternConfigInfo = {
            name: "foo",
            language: "foo",
            files: [],
            params: {
                textFieldParams: [],
                selectParams: []
            }
        }

        const action: PayloadAction<PatternConfigInfo> = {
            type: setSelectedPattern.type,
            payload: fooPatternInfo
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedPattern).toEqual(fooPatternInfo);
    })

    it("should setSelectedPatternFiles", () => {

        const fooPatternFiles: LoadedPatternFileInfo[] = [
            {
                sourceFile: "foo",
                defaultName: "foo",
                currentName: "foo",
                defaultContent: "foo",
                currentContent: "foo",
                extension: "foo"
            },
            {
                sourceFile: "otherfoo",
                defaultName: "otherfoo",
                currentName: "otherfoo",
                defaultContent: "otherfoo",
                currentContent: "otherfoo",
                extension: "otherfoo"
            }
        ]

        const action: PayloadAction<LoadedPatternFileInfo[]> = {
            type: setSelectedPatternFiles.type,
            payload: fooPatternFiles
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedPattern.files).toEqual(fooPatternFiles);
    })

    it('should setIsEditorReadOnly', () => {

        const action: PayloadAction<boolean> = {
            type: setIsEditorReadOnly.type,
            payload: false
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.isEditorReadOnly).toBeFalsy();
    })

    it('should changeSelectedPatternCurrentFileName', () => {
        const action: PayloadAction<{ currentName: string, fileIndex: number }> = {
            type: changeSelectedPatternCurrentFileName.type,
            payload: {
                currentName: "fooName",
                fileIndex: 0
            }
        }

        const newState = appStateSlice.reducer(initialState, action);
        expect(newState.selectedPattern.files.length).toBe(1);
        expect(newState.selectedPattern.files[0].currentName).toEqual("fooName")
    })


})