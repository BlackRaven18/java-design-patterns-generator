import {FormControlLabel, Switch} from "@mui/material";


interface EditorReadOnlySwitchProps {
    isEditorReadOnly: boolean,
    handleEditorReadOnlyChange: () => void,
}

export default function EditorReadOnlySwitch(props: EditorReadOnlySwitchProps) {


    return (
        <FormControlLabel
            control={
                <Switch
                    data-testid="editor-read-only-switch-test-id"
                    checked={props.isEditorReadOnly}
                    onChange={props.handleEditorReadOnlyChange}
                    disabled={!props.isEditorReadOnly}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: "secondary.main",
                            // '&:hover': {
                            //     backgroundColor: alpha("secondary.main", 0.3),
                            // },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: "secondary.light",
                        },
                    }}
                />
            }
            label="Read-only mode"
            sx={{
                color: (theme) =>
                    props.isEditorReadOnly ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,

            }}
        />
    );
}