import { Button, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditorReadOnly } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);

    const [textFieldsContentArray, setTextFieldsContentArray] = useState<string[]>(
        selectedPattern.params.map(param => param.defaultValue || '')
    );

    const [isSelectedFileChanged, setIsSelectedFileChanged] = useState(false);
    const [isParamChanged, setIsParamChanged] = useState(false);
    const [isParamsFieldsDisabled, setIsParamsFieldsDisabled] = useState(false);

    useEffect(() => {
        setIsSelectedFileChanged(true);
    }, [selectedFile])


    useEffect(() => {

        if (isSelectedFileChanged || isParamChanged) {

            let parsedEditorValue = parseEditorValue(selectedFile.content);
            editorRef.current?.setValue(parsedEditorValue);
            setIsSelectedFileChanged(false);
            setIsParamChanged(false)
        }

    }, [isSelectedFileChanged, isParamChanged])


    useEffect(() => {

        let textFieldsContentArrayCopy = [
            ...selectedPattern.params.map(param => param.defaultValue || '')
        ];

        setTextFieldsContentArray(textFieldsContentArrayCopy);

    }, [selectedPattern])




    const handleParameterChange = (newValue: string, textFieldIndex: number
    ) => {
        const textFieldsContentArrayCopy = [...textFieldsContentArray];
        textFieldsContentArrayCopy[textFieldIndex] = newValue;

        setTextFieldsContentArray(textFieldsContentArrayCopy);
        setIsParamChanged(true);
    }

    const parseEditorValue = (editorDefalutValue: string) => {
        selectedPattern.params.map((param, index) => {
            editorDefalutValue = editorDefalutValue.replaceAll(param.replace, textFieldsContentArray[index] ?? "*NO VALUE DELIVERED*")
        })

        return editorDefalutValue;
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
            {selectedPattern.params.map((param, index) => {
                return (
                    <TextField
                        key={index}
                        label={param.label}
                        variant="outlined"
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