
import { AppState, LoadedPatternFileInfo, TextFieldParamData } from "../types";
import AppStateUtils from "./AppStateUtils";

export default class InitialStateLoader {

    private appStateUtils = new AppStateUtils();

    public async loadInitialState(): Promise<AppState> {

        const appConfig = await this.appStateUtils.getConfig("app_config.json");
        const methodGeneratorConfig
            = await this.appStateUtils.getMethodGeneratorConfig("method_generator_config.json");

        const patternInfo = await this.appStateUtils.getPatternConfigFile(
            appConfig.patternFamillies[0],
            appConfig.patternFamillies[0].patterns[0]
        )

        const patternFilesContent = await this.appStateUtils.getPatternFilesContent(
            patternInfo,
            appConfig.patternFamillies[0],
            appConfig.patternFamillies[0].patterns[0]
        )
        const patternFilesContentWithReplacedParams = this.appStateUtils.getPatternFilesContentWithReplacedParams(
            methodGeneratorConfig,
            patternFilesContent,
            patternInfo.params.textFieldParams
        )

        let appState: AppState = {
            appConfig: appConfig,
            methodGeneratorConfig: methodGeneratorConfig,

            selectedPatternFamillyIndex: 0,
            selectedPatternIndex: 0,
            selectedTabIndex: 0,
            isDrawerOpen: false,
            isEditorReadOnly: true,

            selectedPattern: {
                name: patternInfo.name,
                files: [...patternInfo.files.map((file, index) => {
                    let loadedPatternFileInfo: LoadedPatternFileInfo = {
                        sourceFile: file.defaultName,
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