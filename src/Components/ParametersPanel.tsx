import { Box, Button, Divider, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedPatternCurrentFileName, setIsEditorReadOnly, updatePatternFilesContent } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ReplaceData } from "../types";
import FileReader from "../utils/FileReader";
import SelectParam from "./SelectParam";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);


    const [isParamsFieldsDisabled, setIsParamsFieldsDisabled] = useState(false);

    const fileReader = new FileReader();;


    useEffect(() => {

        updateParamFieldsValueArrayWhenPatternIsChanged();

    }, [selectedPattern])




    const updateParamFieldsValueArrayWhenPatternIsChanged = () => {
        let paramFieldsValueArrayCopy = [
            ...selectedPattern.params.textFieldParams.map(param => param.defaultValue || '')
        ];

        //setParamFieldsValueArray(paramFieldsValueArrayCopy);
    }


    const updateSelectedPatternFiles = (params: string[]) => {
        let replaceData: ReplaceData[] = [];

        for (let i = 0; i < params.length; i++) {
            replaceData.push({
                replace: selectedPattern.params.textFieldParams[i].replace,
                value: params[i]
            })
        }

        let files: string[] = [...selectedPattern.files.map(file => {
            return file.defaultContent;
        })]

        let filesWithReplacedParams = fileReader.getFilesContentWithReplacedParams(files, replaceData);

        dispatch(updatePatternFilesContent({newContent: filesWithReplacedParams}));


    }



    const handleFileNameChange = (newValue: string, fileIndex: number) => {
        dispatch(changeSelectedPatternCurrentFileName({
            currentName: newValue,
            fileIndex: fileIndex,
        }))
    }

    const handleParameterChange = (newValue: string, textFieldIndex: number) => {

       //const paramFieldsValueArrayCopy = [...paramFieldsValueArray];
        //paramFieldsValueArrayCopy[textFieldIndex] = newValue;
        //setParamFieldsValueArray(paramFieldsValueArrayCopy);

        //updateSelectedPatternFiles(paramFieldsValueArrayCopy);
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
                                    value={param.currentValue}
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