import { useDispatch, useSelector } from "react-redux";
import { setSelectedFile, setSelectedTabIndex } from "../redux/AppStateSlice";
import { LoadedPatternFileInfo } from "../types";
import { AppDispatch, RootState } from "../redux/store";


export default class FileReader {

    private dispatch = useDispatch<AppDispatch>();
    private selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);

    public loadFileToState(pathToDirectory: string, fileName: string) {
        this.handleFileRead(pathToDirectory + "/" + fileName)
            .then(fileContent => {
                let newLoadedFile: LoadedPatternFileInfo = {
                    name: fileName,
                    loaded: true,//this.selectedPattern.files[index].loaded,
                    content: fileContent,
                }

                this.dispatch(setSelectedFile(newLoadedFile));
            })
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

    // static handleFileRead = async (filename: string) => {

    //     let content = "";
    //     try {
    //         const response = await fetch(filename);
    //         if (!response.ok) {
    //             throw new Error('Can not fetch a file');
    //         }

    //         content = await response.text();

    //         if (content.includes("<!DOCTYPE html>")) {
    //             content = "//No files found...";
    //             throw new Error("File is missing!");
    //         }

    //     } catch (error) {
    //         console.error('Could not read a file:', error);
    //     } finally {
    //         return content;
    //     }
    // }
}