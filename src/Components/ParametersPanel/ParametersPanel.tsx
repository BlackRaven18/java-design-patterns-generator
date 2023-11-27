import { Box, Divider, List, ListItem, Stack, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedPatternCurrentFileName, updatePatternFilesContent, updatePatternTextFieldParamValue } from "../../redux/AppStateSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ReplaceData } from "../../types";
import CodeParamsReplacer from "../../utils/CodeParamsReplacer";
import ParamTextField from "./ParamTextField";
import SelectParam from "./SelectParam";
import { setIsChangesMade } from "../../redux/UnsavedProgressSlice";
import ParametersTabs from "./ParametersTabs";
import { useState } from "react";



const ParametersPanel = () => {

    const dispatch = useDispatch<AppDispatch>();

    const methodGeneratorConfig = useSelector((state: RootState) => state.appState.methodGeneratorConfig);
    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const [selectedParametersTabIndex, setSelectedParametersTabIndex] = useState(0);

    const codeParamsReplacer = new CodeParamsReplacer();

    const howManyLocalParams = () => {

        let howManyLocalParams = 0;
        selectedPattern.params.textFieldParams.forEach((param) => {
            if (param.shouldBeVisible && param.filename.includes(selectedPattern.files[selectedTabIndex].defaultName)) {
               howManyLocalParams++;
            }
        })

        return howManyLocalParams;
    }


    const howManyGlobalParams = () => {

        let howManyGlobalParams = 0;
        selectedPattern.params.textFieldParams.forEach((param) => {
            if (param.shouldBeVisible && param.filename.length <= 0) {
                howManyGlobalParams++;
            }
        })

        howManyGlobalParams += selectedPattern.params.selectParams.length;

        return howManyGlobalParams;
    }


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
            let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName.includes(file.defaultName));


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
            data-testid={'parameters-panel-test-id'}
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
                            inputProps={{
                                "data-testid": 'parameters-panel-file-name-text-field'
                            }}
                            label={"File name"}
                            variant="outlined"
                            value={selectedPattern.files[selectedTabIndex].currentName || ""}
                            onChange={e => handleFileNameChange(e.target.value, selectedTabIndex)}
                            spellCheck={false}
                        />
                        <Divider />

                        <ParametersTabs
                            selectedTabIndex={selectedParametersTabIndex}
                            setSelectedTabIndex={setSelectedParametersTabIndex}
                            globalParamsNumber={howManyGlobalParams()}
                            localParamsNumber={howManyLocalParams()}
                        >
                            {selectedParametersTabIndex === 0 ?
                                [

                                    selectedPattern.params.textFieldParams.map((param, index) => {
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
                                    }),


                                    selectedPattern.params.selectParams.map((selectParamData, index) => {
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
                                    })

                                ]

                                : (
                                    selectedPattern.params.textFieldParams.map((param, index) => {
                                        if (param.shouldBeVisible && param.filename.includes(selectedPattern.files[selectedTabIndex].defaultName)) {
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
                                    })
                                )}
                        </ParametersTabs>
                    </Stack>
                </ListItem>
            </List>
        </Box>
    );
}

export default ParametersPanel;