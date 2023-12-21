import AppStateUtils from "./AppStateUtils";
import {AppState, Config, MethodGeneratorConfig, PatternConfigInfo} from "../types";
import InitialStateLoader from "./InitialStateLoader";


describe('InitialStateLoader', () => {

    it('should load initial state', async () => {

        const initialStateLoader = new InitialStateLoader();

        const mockConfig: Config = {
            defaultSelectedPatternFamilyIndex: 0,
            defaultSelectedPatternIndex: 0,
            defaultSelectedTabIndex: 0,
            patternFamilies: [
                {
                   patternFamilyName: "fooFamilly",
                   patternsDir: "fooDir",
                   patterns: [
                       {
                           patternName: "fooName",
                           patternDir: "fooPatternDir",
                           configFile: "fooConfigFile"
                       }
                   ]
                }
            ],
        }

        const mockMethodGeneratorConfig: MethodGeneratorConfig = {
            generatePatterns: []
        }

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

        const expectedSelectedPatternInfo: PatternConfigInfo = {
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

        const getConfigSpy = jest
            .spyOn(AppStateUtils.prototype, "getConfig")
            .mockResolvedValue(mockConfig);

        const getMethodGeneratorConfigSpy = jest
            .spyOn(AppStateUtils.prototype, "getMethodGeneratorConfig")
            .mockResolvedValue(mockMethodGeneratorConfig)

        const getPatternConfigFileSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternConfigFile")
            .mockResolvedValue(mockPatternConfigFile);

        const getPatternFilesContentSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternFilesContent")
            .mockResolvedValue(["fooValue"]);

        const getPatternFilesContentWithReplacedParamsSpy = jest
            .spyOn(AppStateUtils.prototype, "getPatternFilesContentWithReplacedParams")
            .mockReturnValue(["fooReplacedValue"])

        const receivedAppState = await initialStateLoader.loadInitialState();

        const expectedAppState: AppState = {
            appConfig: mockConfig,
            methodGeneratorConfig: mockMethodGeneratorConfig,
            selectedPatternFamilyIndex: mockConfig.defaultSelectedPatternFamilyIndex,
            selectedPatternIndex: mockConfig.defaultSelectedPatternIndex,
            selectedTabIndex: mockConfig.defaultSelectedTabIndex,
            isDrawerOpen: false,
            isEditorReadOnly: true,

            selectedPattern: expectedSelectedPatternInfo,
        }

        expect(receivedAppState).toEqual(expectedAppState);

    })
})