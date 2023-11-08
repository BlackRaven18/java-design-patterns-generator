import { Box, Divider, List, ListItem, Stack, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedPatternCurrentFileName, updatePatternFilesContent, updatePatternTextFieldParamValue } from "../../redux/AppStateSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ReplaceData } from "../../types";
import CodeParamsReplacer from "../../utils/CodeParamsReplacer";
import ParamTextField from "./ParamTextField";
import ParametersAccordion from "./ParametersAccordion";
import SelectParam from "./SelectParam";
import { setIsChangesMade } from "../../redux/UnsavedProgressSlice";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const methodGeneratorConfig = useSelector((state: RootState) => state.appState.methodGeneratorConfig);
    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const codeParamsReplacer = new CodeParamsReplacer();


    const handleFileNameChange = (newValue: string, fileIndex: number) => {
        dispatch(setIsChangesMade(true));
        dispatch(changeSelectedPatternCurrentFileName({
            currentName: newValue,
            fileIndex: fileIndex,
        }))
    }

    const handleParameterChange = (newValue: string, textFieldIndex: number) => {

        dispatch(updatePatternTextFieldParamValue({ value: newValue, index: textFieldIndex }))
        dispatch(setIsChangesMade(true));

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
        let filesWithReplacedParams: string[] = [];

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

        selectedPattern.files.forEach((file, index) => {
            let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName === file.defaultName);


            filesWithReplacedParams.push(
                codeParamsReplacer.getReplacedContent(
                    methodGeneratorConfig,
                    selectedPattern.language,
                    selectedPattern.files[index].defaultContent,
                    filteredReplaceData
                )
            );
        })

        dispatch(updatePatternFilesContent({ newContent: filesWithReplacedParams }));
    }

    return (
        <Box
            height='89svh'
            sx={{
                backgroundColor: "secondary.main",
                padding: "10px",
            }}
        >
            <List
                style={{ maxHeight: '85vh', overflow: 'auto' }}
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
                        <Divider />

                        <ParametersAccordion
                            header="Global Pattern Parameters"
                        >
                            {selectedPattern.params.textFieldParams.map((param, index) => {
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
                        </ParametersAccordion>

                        <ParametersAccordion
                            header="Local Pattern Parameters"
                        >
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
                        </ParametersAccordion>

                    </Stack>
                </ListItem>
            </List>
        </Box>
    );
}

export default ParametersPanel;