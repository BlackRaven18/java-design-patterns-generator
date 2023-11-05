import { ExtendedPatternInfo, LoadedPatternFileInfo, PatternFamillyInfo, PatternInfo, TextFieldParamData } from "../types";
import CodeParamsReplacer from "./CodeParamsReplacer";
import FileReader from "./FileReader";

export default class ExtendedPatternInfoCreator {

    private codeParamsReplacer = new CodeParamsReplacer();
    private fileReader = new FileReader();

    public async getExtendedPatternInfo(patternFamillyInfo: PatternFamillyInfo, patternInfo: PatternInfo) {

        let patternConfigFilePath = patternFamillyInfo.patternsDir + "/" + patternInfo.patternDir + "/" + patternInfo.configFile

        const patternConfigFile: ExtendedPatternInfo = JSON.parse(await this.fileReader.handleFileRead(patternConfigFilePath))

        let patternFilePaths: string[] = [...patternConfigFile.files.map(file => {
            let path = patternFamillyInfo.patternsDir + "/"
                + patternInfo.patternDir + "/"
                + file.defaultName;

            return path;
        })]

        const patternFilesContent = await this.fileReader.readMultipleFiles(patternFilePaths);

        let replaceData = patternConfigFile.params.textFieldParams.map(param => {
            return {
                replace: param.replace,
                value: param.defaultValue
            }
        })

        let patternFilesContentWithReplacedParams: string[] = [];

        patternConfigFile.files.forEach((file, index) => {
            //let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName === file.defaultName);

            patternFilesContentWithReplacedParams.push(
                this.codeParamsReplacer.getReplacedContent(patternFilesContent[index], replaceData)
            );
        })




        let extendedPatternInfo: ExtendedPatternInfo = {
            name: patternConfigFile.name,
            files: [...patternConfigFile.files.map((file, index) => {
                let loadedPatternFileInfo: LoadedPatternFileInfo = {
                    sourceFile: file.sourceFile,
                    defaultName: file.defaultName,
                    currentName: file.defaultName,
                    defaultContent: patternFilesContent[index],
                    currentContent: patternFilesContentWithReplacedParams[index],
                }

                return loadedPatternFileInfo;
            })],
            params: {
                ...patternConfigFile.params,
                textFieldParams: [...patternConfigFile.params.textFieldParams.map(param => {
                    let extendedParam: TextFieldParamData = {
                        ...param,
                        currentValue: param.defaultValue
                    }
                    return extendedParam;
                })]
            },

        }

        return extendedPatternInfo;

    }

    // public getExtendedPatternInfo(
    //         patternInfo: PatternInfo,
    //         paramsToReplace?: string[]): Promise<ExtendedPatternInfo> {

    //         let sourceFiles = patternInfo.files.map(file => {
    //             return patternInfo.patternFilesDirectory + "/" + file.sourceFile;
    //         })

    //         return this.fileReader.readMultipleFiles(sourceFiles).then(filesContent => {

    //             let extendedPatternInfo = this.createExtendedPatternInfo(patternInfo, filesContent, paramsToReplace);
    //             return extendedPatternInfo;
    //         })

    //     }

    // private createExtendedPatternInfo(
    //     patternInfo: PatternInfo,
    //     patternFilesContent: string[],
    //     paramsToReplace?: string[]): ExtendedPatternInfo {

    //          let replaceData: ReplaceData[] = [];

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

}