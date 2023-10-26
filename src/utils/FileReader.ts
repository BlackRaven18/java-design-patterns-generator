import { useDispatch } from "react-redux";
import { setSelectedFile } from "../redux/AppStateSlice";
import { AppDispatch } from "../redux/store";
import { LoadedPatternFileInfo, TextFieldParamData } from "../types";


export default class FileReader {

    private dispatch = useDispatch<AppDispatch>();

    public loadFileToState(pathToDirectory: string, fileName: string) {
        this.handleFileRead(pathToDirectory + "/" + fileName)
            .then(fileContent => {
                let newLoadedFile: LoadedPatternFileInfo = {
                    sourceFile: fileName,
                    defaultName: fileName,
                    currentName: fileName,
                    defaultContent: fileContent,
                    currentContent: fileContent
                }

                this.dispatch(setSelectedFile(newLoadedFile));
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