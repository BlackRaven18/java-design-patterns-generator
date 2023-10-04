import { Editor } from "@monaco-editor/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Grid, List, ListItemButton, ListItemText, Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import { Config, PatternFamillyInfo, PatternInfo } from "../types";
import CustomBackdrop from "./CustomBackdrop";
import DownloadButton from "./DownloadButton";

import AppConfigData from "../app_config.json";

import { Monaco } from "@monaco-editor/react";
import { editor } from 'monaco-editor';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedPatternFamillyIndex } from "../redux/AppStateSlice";


const Main = () => {

  const selectedPatternFamillyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamillyIndex);

  const [appConfig, setAppConfig] = useState<Config>({
    patternFamillies: []
  });


  const dispatch = useDispatch();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

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

    let config: Config = JSON.parse(JSON.stringify(AppConfigData));

    setSelectedPattern(config.patternFamillies[0].patterns[0]);
    setEditorLoadedFileName(config.patternFamillies[0].patterns[0].fileNames[0]);

    handleFileRead(config.patternFamillies[0].patterns[0].patternFilesDirectory + "/" + config.patternFamillies[0].patterns[0].fileNames[0]).then(fileContent => {
      setTmpEditorContent(fileContent);
    })


    setEditorValueArray(new Array<string>(config.patternFamillies[0].patterns[0].fileNames.length))
    setAppConfig(config);

    setIsLoading(false);


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

    dispatch(setSelectedPatternFamillyIndex(index));
    handlePatternChange(patternFamilly.patterns[0], 0);
  }

  const handlePatternChange = (pattern: PatternInfo, index: number) => {

    setIsLoading(true);

    handleFileRead(pattern.patternFilesDirectory + "/" + pattern.fileNames[0]).then(fileContent => {
      setSelectedPattern(pattern);
      setTmpEditorContent(fileContent);
      setSelectedPatternIndex(index);
      setSelectedTabIndex(0);
      setEditorLoadedFileName(pattern.fileNames[0]);
      setEditorValueArray(new Array<string>(pattern.fileNames.length))

      setIsLoading(false);
    })

  }

  const handleTabChange = (index: number) => {

    handleFileRead(selectedPattern.patternFilesDirectory + "/" + selectedPattern.fileNames[index])
      .then(fileContent => {
        setSelectedTabIndex(index);
        setEditorLoadedFileName(selectedPattern.fileNames[index]);
        setTmpEditorContent(fileContent);
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
    let tmp: string = tmpEditorContent.replace("$CLASSNAME$", event.target.value);
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
        <CustomBackdrop label={"Loading..."} />
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
          <List component="nav">

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

          </List>
          <DownloadButton editorValueArray={editorValueArray} selectedPattern={selectedPattern} />
          <Button onClick={() => getEditorValue()}>Show editor content</Button>

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