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
    fileNames: string[]
}