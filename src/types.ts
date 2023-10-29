export interface Config {
    patternFamillies: PatternFamillyInfo[]
}

export interface PatternFamillyInfo {
    patternFamillyName: string,
    patterns: PatternInfo[]

}

export interface PatternInfo {
    patternName: string,
    patternFilesDirectory: string,
    files: PatternFileInfo[],
    params: ParamsTypes,
}

export interface ExtendedPatternInfo{
    patternName: string,
    patternFilesDirectory: string,
    files: LoadedPatternFileInfo[],
    params: ParamsTypes,
}

export interface PatternFileInfo{
    defaultName: string,
    sourceFile: string,
}

export interface LoadedPatternFileInfo extends PatternFileInfo{
    currentName: string,
    defaultContent: string,
    currentContent: string,
}

export interface ParamsTypes{
    textFieldParams: TextFieldParamData[],
    selectParams: SelectParamData[],
}

export interface TextFieldParamData{
    shouldBeVisible: boolean,
    label: string,
    defaultValue: string,
    currentValue?: string,
    replace: string,
    filename: string,
}

export interface LoadedTextFieldParamData extends TextFieldParamData{
    currentValue: string,
}

export interface SelectParamData{
    label: string,
    fileNameToBeMultiplied: string,
    minNumber: number,
    maxNumber: number
}


export interface ReplaceData {
    replace: string,
    value: string,
    fileName?: string
}