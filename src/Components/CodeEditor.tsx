import React from "react";
import { Editor } from "@monaco-editor/react";
import { Box } from "@mui/material";

interface CodeEditorProps{
    path: string,
    content: string
}


const CodeEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {


    return(
        <Box
        sx={{
            marginLeft: "-15px",
            marginTop: "-20px"
        }}
        >
            <Editor
                 height="90vh"
                 width="80vw"
                 defaultLanguage="java"
                 path={props.path}
                 value={props.content}
                 theme='vs-dark'
                 options={{
                    fontSize: 20,
                    
                 }}
                
            />


        </Box>
    );
}

export default CodeEditor;