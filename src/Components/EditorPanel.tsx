import { Editor, Monaco } from "@monaco-editor/react";
import { Box, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import FileReader from "../utils/FileReader";
import { setSelectedFile, setSelectedTabIndex } from "../redux/AppStateSlice";
import { LoadedPatternFileInfo } from "../types";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";

interface EditorPanelProps {
    setEditorParentRef: (editorRef: editor.IStandaloneCodeEditor | null) => void;
  }

const EditorPanel:React.FC<EditorPanelProps> = ({setEditorParentRef}) => {

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const selectedFile = useSelector((state: RootState) => state.appState.selectedFile);
    const selectedTabIndex = useSelector((state: RootState) => state.appState.selectedTabIndex);

    const parameters = useSelector((state: RootState) => state.appState.parameters);

    const [editorValueArray, setEditorValueArray] = useState<string[]>([]);

    const fileReader = new FileReader();

    useEffect(() => {

        //let loadedPatternFile: LoadedPatternFileInfo = JSON.parse(JSON.stringify(selectedFile));
        fileReader.handleFileRead(selectedPattern.patternFilesDirectory + "/" + selectedFile.name)
            .then(fileContent => {
                //podmiana początkowych wartośći

                let loadedPatternFile: LoadedPatternFileInfo = {
                    name: selectedFile.name,
                    loaded: selectedFile.loaded,
                    content: fileContent
                }

                dispatch(setSelectedFile(loadedPatternFile));
            })


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

        fileReader.handleFileRead(selectedPattern.patternFilesDirectory + "/" + selectedPattern.files[index].name)
            .then(fileContent => {
                let newLoadedFile: LoadedPatternFileInfo = {
                    name: selectedPattern.files[index].name,
                    loaded: selectedPattern.files[index].loaded,
                    content: fileContent,
                }

                dispatch(setSelectedFile(newLoadedFile));
                dispatch(setSelectedTabIndex(index));
            })
    }

    const handleEditorChange = (value: string) => {

        editorValueArray[selectedTabIndex] = value;

    }

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
        editorRef.current = editor;
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
            />
        </Box>
    );

}

export default EditorPanel;