import { TextField } from "@mui/material";

interface ParamTextFieldProps {
    index: number,
    label: string,
    value?: string,
    handleOnChange: (newValue: string, textFieldIndex: number) => void,
    disabled?: boolean
}

export default function ParamTextField(props: ParamTextFieldProps) {

    return (
        <TextField
            data-testid={'param-text-field-test-id'}
            key={props.index}
            label={props.label}
            variant={"outlined"}
            multiline={true}
            value={props.value ?? ""}
            onChange={e => props.handleOnChange(e.target.value, props.index)}
            disabled={props.disabled}
            spellCheck={false}
        />
    );
}