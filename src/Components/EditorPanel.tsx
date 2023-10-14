import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Tab, Tabs } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTabIndex } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import FileReader from "../utils/FileReader";

interface EditorPanelProps {
    setEditorParentRef: (editorRef: editor.IStandaloneCodeEditor | null) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ setEditorParentRef }) => {

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);


    const [editorValueArray, setEditorValueArray] = useState<string[]>([]);

    const fileReader = new FileReader();

    useEffect(() => {

        fileReader.loadFileToState(selectedPattern.patternFilesDirectory, selectedFile.defaultName);

    }, [])

    useEffect(() => {
        loadEditorValueArray();

    }, [selectedPattern])


    const loadEditorValueArray = () => {
        let tmpArray = new Array<string>(selectedPattern.files.length);
        selectedPattern.files.map((file, index) => {
            fileReader.handleFileRead(selectedPattern.patternFilesDirectory + "/" + file.defaultName)
                .then(fileContent => {
                    tmpArray[index] = fileContent;
                })
        })

        setEditorValueArray(tmpArray);
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {

        fileReader.loadFileToState(selectedPattern.patternFilesDirectory,
            selectedPattern.files[newValue].defaultName)
        dispatch(setSelectedTabIndex(newValue));
    }

    const handleEditorChange = (value: string) => {

        editorValueArray[selectedTabIndex] = value;

    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;

        fileReader.loadFileToStateAndReplaceParams(
            selectedPattern.patternFilesDirectory, selectedFile.defaultName, selectedPattern.params
        ).then(fileContentWithReplacedParams => {
            editor.setValue(fileContentWithReplacedParams);
        })

        setEditorParentRef(editor);
    }

    return (
        <Box
            sx={{
                bgcolor: "#3F3F3C",
            }}
        >
            <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    marginBottom: "2px",
                    backgroundColor: "#121302",
                    color: "#F7F1DB",
                    '.MuiTabs-indicator': {
                        backgroundColor: 'yellow', // Zmień kolor podkreślenia na żółty
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
                            label={file.defaultName}

                            sx={{
                                textTransform: "none",
                                color: "#F7F1DB",
                                backgroundColor: "#37382A",
                                border: '1px solid #5F5E58',
                                '&.Mui-selected': {
                                    backgroundColor: "#857F6A",
                                    color: "#F7F1DB"
                                    //fontWeight: theme.typography.fontWeightMedium,
                                },
                            }}
                        />
                    );
                })}

            </Tabs>

            <Editor
                height="90vh"
                theme="vs-dark"
                path={selectedFile.defaultName}
                defaultLanguage={"java"}
                defaultValue={selectedFile.content}
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