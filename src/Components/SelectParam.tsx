import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface SelectParamProps {
    label: string,
    minValue: number,
    maxValue: number,
}

const getArrayWithNumbersBetweenMinAndMax = (min: number, max: number): number[] => {
    let array = [];

    for(let i = min; i <= max; i++){
        array.push(i);
    }

    return array;
}


export default function SelectParam(props: SelectParamProps) {

    const [value, setValue] = useState<string>(props.minValue.toString());
    const rangeArray: number[] = getArrayWithNumbersBetweenMinAndMax(props.minValue, props.maxValue);


    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };


    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={props.label}
                onChange={handleChange}
            >
                {rangeArray.map((value, index) => {
                    return(
                        <MenuItem key={index} value={value}>{value}</MenuItem>
                    );
                })}

            </Select>
        </FormControl>
    );
}