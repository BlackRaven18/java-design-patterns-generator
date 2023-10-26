import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilesAndParamsToSelectedPattern, removeFilesFromPattern, removeTextFieldParamsConnectedToFile } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { TextFieldParamData } from "../types";

interface SelectParamProps {
    label: string,
    fileNameToBeMultiplied: string,
    minValue: number,
    maxValue: number,
    disabled: boolean,
}

const getArrayWithNumbersBetweenMinAndMax = (min: number, max: number): number[] => {
    let array = [];

    for (let i = min; i <= max; i++) {
        array.push(i);
    }

    return array;
}


export default function SelectParam(props: SelectParamProps) {

    const dispatch = useDispatch<AppDispatch>();

    const [value, setValue] = useState<string>(props.minValue.toString());
    const rangeArray: number[] = getArrayWithNumbersBetweenMinAndMax(props.minValue, props.maxValue);

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);


    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);

        setClasses(props.fileNameToBeMultiplied, parseInt(event.target.value));
    };

    const setClasses = (filename: string, numberOfInstances: number) => {

        let patternsConnectedToFile: TextFieldParamData[] = [];


        //get the params connected to filename
        selectedPattern.params.textFieldParams.forEach(param => {
            if (param.filename === filename) {
                patternsConnectedToFile.push(param);
            }
        })

        //clear all class like filename and params connected to it

        dispatch(removeFilesFromPattern({ filename }));
        dispatch(removeTextFieldParamsConnectedToFile({ filename }));


        //add new filenames
        //add new params connected to filename (we need to know what params were connected)

        dispatch(addFilesAndParamsToSelectedPattern({
            filename: filename,
            patterns: patternsConnectedToFile,
            howMany: numberOfInstances
        }
        ))





    }


    return (
        <FormControl
            fullWidth
            disabled={props.disabled}
        >
            <InputLabel>{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={props.label}
                onChange={handleChange}
            >
                {rangeArray.map((value, index) => {
                    return (
                        <MenuItem key={index} value={value}>{value}</MenuItem>
                    );
                })}

            </Select>
        </FormControl>
    );
}