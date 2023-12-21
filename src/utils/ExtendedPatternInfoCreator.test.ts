import {MethodGeneratorConfig, PatternConfigInfo, PatternFamilyInfo, PatternInfo} from "../types";
import AppStateUtils from "./AppStateUtils";
import ExtendedPatternInfoCreator from "./ExtendedPatternInfoCreator";


describe('ExtendedPatternInfoCreator', () => {


    it('should return extended pattern info', async () => {

        let extendedPatternInfoCreator = new ExtendedPatternInfoCreator();

        const mockPatternFamillyInfo: PatternFamilyInfo = {
            patternFamilyName: "fooFamilyName",
            patternsDir: "fooPatternsDir",
            patterns: [],
        }

        const mockPatternInfo: PatternInfo = {
            patternName: "fooPatternName",
            patternDir: "fooPatternDir",
            configFile: "fooConfigFile"
        }

        const mockMethodGeneratorConfig: MethodGeneratorConfig = {
            generatePatterns: []
        }

        const getMethodGeneratorConfigSpy = jest
            .spyOn(AppStateUtils.prototype, "getMethodGeneratorConfig")
            .mockResolvedValue(mockMethodGeneratorConfig)

        const mockPatternConfigFile: PatternConfigInfo = {
            name: "",
            language: "",
            files: [
                {
                    sourceFile: "fooSourceFile",
                    defaultName: "fooSourceFile",
                    currentName: "",
                    defaultContent: "",
                    currentContent: "",
                    extension: "fooExtension"

                }
            ],
            params: {
                textFieldParams: [
                    {
                        shouldBeVisible: true,
                        label: "fooLabel",
                        defaultValue: 'fooValue',
                        replace: "fooReplace",
                        filename: ["fooFilename"]
                    }
                ],
                selectParams: []
            }
        }

        const expectedPatternInfo: PatternConfigInfo = {
            name: "",
            language: "",
            files: [
                {
                    sourceFile: "fooSourceFile",
                    defaultName: "fooSourceFile",
                    currentName: "fooSourceFile",
                    defaultContent: "fooValue",
                    currentContent: "fooReplacedValue",
                    extension: "fooExtension"

                }
            ],
            params: {
                textFieldParams: [
                    {
                        shouldBeVisible: true,
                        label: "fooLabel",
                        defaultValue: 'fooValue',
                        currentValue: 'fooValue',
                        replace: "fooReplace",
                        filename: ["fooFilename"]
                    }
                ],
                selectParams: []
            }
        }

        const getPatternConfigFileSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternConfigFile")
            .mockResolvedValue(mockPatternConfigFile);

        const getPatternFilesContentSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternFilesContent")
            .mockResolvedValue(["fooValue"]);

        const getPatternFilesContentWithReplacedParamsSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternFilesContentWithReplacedParams")
            .mockReturnValue(["fooReplacedValue"])

        const receivedPatternInfo = await extendedPatternInfoCreator
            .getExtendedPatternInfo(mockPatternFamillyInfo, mockPatternInfo)

        expect(receivedPatternInfo).toEqual(expectedPatternInfo);
    })
})