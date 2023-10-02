import { Editor, OnMount } from "@monaco-editor/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Grid, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import * as monaco_editor from 'monaco-editor';
import { editor } from 'monaco-editor';

import AppConfigData from "./../app_config.json";
import DownloadButton from "./DownloadButton";


interface Config {
  patternFamillies: PatternFamillyInfo[]
}

interface PatternFamillyInfo {
  patternFamillyName: string,
  patterns: PatternInfo[]

}

interface PatternInfo {
  patternName: string,
  patternFilesDirectory: string,
  fileNames: string[]
}


const Main = () => {

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [appConfig, setAppConfig] = useState<Config>({
    patternFamillies: []
  });

  const [selectedPatternFamillyIndex, setSelectedPatternFamillyIndex] = useState(0);
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [open, setOpen] = useState(true);

  const [selectedPattern, setSelectedPattern] = useState<PatternInfo>({
    patternName: "",
    patternFilesDirectory: "",
    fileNames: []
  })
  const [editorLoadedFileName, setEditorLoadedFileName] = useState('');
  const [tmpEditorContent, setTmpEditorContent] = useState('');
  const [editorValueArray, setEditorValueArray] = useState<string[]>([]);


  useEffect(() => {

    let tmp: Config = JSON.parse(JSON.stringify(AppConfigData));

    setSelectedPattern(tmp.patternFamillies[0].patterns[0]);
    setEditorLoadedFileName(tmp.patternFamillies[0].patterns[0].fileNames[0]);
    getFileContent(handleFileRead(tmp.patternFamillies[0].patterns[0].patternFilesDirectory + "/" + tmp.patternFamillies[0].patterns[0].fileNames[0]));

    setEditorValueArray(new Array<string>(tmp.patternFamillies[0].patterns[0].fileNames.length))
    setAppConfig(tmp);

  }, [])

  useEffect(() => {
    loadEditorValueArray();

  }, [selectedPattern])

  const loadEditorValueArray = () => {
    let tmpArray = new Array<string>(selectedPattern.fileNames.length);
    selectedPattern.fileNames.map((fileName, index) => {
      handleFileRead(selectedPattern.patternFilesDirectory + "/" + fileName)
        .then(fileContent => {
          tmpArray[index] = fileContent;
        })
    })

    setEditorValueArray(tmpArray);
  }

  const handlePatterFamillyChange = (patternFamilly: PatternFamillyInfo, index: number) => {
    setSelectedPatternFamillyIndex(index);
    handlePatternChange(patternFamilly.patterns[0], 0);
    setOpen(!open);
  }

  const handlePatternChange = (pattern: PatternInfo, index: number) => {

    handleFileRead(pattern.patternFilesDirectory + "/" + pattern.fileNames[0]).then(fileContent => {
      setTmpEditorContent(fileContent);
      setSelectedPatternIndex(index);
      setSelectedTabIndex(0);
      setSelectedPattern(pattern);
      setEditorLoadedFileName(pattern.fileNames[0]);
      setEditorValueArray(new Array<string>(pattern.fileNames.length))
    })

  }

  const handleTabChange = (index: number) => {

    handleFileRead(selectedPattern.patternFilesDirectory + "/" + selectedPattern.fileNames[index])
      .then(fileContent => {
        setTmpEditorContent(fileContent);
        setSelectedTabIndex(index);
        setEditorLoadedFileName(selectedPattern.fileNames[index]);
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

      if (content.includes("<!DOCTYPE html>")) {
        content = "//No files found...";
        throw new Error("File is missing!");
      }

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

  function showValue() {
    let tmp: string = "";

    editorValueArray.map(value => {
      tmp += value
    })

    alert(tmp);
  }

  const handleEditorChange = (value: string) => {

    editorValueArray[selectedTabIndex] = value;

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

            {appConfig.patternFamillies.map((patternFamilly, index) => {
              return (
                <Box key={index}>
                  <ListItemButton
                    sx={{
                      backgroundColor: "#2ECC71",
                      '&.Mui-selected': {
                        backgroundColor: '#58D68D',
                      },
                    }}
                    key={index}
                    selected={selectedPatternFamillyIndex === index}
                    onClick={() => handlePatterFamillyChange(patternFamilly, index)}
                  >
                    <ListItemText primary={patternFamilly.patternFamillyName} />
                    {selectedPatternFamillyIndex === index ? <ExpandLess /> : <ExpandMore />}

                  </ListItemButton>


                  <Collapse in={selectedPatternFamillyIndex === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {patternFamilly.patterns.map((pattern, index) => {
                        return (
                          <ListItemButton
                            key={index}
                            sx={{
                              pl: 4,
                              '&.Mui-selected': {
                                backgroundColor: '#82E0AA ',
                              },
                            }}
                            selected={selectedPatternIndex === index}
                            onClick={() => handlePatternChange(pattern, index)}
                          >
                            <ListItemText primary={pattern.patternName} />
                          </ListItemButton>
                        );
                      })}

                    </List>
                  </Collapse>

                </Box>

              );
            })}

          </List>}
          <DownloadButton />
          <button onClick={showValue}>Zobacz zawartosc</button>

        </Grid>
        <Grid item xs={10}>
          <Box sx={{
            // bgcolor: '#2e1534',
            bgcolor: "#ffffff"
          }}>

            <List component={Stack} direction="row">
              {selectedPattern.fileNames.map((fileName, index) => {
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
            onChange={(value) => handleEditorChange(value ?? "")}
          />




        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;