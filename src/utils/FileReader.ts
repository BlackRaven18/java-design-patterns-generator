import { } from "../redux/AppStateSlice";
// import fs from 'fs'
// import path from 'path'


export default class FileReader {

    // async getDirectoryContent(pathToDirectory: string){
    //     fs.readdir(pathToDirectory, (err, files) => {
    //         files.forEach(file => {
    //           // get the details of the file 
    //           let fileDetails = fs.lstatSync(path.resolve(pathToDirectory, file));
    //           // check if the file is directory 
    //           if (fileDetails.isDirectory()) {
    //             console.log('Directory: ' + file);
    //           } else {
    //             console.log('File: ' + file);
    //           }
    //         });
    //       });
    // }

    async readMultipleFiles(filePaths: string[]): Promise<string[]> {
        const fileContents: string[] = [];

        for (const filePath of filePaths) {
            try {
                const content = await this.handleFileRead(filePath);
                fileContents.push(content);
            } catch (error) {
                console.error(`File read error: ${filePath}: ${error}`);
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