import { Button, Stack, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ParamsData, ParamsInfo, PatternInfo } from "../types";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ editorRef }) => {

    const selectedPattern: PatternInfo = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);

    const [textFieldsContentArray, setTextFieldsContentArray] = useState<string[]>(
        selectedPattern.params.map(param => param.defaultValue || '')
    );

    useEffect(() => {

        // if (selectedPattern.params) {
        let textFieldsContentArrayCopy = [
            ...selectedPattern.params.map(param => param.defaultValue || '')];

        setTextFieldsContentArray(textFieldsContentArrayCopy);

        console.log(textFieldsContentArrayCopy);
        // }

    }, [selectedPattern])



    const handleParameterChange = (newValue: string, textFieldIndex: number
    ) => {
        const textFieldsContentArrayCopy = [...textFieldsContentArray];
        textFieldsContentArrayCopy[textFieldIndex] = newValue;

        setTextFieldsContentArray(textFieldsContentArrayCopy);

        console.log(textFieldsContentArrayCopy);



        // paramsTextFieldsCurrentValue[index] = event.target.value;
        // handleReplace();
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
                    />
                );
            })}

            <Button
                onClick={() => {
                    alert(editorRef.current?.getValue());
                }}
            >show editor value
            </Button>
        </Stack>
    );
}

export default ParametersPanel;