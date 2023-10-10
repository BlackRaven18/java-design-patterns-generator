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

    const [textFieldsContent, setTextFieldsContent] = useState<string[]>([])

    useEffect(() => {
        let textFieldsContentArray = new Array<string>(selectedPattern.params.length)
        selectedPattern.params.map((param, index) => {
            textFieldsContentArray[index] = param.defaultValue;
        })

        setTextFieldsContent(textFieldsContentArray);
        console.log(textFieldsContentArray);
    }, [selectedPattern])
    
    // useEffect(() => {
    //     let tmp = new Array<string>(parameters.paramsConfig[0].params.length)
    //     parameters.paramsConfig[0].params.map((paramData, index) => {
    //         tmp[index] = paramData.defaultValue;
    //     })

    //     setParamsTextFieldsCurrentValue(tmp);

    // }, [])

    const handleParameterChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        //paramsTextFieldsCurrentValue[index] = event.target.value;
        //handleReplace();
    }

    useEffect(() => {
       // console.log(selectedFile.content);

        ////console.log(editorRef.current?.getValue());

        ////console.log("ujauja")

       // let tmp = new Array<string>(selectedPattern.files.length);
        


        //handleReplace();

    }, [selectedFile.name])

    // const updateEditorContent = (params: ParamsData[]) => {
    //     let fileContent = selectedFile.content;

    //     params.map(param => {
    //         fileContent = fileContent.replaceAll(param.replace, param.defaultValue);
    //     })

    //     editorRef.current?.setValue(fileContent);
    // }

    const handleReplace = () => {
        let currentEditorValue = selectedFile.content;

        // selectedPattern.params.map((paramData, index) => {
        //     currentEditorValue = currentEditorValue
        //                 .replaceAll(paramData.replace, paramsTextFieldsCurrentValue[index]);
        // })

        //editorRef.current?.setValue(currentEditorValue);
    }


    return (
        <Stack
            spacing="20px"
            sx={{
                padding: "10px"
            }}
        >
            {selectedPattern.params.map((paramData, index) => {
                return(
                    <TextField
                        key={index}
                        label={paramData.label}
                        variant="outlined"
                        defaultValue={paramData.defaultValue}
                        onChange={(event) => { handleParameterChange(event, index) }}
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