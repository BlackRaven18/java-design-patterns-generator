
import { AppState, LoadedPatternFileInfo, TextFieldParamData } from "../types";
import AppStateUtils from "./AppStateUtils";

export default class InitialStateLoader {

    private appStateUtils = new AppStateUtils();

    public async loadInitialState(): Promise<AppState> {

        const appConfig = await this.appStateUtils.getConfig(process.env.REACT_APP_APP_CONFIG_FILE ?? "app_config.json");
        const methodGeneratorConfig
            = await this.appStateUtils.getMethodGeneratorConfig(
                process.env.REACT_APP_METHOD_GENERATOR_CONFIG_FILE ?? "method_generator_config.json");

        const patternInfo = await this.appStateUtils.getPatternConfigFile(
            appConfig.patternFamilies[appConfig.defaultSelectedPatternFamilyIndex],
            appConfig.patternFamilies[appConfig.defaultSelectedPatternFamilyIndex].patterns[appConfig.defaultSelectedPatternIndex]
        )

        const patternFilesContent = await this.appStateUtils.getPatternFilesContent(
            patternInfo,
            appConfig.patternFamilies[appConfig.defaultSelectedPatternFamilyIndex],
            appConfig.patternFamilies[appConfig.defaultSelectedPatternFamilyIndex].patterns[appConfig.defaultSelectedPatternIndex]
        )
        const patternFilesContentWithReplacedParams = this.appStateUtils.getPatternFilesContentWithReplacedParams(
            methodGeneratorConfig,
            patternInfo.language,
            patternFilesContent,
            patternInfo.params.textFieldParams
        )

        let appState: AppState = {
            appConfig: appConfig,
            methodGeneratorConfig: methodGeneratorConfig,

            selectedPatternFamilyIndex: appConfig.defaultSelectedPatternFamilyIndex,
            selectedPatternIndex: appConfig.defaultSelectedPatternIndex,
            selectedTabIndex: appConfig.defaultSelectedTabIndex,
            isDrawerOpen: false,
            isEditorReadOnly: true,

            selectedPattern: {
                name: patternInfo.name,
                language: patternInfo.language,
                files: [...patternInfo.files.map((file, index) => {
                    let loadedPatternFileInfo: LoadedPatternFileInfo = {
                        sourceFile: file.defaultName,
                        extension: file.extension,
                        defaultName: file.defaultName,
                        currentName: file.defaultName,
                        defaultContent: patternFilesContent[index],
                        currentContent: patternFilesContentWithReplacedParams[index],
                    }

                    return loadedPatternFileInfo;
                })],

                params: {
                    ...patternInfo.params,
                    textFieldParams: [...patternInfo.params.textFieldParams.map(param => {
                        let extendedParam: TextFieldParamData = {
                            ...param,
                            currentValue: param.defaultValue
                        }
                        return extendedParam;
                    })]
                },

            },
        }

        return appState;

    }
}