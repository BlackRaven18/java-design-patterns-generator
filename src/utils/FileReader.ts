

export default class FileReader {

    static async handleFileRead(filename: string): Promise<string> {
        let content = "";
        try {
            const response = await fetch(filename);
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