import { Editor } from "@monaco-editor/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Grid, List, ListItemButton, ListItemText, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CustomBackdrop from "./CustomBackdrop";
import DownloadButton from "./DownloadButton";

import AppConfigData from "./../app_config.json";

import { editor } from 'monaco-editor';
import { Monaco } from "@monaco-editor/react";

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
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPattern, setSelectedPattern] = useState<PatternInfo>({
    patternName: "",
    patternFilesDirectory: "",
    fileNames: []
  })
  const [editorLoadedFileName, setEditorLoadedFileName] = useState('');
  const [tmpEditorContent, setTmpEditorContent] = useState('');
  const [editorValueArray, setEditorValueArray] = useState<string[]>([]);




  useEffect(() => {

    setIsLoading(true)

    let tmp: Config = JSON.parse(JSON.stringify(AppConfigData));

    setSelectedPattern(tmp.patternFamillies[0].patterns[0]);
    setEditorLoadedFileName(tmp.patternFamillies[0].patterns[0].fileNames[0]);
    getFileContent(handleFileRead(tmp.patternFamillies[0].patterns[0].patternFilesDirectory + "/" + tmp.patternFamillies[0].patterns[0].fileNames[0]));

    //------------------------
    handleFileRead(tmp.patternFamillies[0].patterns[0].patternFilesDirectory + "/" + tmp.patternFamillies[0].patterns[0].fileNames[0]).then(fileContent => {
      parseFileContent(fileContent);
    })
    //------------------------


    setEditorValueArray(new Array<string>(tmp.patternFamillies[0].patterns[0].fileNames.length))
    setAppConfig(tmp);

    setIsLoading(false);

  }, [])

  const parseFileContent = (fileContent: string) => {
    let tmp: string = fileContent.replace("$CLASSNAME$", "Singletonnn");
    console.log(tmp);
  }

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

    setIsLoading(true);
    handleFileRead(pattern.patternFilesDirectory + "/" + pattern.fileNames[0]).then(fileContent => {
      setTmpEditorContent(fileContent);
      setSelectedPatternIndex(index);
      setSelectedTabIndex(0);
      setSelectedPattern(pattern);
      setEditorLoadedFileName(pattern.fileNames[0]);
      setEditorValueArray(new Array<string>(pattern.fileNames.length))
      setIsLoading(false);
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

  const handleEditorChange = (value: string) => {

    editorValueArray[selectedTabIndex] = value;

  }

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor;
  }

  const getEditorValue = () => {
    alert(editorRef?.current?.getValue() ?? "nothing")
  }

  const handleParamsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //let tmpEditorContent = editorRef?.current?.getValue() ?? "";
    let tmp:string = tmpEditorContent.replace("$CLASSNAME$", event.target.value);
    editorRef?.current?.setValue(tmp);

    

  }

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "#3FFF90",
        height: "100%",

      }}
    >
      {isLoading ? (
        <CustomBackdrop label={"Ładowanie..."} />
      ) : (<></>)}

      <Grid
        container
        direction="row"
      >
        <Grid
          item
          xs={2}
          sx={{
            minWidth: 150
          }}
        >
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
          <DownloadButton editorValueArray={editorValueArray} selectedPattern={selectedPattern} />
          <Button onClick={() => getEditorValue()}>Zobacz zawartość edytora</Button>

        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: "#F4D03F"
          }}
        >
          <Stack>
            <TextField
              id="class-name"
              label="Singleton class name"
              variant="outlined"
              onChange={(event) => handleParamsChange(event)}
              // => {handleParamsChange(value)}}
            />
          </Stack>
        </Grid>
        <Grid item xs={8}>
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
            height="90vh"
            theme="vs-dark"
            path={editorLoadedFileName}
            defaultLanguage={"java"}
            defaultValue={tmpEditorContent}
            onChange={(value) => handleEditorChange(value ?? "")}
            onMount={handleEditorDidMount}
          />




        </Grid>
      </Grid>
    </Box>
  )
}



export default Main;