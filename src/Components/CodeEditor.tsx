import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Box } from "@mui/material";

interface CodeEditorProps {
    path: string,
    pattern: string,
}


const CodeEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {

    const [content, setContent] = useState("");

    const handleFileRead = async (filename: string) => {

        let content = "";
        try {
          const response = await fetch(filename);
          if (!response.ok) {
            throw new Error('Nie udało się pobrać pliku.');
          }
    
          content = await response.text();
    
        } catch (error) {
          console.error('Błąd podczas pobierania pliku:', error);
        } finally {
          return content;
        }
      }

    useEffect(() => {
        setEditorContent();
        console.log(props.pattern);

    }, [props.pattern])

    const setEditorContent = () => {
        handleFileRead(props.path).then(fileContent => {
            setContent(fileContent);
        })
    }

    function handleEditorChange(value: string | undefined) {
        value? setContent(value) : setContent("");
        
    }


    return (
        <Box
            sx={{
                //marginLeft: "-15px",
                //marginTop: "-20px"
            }}
        >
            <Editor
                height="90vh"
                width="80vw"
                defaultLanguage="java"
                path={props.path}
                value={content}
                theme='vs-dark'
                options={{
                    fontSize: 20,

                }}
                onChange={handleEditorChange}

            />


        </Box>
    );
}

export default CodeEditor;