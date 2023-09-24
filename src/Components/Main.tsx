import { Box, Grid, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";

const Main = () => {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(1);

  const files: { [key: string]: { files: Array<string> } } = {
    'singleton': {
      files: ["singleton.txt"],
    },
    'builder': {
      files: ["builder.txt", "director.txt"],
    },
  };

  const [selectedPattern, setSelectedPattern] = useState(files['singleton']);
  const [editorTabs, setEditorTabs] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    loadEditorTabs();
  }, [selectedPatternIndex])

  const loadEditorTabs = () => {
    editorTabs.length = 0;
    //setEditorTabs([]);

    let tabs: React.ReactNode[] = [];

    selectedPattern.files.map((pathToFile, index) => {
      tabs.push(<CodeEditor key={index} pathToSourceFile={pathToFile} />)
    })

    setEditorTabs(tabs);

  }


  const handlePatternChange = (patternIndex: number) => {

    switch (patternIndex) {
      case 1: setSelectedPattern(files['singleton']); break;
      case 2: setSelectedPattern(files['builder']); break;
      default: break;
    }


    setSelectedPatternIndex(patternIndex);

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
              selected={selectedPatternIndex === 1}
              onClick={() => handlePatternChange(1)}
            >
              <ListItemText primary="Singleton" />

            </ListItemButton>
            <ListItemButton
              selected={selectedPatternIndex === 2}
              onClick={() => handlePatternChange(2)}
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

            </List>

          </Box>
          {editorTabs.map(editorTab => {
            return (
              editorTab
            );
          })}



        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;