import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ParamsInfo, PatternInfo } from "../types";
import { TextFields } from "@mui/icons-material";

const ParametersPanel = () => {

    const selectedPattern: PatternInfo = useSelector((state: RootState) => state.appState.selectedPattern);
    const parameters: ParamsInfo = useSelector((state: RootState) => state.appState.parameters);

    const editorRef = useSelector((state: RootState) => state.appState.editorRef);


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
                            variant="outlined" />
                    ));
                } else {
                    return null; // Zwróć null, jeśli nie ma pasujących parametrów
                }
            })}
            <Button
                onClick={() => {
                    alert(editorRef?.getValue());
                }}
            >bebe</Button>
        </Stack>
    );
}

export default ParametersPanel;