
import { LoadedPatternFileInfo, NewAppState, NewExtendedPatternInfo, NewPatternInfo } from "../types";
import FileReader from "./FileReader";

export default class InitialStateLoader {

    public loadInitialState() {

        const fileReader = new FileReader();

        let configPath = "app_config.json";

        fileReader.handleFileRead(configPath).then(appConfig => {

            let appConfigJSON = JSON.parse(appConfig);

            let patternConfigPath = appConfigJSON.patternFamillies[0].patternsDir + "/"
                + appConfigJSON.patternFamillies[0].patterns[0].patternDir + "/"
                + appConfigJSON.patternFamillies[0].patterns[0].configFile;


            fileReader.handleFileRead(patternConfigPath).then(patternInfo => {

                let patternInfoJSON: NewExtendedPatternInfo = JSON.parse(patternInfo);

                let patternFilePaths: string[] = [...patternInfoJSON.files.map(file => {
                    let path = appConfigJSON.patternFamillies[0].patternsDir + "/"
                        + appConfigJSON.patternFamillies[0].patterns[0].patternDir + "/"
                        + file.defaultName;

                    return path;
                })]

                fileReader.readMultipleFiles(patternFilePaths).then(patternFilesContent => {

                    let appState: NewAppState = {
                        appConfig: appConfigJSON,

                        selectedPatternFamillyIndex: 0,
                        selectedPatternIndex: 0,
                        selectedTabIndex: 0,
                        isDrawerOpen: false,
                        isEditorReadOnly: true,

                        selectedPattern: {
                            name: patternInfoJSON.name,
                            files: [...patternInfoJSON.files.map((file, index) => {
                                let loadedPatternFileInfo: LoadedPatternFileInfo = {
                                    sourceFile: file.defaultName,
                                    defaultName: file.defaultName,
                                    currentName: file.defaultName,
                                    defaultContent: patternFilesContent[index],
                                    currentContent: patternFilesContent[index],
                                }

                                return loadedPatternFileInfo;
                            })],

                            params: patternInfoJSON.params

                        },


                    }

                    console.log(appState);
                })

            })

        })



    }
}