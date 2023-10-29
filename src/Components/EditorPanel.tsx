import { Editor, Monaco } from "@monaco-editor/react";
import { Box, Tab, Tabs } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import { editor } from "monaco-editor";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPattern, setSelectedTabIndex, updatePatternFile } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import FileReader from "../utils/FileReader";

interface EditorPanelProps {
    setEditorParentRef: (editorRef: editor.IStandaloneCodeEditor | null) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ setEditorParentRef }) => {

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);

    const fileReader = new FileReader();

    useEffect(() => {

        loadPatternFiles();

    }, [])

    const loadPatternFiles = () => {

        fileReader.getExtendedPatternInfo(selectedPattern).then(extendedPatternInfo => {
            dispatch(setSelectedPattern(extendedPatternInfo));
        })

    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(setSelectedTabIndex(newValue));

    }

    const handleEditorChange = (value: string) => {

        if (!isEditorReadOnly) {
            dispatch(updatePatternFile({ newContent: value, fileIndex: selectedTabIndex }));
        }
    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;

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
                defaultPath={selectedPattern.files[selectedTabIndex].defaultName}
                defaultLanguage={"java"}
                value={selectedPattern.files[selectedTabIndex].currentContent}
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