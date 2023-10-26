import { useDispatch } from "react-redux";
import { } from "../redux/AppStateSlice";
import { AppDispatch } from "../redux/store";
import { ExtendedPatternInfo, LoadedPatternFileInfo, PatternInfo, TextFieldParamData } from "../types";
import CodeParamsReplacer from "./CodeParamsReplacer";


export default class FileReader {

    private dispatch = useDispatch<AppDispatch>();

    public getExtendedPatternInfo(
        patternInfo: PatternInfo,
        patternFilesContent: string[]): ExtendedPatternInfo {

            let codeParamsReplacer = new CodeParamsReplacer();

            let patternFilesContentWithReplacedParams = [...patternFilesContent.map(content => {
                let replaceData = patternInfo.params.textFieldParams.map(param => {
                    return {
                        replace: param.replace,
                        value: param.defaultValue
                    }
                })
                content = codeParamsReplacer.getReplacedContent(content, replaceData)
                return content;
            })]

    

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