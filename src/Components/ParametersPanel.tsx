import { Button, Stack, TextField } from "@mui/material";
import { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LoadedPatternFileInfo, ParamsInfo, PatternInfo } from "../types";

interface ParametersPanelProps {
    editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({editorRef}) => {

    const selectedPattern: PatternInfo = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile: LoadedPatternFileInfo = useSelector((state: RootState) => state.appState.selectedFile);
    const parameters: ParamsInfo = useSelector((state: RootState) => state.appState.parameters);

    const [paramsTextFieldsCurrentValue, setParamsTextFieldsCurrentValue] = useState<string[]>([])

    useEffect(() => {
        let tmp = new Array<string>(parameters.paramsConfig[0].params.length)
        parameters.paramsConfig[0].params.map((paramData, index) => {
            tmp[index] = paramData.defaultValue;
        })

        setParamsTextFieldsCurrentValue(tmp);

    }, [])

    const handleParameterChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        paramsTextFieldsCurrentValue[index] = event.target.value;
        handleReplace();
    }

    const handleReplace = () => {
        let currentEditorValue = selectedFile.content;

        parameters.paramsConfig.map(paramsData => {
            if (paramsData.pattern === selectedPattern.patternName) {
                paramsData.params.map((paramData, index) => {
                    currentEditorValue = currentEditorValue
                        .replaceAll(paramData.replace, paramsTextFieldsCurrentValue[index]);

                })
                editorRef.current?.setValue(currentEditorValue);
                //editorRef.setValue(currentEditorValue);

                return;
            }
        })
    }


    return (
        <Stack
            spacing="20px"
            sx={{
                padding: "10px"
            }}
        >
            {parameters.paramsConfig.map((paramsData) => {
                if (paramsData.pattern === selectedPattern.patternName) {
                    return paramsData.params.map((paramData, index) => (
                        <TextField
                            key={index}
                            label={paramData.label}
                            variant="outlined"
                            defaultValue={paramData.defaultValue}
                            onChange={(event) => { handleParameterChange(event, index) }}
                        />

                    ));
                } else {
                    return null; // Zwróć null, jeśli nie ma pasujących parametrów
                }
            })}
            <Button
                onClick={() => {
                    alert(editorRef.current?.getValue());
                }}
            >show editor value</Button>
        </Stack>
    );
}

export default ParametersPanel;