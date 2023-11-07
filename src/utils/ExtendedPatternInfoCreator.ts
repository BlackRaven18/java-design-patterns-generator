import { PatternConfigInfo, LoadedPatternFileInfo, PatternFamillyInfo, PatternInfo, TextFieldParamData } from "../types";
import AppStateUtils from "./AppStateUtils";

export default class ExtendedPatternInfoCreator {

    private appStateUtils = new AppStateUtils();

    public async getExtendedPatternInfo(patternFamillyInfo: PatternFamillyInfo, patternInfo: PatternInfo) {

        const methodGeneratorConfig
            = await this.appStateUtils.getMethodGeneratorConfig("method_generator_config.json");

        const patternConfigFile: PatternConfigInfo = await this.appStateUtils.getPatternConfigFile(
            patternFamillyInfo,
            patternInfo
        );
        const patternFilesContent: string[] = await this.appStateUtils.getPatternFilesContent(
            patternConfigFile,
            patternFamillyInfo,
            patternInfo
        );

        let patternFilesContentWithReplacedParams: string[] = this.appStateUtils.getPatternFilesContentWithReplacedParams(
            methodGeneratorConfig, 
            patternConfigFile.language,
            patternFilesContent,
            patternConfigFile.params.textFieldParams
        );


        let extendedPatternInfo: PatternConfigInfo = {
            name: patternConfigFile.name,
            language: patternConfigFile.language,
            files: [...patternConfigFile.files.map((file, index) => {
                let loadedPatternFileInfo: LoadedPatternFileInfo = {
                    sourceFile: file.sourceFile,
                    extension: file.extension,
                    defaultName: file.defaultName,
                    currentName: file.defaultName,
                    defaultContent: patternFilesContent[index],
                    currentContent: patternFilesContentWithReplacedParams[index],
                }

                return loadedPatternFileInfo;
            })],
            params: {
                ...patternConfigFile.params,
                textFieldParams: [...patternConfigFile.params.textFieldParams.map(param => {
                    let extendedParam: TextFieldParamData = {
                        ...param,
                        currentValue: param.defaultValue
                    }
                    return extendedParam;
                })]
            },

        }

        return extendedPatternInfo;

    }

}