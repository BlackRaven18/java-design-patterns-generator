import { files } from "jszip";
import { } from "../redux/AppStateSlice";
import { ExtendedPatternInfo, LoadedPatternFileInfo, PatternInfo, ReplaceData, TextFieldParamData } from "../types";
import CodeParamsReplacer from "./CodeParamsReplacer";


export default class FileReader {


    public getFilesContentWithReplacedParams(filesContent: string[], replaceData: ReplaceData[]) {
        let codeParamsReplacer = new CodeParamsReplacer();

        let filesContentWithReplacedParams: string[] = [...filesContent.map(fileContent => {
            return codeParamsReplacer.getReplacedContent(fileContent, replaceData);
        })]

        return filesContentWithReplacedParams;

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

        let patternFilesContentWithReplacedParams: string[]
            = this.getFilesContentWithReplacedParams(patternFilesContent, replaceData);


        let extendedPatternInfo: ExtendedPatternInfo = {
            ...patternInfo, files: [...patternInfo.files.map((file, index) => {
                let loadedPatternFileInfo: LoadedPatternFileInfo = {
                    sourceFile: file.defaultName,
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
            return patternInfo.patternFilesDirectory + "/" + file.defaultName;
        })

        return this.readMultipleFiles(sourceFiles).then(filesContent => {

            let extendedPatternInfo = this.createExtendedPatternInfo(patternInfo, filesContent, paramsToReplace);
            return extendedPatternInfo;
        })

    }

    public async loadFileToStateAndReplaceParams(
        pathToDirectory: string, fileName: string, params: TextFieldParamData[]) {


        let fileContentWithReplacedParams = this.handleFileRead(
            pathToDirectory + "/" + fileName)
            .then(fileContent => {

                params.map(param => {
                    fileContent = fileContent.replaceAll(
                        param.replace, param.defaultValue);
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