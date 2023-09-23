import { Box, Grid, List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";

const Main = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const files: { [key: string]: { files: Array<string> } } = {
    'singleton': {
      files: ["singleton.txt"],
    },
    'builder': {
      files: ["builder.txt", "director.txt"],
    },
  };

  const [choosenDesignPatternName, setChoosenDesignPatternName] = useState("singleton");

  let choosenDesignPattern = files[choosenDesignPatternName];
  const [currentSelectedTab, setCurrentSelectedTab] = useState(1);
  //let tmpEditor: React.ReactNode[] = [];
  const [tmpEditor, setTmpEditor] = useState<React.ReactNode[]>([]);

  const updateChoosenDesignPattern = () => {
    choosenDesignPattern = files[choosenDesignPatternName];
  }

  const updateEditorTabs = () => {
    //setTmpEditor([<CodeEditor path={choosenDesignPattern.files[0]} pattern={choosenDesignPatternName} />]);
    tmpEditor.length = 0;
    choosenDesignPattern.files.map((fileName, index) => {
      tmpEditor.push(<CodeEditor key={index} path={fileName} pattern={choosenDesignPatternName} />)
    });
  }

  useEffect(() => {
    updateEditorTabs();

  }, [choosenDesignPatternName])


  const handleListItemClick = (index: number) => {

    switch (index) {
      case 1: setChoosenDesignPatternName("singleton"); break;
      case 2: setChoosenDesignPatternName("builder"); break;
    }

    // updateChoosenDesignPattern();

    setSelectedIndex(index);
    setCurrentSelectedTab(1);

  };

  const handleTabClick = (index: number) => {
    setCurrentSelectedTab(index);
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
              selected={selectedIndex === 1}
              onClick={() => handleListItemClick(1)}
            >
              <ListItemText primary="Singleton" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={() => handleListItemClick(2)}
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
              {choosenDesignPattern.files.map((fileName, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={currentSelectedTab === index}
                    onClick={() => handleTabClick(index)}
                  >

                    <ListItemText primary={fileName} />
                  </ListItemButton>
                );
              })}

            </List>
            { tmpEditor[currentSelectedTab]}
            {/* {tmpEditor.map(currentEditorTab => {
              return(
                currentEditorTab
              );
            })} */}
            {/* //{tmpEditor[0]} */}





          </Box>



        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;