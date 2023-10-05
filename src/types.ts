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
    files: PatternFileInfo[]
}

export interface PatternFileInfo{
    name: string,
    loaded: boolean
}

export interface LoadedPatternFileInfo extends PatternFileInfo{
    content: string,
}

export interface ParamsInfo{
    paramsConfig: ParamsConfigInfo[],
}

export interface ParamsConfigInfo{
    pattern: string,
    params: ParamsData[],
}

export interface ParamsData{
    label: string,
    defaultValue: string,
    replace: string
}