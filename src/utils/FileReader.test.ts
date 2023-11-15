
import FileReader from "./FileReader";


describe('FileReader', () => {

    let fileReader = new FileReader();

    it('should return file content', async () => {


        let handleFileReadSpy = jest
            .spyOn(fileReader, "handleFileRead")
            .mockResolvedValue("mocked file content")

        const receivedFileContent = await fileReader.handleFileRead("mockPath");

        expect(receivedFileContent).toEqual("mocked file content");

    })


})