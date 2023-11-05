import { PatternInfo, ExtendedPatternInfo, ReplaceData, TextFieldParamData, LoadedPatternFileInfo } from "../types";
import CodeParamsReplacer from "./CodeParamsReplacer";
import FileReader from "./FileReader";

export default class ExtendedPatternInfoCreator {

    private codeParamsReplacer = new CodeParamsReplacer();
    private fileReader = new FileReader();

    private createExtendedPatternInfo(
        patternInfo: PatternInfo,
        patternFilesContent: string[]
    )
    // paramsToReplace?: string[]): ExtendedPatternInfo {
    {

        //     let replaceData: ReplaceData[] = [];

        //     if (paramsToReplace) {
        //         replaceData = patternInfo.params.textFieldParams.map((param, index) => {
        //             return {
        //                 replace: param.replace,
        //                 value: paramsToReplace[index]
        //             }
        //         })
        //     } else {
        //         replaceData = patternInfo.params.textFieldParams.map(param => {
        //             return {
        //                 replace: param.replace,
        //                 value: param.defaultValue
        //             }
        //         })
        //     }

        //     //--------------------------------------------

        //     let patternFilesContentWithReplacedParams: string[] = [];

        //     patternInfo.files.forEach((file, index) => {
        //         let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName === file.defaultName);

        //         patternFilesContentWithReplacedParams.push(
        //             this.codeParamsReplacer.getReplacedContent(patternFilesContent[index], filteredReplaceData)
        //         );
        //     })


        //     let extendedPatternInfo: ExtendedPatternInfo = {
        //         ...patternInfo,
        //         params: {
        //             ...patternInfo.params,
        //             textFieldParams: [...patternInfo.params.textFieldParams.map(param => {
        //                 let extendedParam: TextFieldParamData = {
        //                     ...param,
        //                     currentValue: param.defaultValue
        //                 }
        //                 return extendedParam;
        //             })]
        //         },
        //         files: [...patternInfo.files.map((file, index) => {
        //             let loadedPatternFileInfo: LoadedPatternFileInfo = {
        //                 sourceFile: file.sourceFile,
        //                 defaultName: file.defaultName,
        //                 currentName: file.defaultName,
        //                 defaultContent: patternFilesContent[index],
        //                 currentContent: patternFilesContentWithReplacedParams[index],
        //             }

        //             return loadedPatternFileInfo;
        //         })]
        //     }

        //     return extendedPatternInfo;

        // }

        // public getExtendedPatternInfo(
        //     patternInfo: PatternInfo | ExtendedPatternInfo,
        //     paramsToReplace?: string[]): Promise<ExtendedPatternInfo> {

        //     let sourceFiles = patternInfo.files.map(file => {
        //         return patternInfo.patternFilesDirectory + "/" + file.sourceFile;
        //     })

        //     return this.fileReader.readMultipleFiles(sourceFiles).then(filesContent => {

        //         let extendedPatternInfo = this.createExtendedPatternInfo(patternInfo, filesContent, paramsToReplace);
        //         return extendedPatternInfo;
        //     })

        // }

    }
}