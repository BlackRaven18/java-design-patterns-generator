import React from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps{
    path: string,
    content: string
}


const CodeEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {


    return(
        <div>
            <Editor
                 height="90vh"
                 width="80vw"
                 defaultLanguage="java"
                 path={props.path}
                 value={props.content}
                 theme='vs-dark'
                 options={{
                    fontSize: 20
                 }}
                
            />


        </div>
    );
}

export default CodeEditor;