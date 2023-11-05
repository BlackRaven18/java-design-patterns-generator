
import { AppState, Config, ExtendedPatternInfo, LoadedPatternFileInfo } from "../types";
import FileReader from "./FileReader";

export default class InitialStateLoader {

    private fileReader = new FileReader();

    private async getConfig(): Promise<Config> {
        let configPath = "app_config.json";

        const fileConfigAsString = await this.fileReader.handleFileRead(configPath);

        return JSON.parse(fileConfigAsString);

    }

    private async getPatternInfo(config: Config): Promise<ExtendedPatternInfo> {
        let patternConfigPath = config.patternFamillies[0].patternsDir + "/"
            + config.patternFamillies[0].patterns[0].patternDir + "/"
            + config.patternFamillies[0].patterns[0].configFile;

        const patternInfoAsString = await this.fileReader.handleFileRead(patternConfigPath);

        return JSON.parse(patternInfoAsString);
    }

    private async getPatternFilesContent(config: Config, patternInfo: ExtendedPatternInfo): Promise<string[]> {

        let patternFilePaths: string[] = [...patternInfo.files.map(file => {
            let path = config.patternFamillies[0].patternsDir + "/"
                + config.patternFamillies[0].patterns[0].patternDir + "/"
                + file.defaultName;

            return path;
        })]

        const patternFilesContent: string[] = await this.fileReader.readMultipleFiles(patternFilePaths);

        return patternFilesContent;
    }



    public async loadInitialState(): Promise<AppState> {

        const appConfig = await this.getConfig();
        const patternInfo = await this.getPatternInfo(appConfig);
        const patternFilesContent = await this.getPatternFilesContent(appConfig, patternInfo);

        let appState: AppState = {
            appConfig: appConfig,

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
                        currentContent: patternFilesContent[index],
                    }

                    return loadedPatternFileInfo;
                })],

                params: patternInfo.params

            },
        }

        return appState;



        // fileReader.handleFileRead(configPath).then(appConfig => {

        //     let appConfigJSON: Config = JSON.parse(appConfig);

        //     let patternConfigPath = appConfigJSON.patternFamillies[0].patternsDir + "/"
        //         + appConfigJSON.patternFamillies[0].patterns[0].patternDir + "/"
        //         + appConfigJSON.patternFamillies[0].patterns[0].configFile;


        //     fileReader.handleFileRead(patternConfigPath).then(patternInfo => {

        //         let patternInfoJSON: ExtendedPatternInfo = JSON.parse(patternInfo);

        //         let patternFilePaths: string[] = [...patternInfoJSON.files.map(file => {
        //             let path = appConfigJSON.patternFamillies[0].patternsDir + "/"
        //                 + appConfigJSON.patternFamillies[0].patterns[0].patternDir + "/"
        //                 + file.defaultName;

        //             return path;
        //         })]

        //         fileReader.readMultipleFiles(patternFilePaths).then(patternFilesContent => {

        //             let appState: AppState = {
        //                 appConfig: appConfigJSON,

        //                 selectedPatternFamillyIndex: 0,
        //                 selectedPatternIndex: 0,
        //                 selectedTabIndex: 0,
        //                 isDrawerOpen: false,
        //                 isEditorReadOnly: true,

        //                 selectedPattern: {
        //                     name: patternInfoJSON.name,
        //                     files: [...patternInfoJSON.files.map((file, index) => {
        //                         let loadedPatternFileInfo: LoadedPatternFileInfo = {
        //                             sourceFile: file.defaultName,
        //                             defaultName: file.defaultName,
        //                             currentName: file.defaultName,
        //                             defaultContent: patternFilesContent[index],
        //                             currentContent: patternFilesContent[index],
        //                         }

        //                         return loadedPatternFileInfo;
        //                     })],

        //                     params: patternInfoJSON.params

        //                 },


        //             }

        //             return appState;
        //             //console.log(appState);
        //             //dispatch(setState(appState));
        //         })

        //     })

        // })



    }
}