import { Box, Button, Chip, Divider, List, ListItem, Stack, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedPatternCurrentFileName, updatePatternFilesContent, updatePatternTextFieldParamValue } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ReplaceData } from "../types";
import CodeParamsReplacer from "../utils/CodeParamsReplacer";
import ParamTextField from "./ParamTextField";
import EditorReadOnlyContainer from "./ReadOnlySwitch/EditorReadOnlyContainer";
import SelectParam from "./SelectParam";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const codeParamsReplacer = new CodeParamsReplacer();


    const handleFileNameChange = (newValue: string, fileIndex: number) => {
        dispatch(changeSelectedPatternCurrentFileName({
            currentName: newValue,
            fileIndex: fileIndex,
        }))
    }

    const handleParameterChange = (newValue: string, textFieldIndex: number) => {

        dispatch(updatePatternTextFieldParamValue({ value: newValue, index: textFieldIndex }))

        let params: string[] = selectedPattern.params.textFieldParams.map((param, index) => {

            if (index !== textFieldIndex) {
                return param.currentValue ?? "";
            } else {
                return newValue;
            }
        })

        updateSelectedPatternFiles(params);
    }

    const updateSelectedPatternFiles = (params: string[]) => {
        let replaceData: ReplaceData[] = [];

        for (let i = 0; i < params.length; i++) {

            if (selectedPattern.params.textFieldParams[i].filename.length === 0) {
                replaceData.push({
                    replace: selectedPattern.params.textFieldParams[i].replace,
                    value: params[i]
                })
            } else {
                replaceData.push({
                    replace: selectedPattern.params.textFieldParams[i].replace,
                    value: params[i],
                    fileName: selectedPattern.params.textFieldParams[i].filename
                })
            }
        }

        //--------------------------------------------

        let filesWithReplacedParams: string[] = [];

        selectedPattern.files.forEach((file, index) => {
            let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName === file.defaultName);


            filesWithReplacedParams.push(
                codeParamsReplacer.getReplacedContent(selectedPattern.files[index].defaultContent, filteredReplaceData)
            );
        })

        dispatch(updatePatternFilesContent({ newContent: filesWithReplacedParams }));


    }

    return (
        <Box
            height='90vh'
            sx={{
                backgroundColor: "secondary.main",
                padding: "10px",
            }}
        >
            <List
                style={{ maxHeight: '90vh', overflow: 'auto' }}
            >
                <ListItem>

                    <Stack
                        width={"100%"}
                        paddingTop='10px'
                        spacing="20px"
                    >
                        <TextField
                            label={"File name"}
                            variant="outlined"
                            value={selectedPattern.files[selectedTabIndex].currentName || ""}
                            onChange={e => handleFileNameChange(e.target.value, selectedTabIndex)}
                        />
                        <Divider>
                            <Chip label="Global pattern parameters" />
                        </Divider>

                        {/* TODO: Try to make it more clear */}
                        {selectedPattern.params.textFieldParams.map((param, index) => {
                            // global params
                            if (param.shouldBeVisible && param.filename.length === 0) {

                                return (
                                    <ParamTextField
                                        key={index}
                                        index={index}
                                        label={param.label}
                                        value={param.currentValue}
                                        handleOnChange={handleParameterChange}
                                        disabled={!isEditorReadOnly}
                                    />
                                );

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
                                    disabled={!isEditorReadOnly}
                                />
                            );
                        })}

                        <Divider>
                            <Chip label="Local pattern parameters" />
                        </Divider>

                        {selectedPattern.params.textFieldParams.map((param, index) => {
                            if (param.shouldBeVisible && param.filename === selectedPattern.files[selectedTabIndex].defaultName) {
                                return (
                                    <ParamTextField
                                        key={index}
                                        index={index}
                                        label={param.label}
                                        value={param.currentValue}
                                        handleOnChange={handleParameterChange}
                                        disabled={!isEditorReadOnly}
                                    />
                                );
                            }
                        })}

                        <Button
                            onClick={() => {
                                alert(editorRef.current?.getValue());
                            }}
                        >show editor value
                        </Button>



                        <EditorReadOnlyContainer />

                    </Stack>
                </ListItem>
            </List>
        </Box>
    );
}

export default ParametersPanel;