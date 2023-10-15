import { Button, Divider, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewFile, changeSelectedPatternCurrentFileName, setIsEditorReadOnly } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { ThirteenMp } from "@mui/icons-material";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const [textFieldsContentArray, setTextFieldsContentArray] = useState<string[]>(
        selectedPattern.params.map(param => param.defaultValue || '')
    );

    const [isSelectedFileChanged, setIsSelectedFileChanged] = useState(false);
    const [isParamsFieldsDisabled, setIsParamsFieldsDisabled] = useState(false);

    useEffect(() => {
        setIsSelectedFileChanged(true);
    }, [selectedFile])


    useEffect(() => {

        if (isSelectedFileChanged) {

            replaceValues(textFieldsContentArray);

            setIsSelectedFileChanged(false);
        }

    }, [isSelectedFileChanged, textFieldsContentArray])



    useEffect(() => {

        let textFieldsContentArrayCopy = [
            ...selectedPattern.params.map(param => param.defaultValue || '')
        ];

        setTextFieldsContentArray(textFieldsContentArrayCopy);

    }, [selectedPattern])

    const handleFileNameChange = (newValue: string, fileIndex: number) => {
        dispatch(changeSelectedPatternCurrentFileName({
            currentName: newValue,
            fileIndex: fileIndex,
        }))
    }


    const handleParameterChange = (newValue: string, textFieldIndex: number) => {

        const textFieldsContentArrayCopy = [...textFieldsContentArray];
        textFieldsContentArrayCopy[textFieldIndex] = newValue;

        setTextFieldsContentArray(textFieldsContentArrayCopy);
        replaceValues(textFieldsContentArrayCopy);
    }

    const parseEditorValue = (editorDefalutValue: string, params: string[]) => {

        selectedPattern.params.map((param, index) => {
            if(param.defaultValue.includes("$")){
                selectedPattern.params.map((paramToCheck, paramToCheckIndex) => {
                    if(paramToCheck.replace === param.defaultValue){
                        //parse methods here
                        let extendedMethods = parseMethodsFromParams(params[paramToCheckIndex]);
                        editorDefalutValue = editorDefalutValue.replaceAll(param.replace, extendedMethods)
                        console.log(extendedMethods);

                    }
                })
            }else{
                editorDefalutValue = editorDefalutValue.replaceAll(param.replace, params[index] ?? "*NO VALUE DELIVERED*");
            }
        })
        
        // selectedPattern.params.map((param, index) => {
        //     editorDefalutValue = editorDefalutValue.replaceAll(param.replace, params[index] ?? "*NO VALUE DELIVERED*")
        // })

        return editorDefalutValue;
    }

    const parseMethodsFromParams = (methodParam: string) => {
        //przygotowanie tablicy z metodami
        let methodsArray = methodParam.split("\n")
        let trimedMethodsArray = methodsArray.map(method => method.trim().replaceAll(";", ""));

        let extendedMethods = "";

        trimedMethodsArray.map(method => {
            let extendedMethod = "";
            if(method.includes("void")){
                extendedMethod = "\t@Override\n\t" + method + "{\n\n\t}" + "\n\n";
            }else{
                extendedMethod = "\t@Override\n\t" + method + "{\n\t\treturn null;\n\t}" + "\n\n";
            }
            extendedMethods += extendedMethod; 
        })

        return extendedMethods;
        //console.log(extendedMethods);
    }

    const replaceValues = (params: string[]) => {
        let parsedEditorValue = parseEditorValue(selectedFile.content, params);
        editorRef.current?.setValue(parsedEditorValue);
    }

    const handleEditorReadOnlyChange = () => {
        dispatch(setIsEditorReadOnly(!isEditorReadOnly));
        setIsParamsFieldsDisabled(!isParamsFieldsDisabled);
    }



    return (
        <Stack
            spacing="20px"
            sx={{
                padding: "10px"
            }}
        >
            <TextField
                label={"File name"}
                variant="outlined"
                //defaultValue={param.defaultValue}
                value={selectedPattern.files[selectedTabIndex].currentName || ""}
                onChange={e => handleFileNameChange(e.target.value, selectedTabIndex)}
            />
            <Divider/>

            {selectedPattern.params.map((param, index) => {
                let multiline = param.defaultValue.includes("\n");
                return (
                    <TextField
                        key={index}
                        label={param.label}
                        variant="outlined"
                        multiline={multiline}
                        //defaultValue={param.defaultValue}
                        value={textFieldsContentArray[index] || ""}
                        onChange={e => handleParameterChange(e.target.value, index)}
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
            <Button

                onClick={() => {
                    dispatch(addNewFile({
                        defaultName: "Builder.java",
                        currentName: "Builder.java",
                    }));
                }}
            >Add new file
            </Button>

            <FormControlLabel
                control={
                    <Switch
                        checked={isEditorReadOnly}
                        onChange={handleEditorReadOnlyChange}
                    />
                }
                label="Read only mode" />

        </Stack>
    );
}

export default ParametersPanel;