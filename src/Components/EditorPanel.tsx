import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Tab, Tabs } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPatternFiles, setSelectedTabIndex } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import FileReader from "../utils/FileReader";
import { LoadedPatternFileInfo } from "../types";

interface EditorPanelProps {
    setEditorParentRef: (editorRef: editor.IStandaloneCodeEditor | null) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ setEditorParentRef }) => {

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    //const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);


    const [editorTabsValueArray, setEditorTabsValueArray] = useState<string[]>([]);

    const fileReader = new FileReader();

    useEffect(() => {

        //loadFileToStateOnComponentMount();

        loadPatternFiles();

    }, [])

    useEffect(() => {
        loadEditorTabsValueArray();

    }, [selectedPattern])


    const loadPatternFiles = () => {

        let sourceFiles = selectedPattern.files.map(file => {
            return selectedPattern.patternFilesDirectory + "/" + file.sourceFile;
        })

        fileReader.readMultipleFiles(sourceFiles).then(filesContent => {
            let patternFilesWithContent = selectedPattern.files.map((file, index) => {
                let fileWithContent: LoadedPatternFileInfo = {
                    sourceFile: file.sourceFile,
                    defaultName: file.defaultName,
                    currentName: file.currentName,
                    defaultContent: filesContent[index],
                    currentContent: filesContent[index]
                }

                return fileWithContent;
            })

            dispatch(setSelectedPatternFiles(patternFilesWithContent));
        })



    }

    const loadFileToStateOnComponentMount = () => {
        //fileReader.loadFileToState(selectedPattern.patternFilesDirectory, selectedFile.defaultName);
    }


    const loadEditorTabsValueArray = () => {
        let tmpArray = new Array<string>(selectedPattern.files.length);

        selectedPattern.files.forEach((file, index) => {
            fileReader.handleFileRead(selectedPattern.patternFilesDirectory + "/" + file.defaultName)
                .then(fileContent => {
                    tmpArray[index] = fileContent;
                })
        })

        setEditorTabsValueArray(tmpArray);
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {

        // fileReader.loadFileToState(selectedPattern.patternFilesDirectory,
        //     selectedPattern.files[newValue].defaultName)
        dispatch(setSelectedTabIndex(newValue));
    }

    const handleEditorChange = (value: string) => {

        editorTabsValueArray[selectedTabIndex] = value;

    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;

        // fileReader.loadFileToStateAndReplaceParams(
        //     selectedPattern.patternFilesDirectory,
        //     selectedFile.defaultName,
        //     selectedPattern.params.textFieldParams
        // ).then(fileContentWithReplacedParams => {
        //     editor.setValue(fileContentWithReplacedParams);
        // })

        setEditorParentRef(editor);
    }

    return (
        <Box>
            <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    marginBottom: "2px",
                    backgroundColor: "primary.dark",
                    color: "#F7F1DB",
                    '.MuiTabs-indicator': {
                        backgroundColor: 'yellow',
                    },
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                {selectedPattern.files.map((file, index) => {
                    return (
                        <Tab
                            key={index}
                            label={file.currentName}

                            sx={{
                                textTransform: "none",
                                color: "primary.light",
                                backgroundColor: "primary.main",
                                border: '1px solid #5F5E58',
                                '&.Mui-selected': {
                                    color: "primary.contrastText"
                                },
                                '&:hover': {
                                    color: "primary.contrastText",
                                    backgroundColor: "action.hover",
                                },
                            }}
                        />
                    );
                })}

            </Tabs>

            <Editor
                height="90vh"
                theme="vs-dark"
                path={selectedPattern.files[selectedTabIndex].defaultName}
                defaultLanguage={"java"}
                value={selectedPattern.files[selectedTabIndex].currentContent}
                //defaultValue={selectedFile.content}
                onChange={(value) => handleEditorChange(value ?? "")}
                onMount={handleEditorDidMount}
                options={{
                    readOnly: isEditorReadOnly,
                }}
            />
        </Box>
    );

}

export default EditorPanel;