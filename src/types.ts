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
    params: ParamsData[],
}

export interface PatternFileInfo{
    defaultName: string,
    currentName: string,
}

export interface LoadedPatternFileInfo extends PatternFileInfo{
    content: string,
}


export interface ParamsData{
    shouldBeVisible: boolean,
    label: string,
    defaultValue: string,
    replace: string,
    filename: string,
}

export interface ReplaceData {
    replace: string,
    value: string
}