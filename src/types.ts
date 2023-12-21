export interface AppState{
    appConfig: Config,
    methodGeneratorConfig: MethodGeneratorConfig,

    selectedPatternFamilyIndex: number,
    selectedPatternIndex: number,
    selectedTabIndex: number,
    
    selectedPattern: PatternConfigInfo,
    
    isDrawerOpen: boolean,
    isEditorReadOnly: boolean,
}

export interface PatternFamilyInfo {
    patternFamilyName: string,
    patternsDir: string,
    patterns: PatternInfo[],
}

export interface PatternInfo{
    patternName: string,
    patternDir: string,
    configFile: string
}

export interface PatternConfigInfo {
    name: string,
    language: string,
    files: LoadedPatternFileInfo[],
    params: ParamsTypes,
}

export interface Config{
    defaultSelectedPatternFamilyIndex: number,
    defaultSelectedPatternIndex: number,
    defaultSelectedTabIndex: number,
    patternFamilies: PatternFamilyInfo[];
}

export interface PatternFileInfo {
    defaultName: string,
    sourceFile: string,
    extension: string,
}

export interface LoadedPatternFileInfo extends PatternFileInfo {
    currentName: string,
    defaultContent: string,
    currentContent: string,
}

export interface ParamsTypes {
    textFieldParams: TextFieldParamData[],
    selectParams: SelectParamData[],
}

export interface TextFieldParamData {
    shouldBeVisible: boolean,
    label: string,
    defaultValue: string,
    currentValue?: string,
    replace: string,
    filename: string[],
}

export interface LoadedTextFieldParamData extends TextFieldParamData {
    currentValue: string,
}

export interface SelectParamData {
    label: string,
    fileNameToBeMultiplied: string,
    minNumber: number,
    maxNumber: number
}


export interface ReplaceData {
    replace: string,
    value: string,
    fileName?: string[]
}

export interface MethodGeneratorConfig{
    generatePatterns: MethodGeneratePatternInfo[],
}

export interface MethodGeneratePatternInfo{
    language: string,
    defaultAccessType: string,
    accessTypes: string[],
    returnTypes: ReturnTypeInfo[],
    bodyTemplate: string,
}

export interface ReturnTypeInfo{
    returnType: string,
    shouldReturn: string,
}




