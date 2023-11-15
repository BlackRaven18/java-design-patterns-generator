import AppStateUtils from "./AppStateUtils";
import {Config, MethodGeneratorConfig, PatternConfigInfo, PatternFamillyInfo, PatternInfo} from "../types";
import FileReader from "./FileReader";





describe("AppStateUtils", () => {

    let appStateUtils = new AppStateUtils();
    let mockConfig: Config = {
        defaultSelectedPatternFamillyIndex: 0,
        defaultSelectedPatternIndex: 0,
        defaultSelectedTabIndex: 0,
        patternFamillies: []
    }

    let mockMethodConfigGenerator: MethodGeneratorConfig = {
        generatePatterns: []
    }

    it('should get config ', async () => {

        const handleFileReadSpy = jest
            .spyOn(FileReader.prototype, 'handleFileRead')
            .mockResolvedValue(JSON.stringify(mockConfig));


        const receivedConfig = await appStateUtils.getConfig("mockPath");

        expect(receivedConfig).toEqual(mockConfig);
    })

    it('should get method generator config', async() => {
        const handleFileReadSpy = jest
            .spyOn(FileReader.prototype, 'handleFileRead')
            .mockResolvedValue(JSON.stringify(mockMethodConfigGenerator));

        const receivedConfig = await appStateUtils.getMethodGeneratorConfig("mockPath");

        expect(receivedConfig).toEqual(mockMethodConfigGenerator);
    })

    it('should get pattern config file', async() => {
        let mockPatternConfig: PatternConfigInfo = {
            name: "",
            language: "",
            files: [],
            params: {
                textFieldParams: [],
                selectParams: []
            }
        }

        let mockPatternFamillInfo: PatternFamillyInfo = {
            patternFamillyName: "",
            patternsDir: "",
            patterns: []
        }

        let mockPatternInfo: PatternInfo = {
            patternName: "",
            patternDir: "",
            configFile: ""
        }

        const handleFileReadSpy = jest
            .spyOn(FileReader.prototype, 'handleFileRead')
            .mockResolvedValue(JSON.stringify(mockPatternConfig));

        const receivedPatternConfig = await appStateUtils
            .getPatternConfigFile(mockPatternFamillInfo, mockPatternInfo)

        expect(receivedPatternConfig).toEqual(mockPatternConfig);
    })

})