import FileReader from "./FileReader";
import {enableFetchMocks} from "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";

enableFetchMocks();
describe('FileReader', () => {

    let fileReader = new FileReader();

    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should return file content', async () => {

        fetchMock.mockResponseOnce("fooContent")

        const response = await fileReader.handleFileRead('fooPath');

        expect(response).toEqual('fooContent');
    })

    it('should throw error', async () => {

        //fetchMock.mockRejectOnce(new Error('Can not fetch a file'))

        fetchMock.mockResponseOnce("", {status: 400});
        const response = await fileReader.handleFileRead('fooPath');
        expect(response).toEqual("");

    })

    it('should not find a file', async () => {

        fetchMock.mockResponseOnce("<!DOCTYPE html>")
        const response = await fileReader.handleFileRead('fooPath');
        expect(response).toEqual("//No files found...");
    })

    it('should return multiple files content', async () => {

        let mockFilesPath = ['fooPath1', 'fooPath2'];
        fetchMock.mockResponses(['fooContent1', {status: 200}], ['fooContent2', {status: 200}])

        // const handleFileReadSpy = jest
        //     .spyOn(fileReader, 'handleFileRead')
        //     .mockResolvedValue("fooContent")

        const receivedResponse = await fileReader.readMultipleFiles(mockFilesPath);
        const expectedResponse = ['fooContent1', 'fooContent2'];

        expect(fetchMock).toBeCalledTimes(2);
        expect(receivedResponse).toEqual(expectedResponse);
    })
})