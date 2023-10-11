import { Editor, Monaco } from "@monaco-editor/react";
import { Box, List, ListItemButton, ListItemText, Stack } from "@mui/material";
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

        fileReader.loadFileToState(selectedPattern.patternFilesDirectory, selectedFile.name);

    }, [])

    useEffect(() => {
        loadEditorValueArray();

    }, [selectedPattern])


    const loadEditorValueArray = () => {
        let tmpArray = new Array<string>(selectedPattern.files.length);
        selectedPattern.files.map((file, index) => {
            fileReader.handleFileRead(selectedPattern.patternFilesDirectory + "/" + file.name)
                .then(fileContent => {
                    tmpArray[index] = fileContent;
                })
        })

        setEditorValueArray(tmpArray);
    }

    const handleTabChange = (index: number) => {

        fileReader.loadFileToState(selectedPattern.patternFilesDirectory, selectedPattern.files[index].name)
        dispatch(setSelectedTabIndex(index));
    }

    const handleEditorChange = (value: string) => {

        editorValueArray[selectedTabIndex] = value;

    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;

        fileReader.loadFileToStateAndReplaceParams(
            selectedPattern.patternFilesDirectory, selectedFile.name, selectedPattern.params
        ).then(fileContentWithReplacedParams => {
            editor.setValue(fileContentWithReplacedParams);
        })

        setEditorParentRef(editor);
    }

    return (
        <Box
            sx={{
                bgcolor: "#ffffff"
            }}
        >
            <List component={Stack} direction="row">
                {selectedPattern.files.map((file, index) => {
                    return (
                        <ListItemButton
                            key={index}
                            selected={selectedTabIndex === index}
                            onClick={() => handleTabChange(index)}
                        >

                            <ListItemText primary={file.name} />
                        </ListItemButton>
                    );
                })}

            </List>

            <Editor
                height="90vh"
                theme="vs-dark"
                path={selectedFile.name}
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