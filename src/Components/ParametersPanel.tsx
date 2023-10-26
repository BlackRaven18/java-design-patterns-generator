import { Box, Button, Divider, FormControl, FormControlLabel, InputLabel, List, MenuItem, Select, Stack, Switch, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedPatternCurrentFileName, setIsEditorReadOnly } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import MethodBodyGenerator from "../utils/MethodBodyGenerator";
import CodeParamsReplacer from "../utils/CodeParamsReplacer";
import { ReplaceData } from "../types";
import uniqid from 'uniqid';
import SelectParam from "./SelectParam";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
   //const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const [paramFieldsValueArray, setParamFieldsValueArray] = useState<string[]>(
        selectedPattern.params.textFieldParams.map(param => param.defaultValue || '')
    );

    const [isSelectedFileChanged, setIsSelectedFileChanged] = useState(false);
    const [isParamsFieldsDisabled, setIsParamsFieldsDisabled] = useState(false);

    const codeParamsReplacer = new CodeParamsReplacer();
    const methodBodyGenerator = new MethodBodyGenerator();

    // useEffect(() => {
    //     setIsSelectedFileChanged(true);
    // }, [selectedFile])


    // useEffect(() => {

    //     if (isSelectedFileChanged) {
    //         replaceEditorContentWithParamsValues();
    //     }

    // }, [isSelectedFileChanged, paramFieldsValueArray])

    useEffect(() => {

        updateParamFieldsValueArrayWhenPatternIsChanged();

    }, [selectedPattern])


    // const replaceEditorContentWithParamsValues = () => {
    //     setEditorValueToValueWithReplacedVariables(paramFieldsValueArray);

    //     setIsSelectedFileChanged(false);
    // }

    const updateParamFieldsValueArrayWhenPatternIsChanged = () => {
        let paramFieldsValueArrayCopy = [
            ...selectedPattern.params.textFieldParams.map(param => param.defaultValue || '')
        ];

        setParamFieldsValueArray(paramFieldsValueArrayCopy);
    }

    // const setEditorValueToValueWithReplacedVariables = (params: string[]) => {

    //     let replaceData: ReplaceData[] = [];

    //     for (let i = 0; i < params.length; i++) {
    //         replaceData.push({
    //             replace: selectedPattern.params.textFieldParams[i].replace,
    //             value: params[i]
    //         })
    //     }

    //     let editorValueWithReplacedVariables
    //         = codeParamsReplacer.getReplacedContent(selectedFile.defaultContent, replaceData)
    //     editorRef.current?.setValue(editorValueWithReplacedVariables);
    // }



    const handleFileNameChange = (newValue: string, fileIndex: number) => {
        dispatch(changeSelectedPatternCurrentFileName({
            currentName: newValue,
            fileIndex: fileIndex,
        }))
    }

     const handleParameterChange = (newValue: string, textFieldIndex: number) => {

    //     const paramFieldsValueArrayCopy = [...paramFieldsValueArray];
    //     paramFieldsValueArrayCopy[textFieldIndex] = newValue;

    //     setParamFieldsValueArray(paramFieldsValueArrayCopy);
    //     setEditorValueToValueWithReplacedVariables(paramFieldsValueArrayCopy);
     }

    const handleEditorReadOnlyChange = () => {
        dispatch(setIsEditorReadOnly(!isEditorReadOnly));
        setIsParamsFieldsDisabled(!isParamsFieldsDisabled);
    }



    return (
        <Box
            height='100%'
            sx={{
                backgroundColor: "secondary.main",
                padding: "10px",
            }}
        >

            <Stack
                paddingTop='10px'
                spacing="20px"
            >
                <TextField
                    label={"File name"}
                    variant="outlined"
                    value={selectedPattern.files[selectedTabIndex].currentName || ""}
                    onChange={e => handleFileNameChange(e.target.value, selectedTabIndex)}
                />
                <Divider />

                {/* TODO: Try to make it more clear */}
                {selectedPattern.params.textFieldParams.map((param, index) => {
                    let multiline = param.defaultValue.includes("\n");
                    if (param.shouldBeVisible) {
                        // global params
                        if (param.filename.length === 0 
                            || param.filename === selectedPattern.files[selectedTabIndex].defaultName) {
                            return (
                                <TextField
                                    key={index}
                                    label={param.label}
                                    variant="outlined"
                                    multiline={multiline}
                                    value={paramFieldsValueArray[index] || ""}
                                    onChange={e => handleParameterChange(e.target.value, index)}
                                    disabled={isParamsFieldsDisabled}
                                />
                            );
                        }
                    }
                })}

                {selectedPattern.params.selectParams.map((selectParamData, index) => {
                    return (
                        <SelectParam
                            key={index}
                            label={selectParamData.label}
                            fileNameToBeMultiplied={selectParamData.fileNameToBeMultiplied}
                            minValue={selectParamData.minNumber}
                            maxValue={selectParamData.maxNumber}
                            disabled={isParamsFieldsDisabled}
                        />
                    );
                })}

                <Button
                    onClick={() => {
                        alert(editorRef.current?.getValue());
                    }}
                >show editor value
                </Button>
                {/* <Button

                    onClick={() => {
                        dispatch(addNewFile({
                            defaultName: "Builder.java",
                            currentName: "Builder.java",
                        }));
                    }}
                >Add new file
                </Button> */}

                <FormControlLabel
                    control={
                        <Switch
                            checked={isEditorReadOnly}
                            onChange={handleEditorReadOnlyChange}
                        />
                    }
                    label="Read only mode" />

            </Stack>
        </Box>
    );
}

export default ParametersPanel;