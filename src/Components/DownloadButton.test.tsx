import DownloadButton from "./DownloadButton";
import {fireEvent, render, screen} from "@testing-library/react";
import {PatternConfigInfo} from "../types";
import FileSaver from "file-saver";
import JSZip from "jszip";

// jest.mock('jszip', () => ({
//     file: jest.fn(),
//     generateAsync: jest.fn().mockResolvedValue('zipContent'),
// }));
jest.mock('file-saver', () => ({saveAs: jest.fn()}))

describe('DownloadButton', () => {

    it('should download pattern', async () => {

        const mockPattern: PatternConfigInfo = {
            name: 'fooName',
            language: "fooLanguage",
            files: [
                {
                    sourceFile: 'foo',
                    defaultName: 'foo',
                    currentName: 'foo',
                    defaultContent: 'foo',
                    currentContent: 'foo',
                    extension: "foo"
                }
            ],
            params: {
                textFieldParams: [],
                selectParams: []
            }
        }

        render(
            <DownloadButton selectedPattern={mockPattern}/>
        )

        expect(screen.getByTestId('download-button-test-id')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('download-button-test-id'));
    })
})