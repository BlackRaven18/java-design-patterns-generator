import { Editor } from "@monaco-editor/react";
import { Box, Grid, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface Config {
  patternFamillies: PatternFamillyInfo[]
}

interface PatternFamillyInfo {
  patternFamillyName: string,
  patterns: PatternInfo[]

}

interface PatternInfo {
  patternName: string,
  filesName: string[]
}


const Main = () => {

  const filesTmp: Config = {
    patternFamillies: [
      {
        patternFamillyName: "Creational",
        patterns: [
          {
            patternName: "Singleton",
            filesName: ["singleton.txt"]
          },
          {
            patternName: "Builder",
            filesName: ["builder.txt", "director.txt"]
          }
        ]
      },
      {
        patternFamillyName: "Structural",
        patterns: [
          {
            patternName: "S1",
            filesName: []
          },
          {
            patternName: "S2",
            filesName: []
          }
        ]
      },
      {
        patternFamillyName: "Behavioral",
        patterns: [
          {
            patternName: "B1",
            filesName: []
          },
          {
            patternName: "B2",
            filesName: []
          }
        ]
      },

    ]
  }

  const files: { [key: string]: { filesNames: string[] } } = {
    'singleton': {
      filesNames: ["singleton.txt"],
    },
    'builder': {
      filesNames: ["builder.txt", "director.txt"],
    },
  };


  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [selectedPattern, setSelectedPattern] = useState(files['singleton']);
  const [editorLoadedFileName, setEditorLoadedFileName] = useState('singleton.txt');
  const [tmpEditorContent, setTmpEditorContent] = useState('bbb');


  useEffect(() => {
    getFileContent(handleFileRead(editorLoadedFileName));
  }, [])


  const handlePatternChange = (patternIndex: number) => {

    let selectedPattern: string = "";
    switch (patternIndex) {
      case 0: selectedPattern = 'singleton'; break;
      case 1: selectedPattern = 'builder'; break;
      default: break;
    }

    handleFileRead(files[selectedPattern].filesNames[0]).then(fileContent => {
      setTmpEditorContent(fileContent);
      setSelectedPatternIndex(patternIndex);
      setSelectedPattern(files[selectedPattern]);
      setEditorLoadedFileName(files[selectedPattern].filesNames[0]);
    })

  }

  const handleTabChange = (index: number) => {

    handleFileRead(selectedPattern.filesNames[index]).then(fileContent => {
      setTmpEditorContent(fileContent);
      setSelectedTabIndex(index);
      setEditorLoadedFileName(selectedPattern.filesNames[index]);
    })

  }

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

  const getFileContent = (fileReadResponse: Promise<string>) => {

    fileReadResponse.then(content => {
      setTmpEditorContent(content);

    })

  }

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "#3FFF90",
      }}
    >
      <Grid
        container
        direction="row"

      >
        <Grid item xs={2}>
          {<List component="nav">
            <ListItemButton
              selected={selectedPatternIndex === 0}
              onClick={() => handlePatternChange(0)}
            >
              <ListItemText primary="Singleton" />

            </ListItemButton>
            <ListItemButton
              selected={selectedPatternIndex === 1}
              onClick={() => handlePatternChange(1)}
            >
              <ListItemText primary="Builder" />
            </ListItemButton>
          </List>}

        </Grid>
        <Grid item xs={10}>
          <Box sx={{
            // bgcolor: '#2e1534',
            bgcolor: "#ffffff"
          }}>

            <List component={Stack} direction="row">
              {selectedPattern.filesNames.map((fileName, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedTabIndex === index}
                    onClick={() => handleTabChange(index)}
                  >

                    <ListItemText primary={fileName} />
                  </ListItemButton>
                );
              })}

            </List>

          </Box>
          <Editor
            height="80vh"
            theme="vs-dark"
            path={editorLoadedFileName}
            defaultLanguage={"java"}
            defaultValue={tmpEditorContent}
          />




        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;