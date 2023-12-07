import {Editor, Monaco} from "@monaco-editor/react";
import {Box, Tab, Tabs} from "@mui/material";
import {tabsClasses} from "@mui/material/Tabs";
import {editor} from "monaco-editor";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedTabIndex, updatePatternFile} from "../redux/AppStateSlice";
import {setIsChangesMade} from "../redux/UnsavedProgressSlice";
import {AppDispatch, RootState} from "../redux/store";

interface EditorPanelProps {
    setEditorParentRef: (editorRef: editor.IStandaloneCodeEditor | null) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ setEditorParentRef }) => {

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);
    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(setSelectedTabIndex(newValue));
    }

    const handleEditorChange = (value: string) => {

        if (!isEditorReadOnly) {
            dispatch(setIsChangesMade(true));
            dispatch(updatePatternFile({ newContent: value, fileIndex: selectedTabIndex }));
        }
    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;
        setEditorParentRef(editor);
    }

    return (
        <Box
            data-testid={"editor-panel-test-id"}
        >
            <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    height: "5svh",
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
                            data-testid={"editor-panel-tab-test-id-" + index}
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
                data-testid={'editor-test-id'}
                height="84svh"
                theme="vs-dark"
                defaultPath={selectedPattern.files[selectedTabIndex].defaultName}
                language={selectedPattern.language}
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