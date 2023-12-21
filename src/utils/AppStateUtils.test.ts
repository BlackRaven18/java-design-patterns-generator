import AppStateUtils from "./AppStateUtils";
import {
    Config, LoadedPatternFileInfo,
    MethodGeneratorConfig,
    PatternConfigInfo,
    PatternFamilyInfo,
    PatternInfo,
    TextFieldParamData
} from "../types";
import FileReader from "./FileReader";
import CodeParamsReplacer from "./CodeParamsReplacer";


const getMockPatternConfig = () => {
    let mockPatternConfig: PatternConfigInfo = {
        name: "",
        language: "",
        files: [],
        params: {
            textFieldParams: [],
            selectParams: []
        }
    }
    return mockPatternConfig;
}

const getMockPatternFamilyInfo = () => {
    let mockPatternFamillInfo: PatternFamilyInfo = {
        patternFamilyName: "",
        patternsDir: "",
        patterns: []
    }
    return mockPatternFamillInfo;
}

const getMockPatternInfo = () => {
    let mockPatternInfo: PatternInfo = {
        patternName: "",
        patternDir: "",
        configFile: ""
    }
    return mockPatternInfo;
}

describe("AppStateUtils", () => {

    let appStateUtils = new AppStateUtils();
    let mockConfig: Config = {
        defaultSelectedPatternFamilyIndex: 0,
        defaultSelectedPatternIndex: 0,
        defaultSelectedTabIndex: 0,
        patternFamilies: []
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

    it('should get method generator config', async () => {
        const handleFileReadSpy = jest
            .spyOn(FileReader.prototype, 'handleFileRead')
            .mockResolvedValue(JSON.stringify(mockMethodConfigGenerator));

        const receivedConfig = await appStateUtils.getMethodGeneratorConfig("mockPath");

        expect(receivedConfig).toEqual(mockMethodConfigGenerator);
    })

    it('should get pattern config file', async () => {
        let mockPatternConfig: PatternConfigInfo = getMockPatternConfig();
        let mockPatternFamillInfo: PatternFamilyInfo = getMockPatternFamilyInfo();
        let mockPatternInfo: PatternInfo = getMockPatternInfo()

        const handleFileReadSpy = jest
            .spyOn(FileReader.prototype, 'handleFileRead')
            .mockResolvedValue(JSON.stringify(mockPatternConfig));

        const receivedPatternConfig = await appStateUtils
            .getPatternConfigFile(mockPatternFamillInfo, mockPatternInfo)

        expect(receivedPatternConfig).toEqual(mockPatternConfig);
    })

    it('should getPatternFilesContent', async () => {

        let mockPatternConfigFile: PatternConfigInfo = {
            ...getMockPatternConfig(),
            files: [{
                sourceFile: "",
                defaultName: "",
                currentName: "",
                defaultContent: "",
                currentContent: "",
                extension: ""
            }],
        }

        const readMultipleFilesSpy = jest
            .spyOn(FileReader.prototype, "readMultipleFiles")
            .mockResolvedValue(['fooContent']);

        let fileReader = new FileReader();
        const result = await appStateUtils.getPatternFilesContent(
            mockPatternConfigFile,
            getMockPatternFamilyInfo(),
            getMockPatternInfo()
        )

        expect(result).toEqual(['fooContent'])
    })

    it('should getPatternFilesContentWithReplacedParams', () => {
        let mockMethodGeneratorConfig: MethodGeneratorConfig = {
            generatePatterns: []
        }

        let mockPatternFilesContent = ['fooContent foo'];
        let mockParams: TextFieldParamData[] = [
            {
                shouldBeVisible: true,
                label: 'foo',
                defaultValue: 'foo',
                currentValue: 'newFoo',
                replace: 'foo',
                filename: []
            }
        ]

        const getReplacedParamsSpy = jest
            .spyOn(CodeParamsReplacer.prototype, 'getReplacedContent')
            .mockReturnValue('fooContent newFoo')

        const result = appStateUtils.getPatternFilesContentWithReplacedParams(
            mockMethodGeneratorConfig,
            "fooLanguage",
            mockPatternFilesContent,
            mockParams
        )

        expect(result).toEqual(['fooContent newFoo']);
    })

    it('should removeDeletedFilesReferenceFromConnectedParam', () => {
        let mockFiles: LoadedPatternFileInfo[] = [{
            sourceFile: "",
            defaultName: "fooName",
            currentName: "",
            defaultContent: "",
            currentContent: "",
            extension: ""
        }]

        let mockParam: TextFieldParamData = {
            shouldBeVisible: true,
            label: 'foo',
            defaultValue: 'foo',
            currentValue: 'newFoo',
            replace: 'foo',
            filename: ['fooName', 'otherFooName']
        }

        const result = appStateUtils.removeDeletedFilesReferenceFromConnectedParam(
            mockFiles,
            mockParam
        )

        expect(result.filename).toEqual(['fooName']);
    })
})