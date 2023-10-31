import { } from "../redux/AppStateSlice";
import { ExtendedPatternInfo, LoadedPatternFileInfo, PatternInfo, ReplaceData, TextFieldParamData } from "../types";
import CodeParamsReplacer from "./CodeParamsReplacer";


export default class FileReader {



    public getFileContentWithReplacedParams(fileContent: string, replaceData: ReplaceData[]) {
        let codeParamsReplacer = new CodeParamsReplacer();

            return codeParamsReplacer.getReplacedContent(fileContent, replaceData);

    }




    private createExtendedPatternInfo(
        patternInfo: PatternInfo,
        patternFilesContent: string[],
        paramsToReplace?: string[]): ExtendedPatternInfo {

        let replaceData: ReplaceData[] = [];

        if (paramsToReplace) {
            replaceData = patternInfo.params.textFieldParams.map((param, index) => {
                return {
                    replace: param.replace,
                    value: paramsToReplace[index]
                }
            })
        } else {
            replaceData = patternInfo.params.textFieldParams.map(param => {
                return {
                    replace: param.replace,
                    value: param.defaultValue
                }
            })
        }

        //--------------------------------------------

        let patternFilesContentWithReplacedParams: string[] = [];

        patternInfo.files.forEach((file, index) => {
            let filteredReplaceData = replaceData.filter(data => data.fileName === undefined || data.fileName === file.defaultName);

            patternFilesContentWithReplacedParams.push(this.getFileContentWithReplacedParams(patternFilesContent[index], filteredReplaceData));
        })


        let extendedPatternInfo: ExtendedPatternInfo = {
            ...patternInfo,
            params: {
                ...patternInfo.params,
                textFieldParams: [...patternInfo.params.textFieldParams.map(param => {
                    let extendedParam: TextFieldParamData = {
                        ...param,
                        currentValue: param.defaultValue
                    }
                    return extendedParam;
                })]
            },
            files: [...patternInfo.files.map((file, index) => {
                let loadedPatternFileInfo: LoadedPatternFileInfo = {
                    sourceFile: file.sourceFile,
                    defaultName: file.defaultName,
                    currentName: file.defaultName,
                    defaultContent: patternFilesContent[index],
                    currentContent: patternFilesContentWithReplacedParams[index],
                }

                return loadedPatternFileInfo;
            })]
        }

        return extendedPatternInfo;

    }

    public getExtendedPatternInfo(
        patternInfo: PatternInfo | ExtendedPatternInfo,
        paramsToReplace?: string[]): Promise<ExtendedPatternInfo> {

        let sourceFiles = patternInfo.files.map(file => {
            return patternInfo.patternFilesDirectory + "/" + file.sourceFile;
        })

        return this.readMultipleFiles(sourceFiles).then(filesContent => {

            let extendedPatternInfo = this.createExtendedPatternInfo(patternInfo, filesContent, paramsToReplace);
            return extendedPatternInfo;
        })

    }

    public async loadFileToStateAndReplaceParams(
        pathToDirectory: string,
        fileName: string,
        params: TextFieldParamData[]) {

        let fileContentWithReplacedParams = this.handleFileRead(pathToDirectory + "/" + fileName)
            .then(fileContent => {

                params.map(param => {
                    fileContent = fileContent.replaceAll(param.replace, param.defaultValue);
                })

                return fileContent;

            })

        return fileContentWithReplacedParams;
    }

    async readMultipleFiles(filePaths: string[]): Promise<string[]> {
        const fileContents: string[] = [];

        for (const filePath of filePaths) {
            try {
                const content = await this.handleFileRead(filePath);
                fileContents.push(content);
            } catch (error) {
                console.error(`Błąd podczas odczytywania pliku ${filePath}: ${error}`);
                fileContents.push("");
            }
        }

        return fileContents;
    }

    async handleFileRead(path: string): Promise<string> {
        let content = "";
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('Can not fetch a file');
            }

            content = await response.text();

            if (content.includes("<!DOCTYPE html>")) {
                content = "//No files found...";
                throw new Error("File is missing!");
            }

        } catch (error) {
            console.error('Could not read a file:', error);
        } finally {
            return content;
        }
    }

}