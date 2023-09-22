import { Box, Grid, List, ListItemButton, ListItemText, Tabs, Tab, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import StyledTabs from "./StyledTabs";
import StyledTab from "./StyledTab";
import CustomTabPanel from "./CustomTabPanel";

const Main = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const files: { [key: string]: {files: Array<string> } } = {
    'singleton': {
      files:["singleton.txt"]
    },
    'builder': {
      files:["builder.txt", "director.txt"]
    },
  };

  const [choosenDesignPatternName, setChoosenDesignPatternName] = useState("singleton");
  const choosenDesignPattern = files[choosenDesignPatternName];
  const [fileContent, setFileContent] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const handleFileRead = async (filename: string) => {
    try {
      const response = await fetch(filename);
      console.log(response);
      if (!response.ok) {
        throw new Error('Nie udało się pobrać pliku.');
      }

      const content = await response.text();
      console.log(content);
      setFileContent(content);

    } catch (error) {
      console.error('Błąd podczas pobierania pliku:', error);
    }
  }


  useEffect(() => {
    handleFileRead(choosenDesignPattern.files[0]);

  }, [choosenDesignPattern])


  // const handleListItemClick = (
  //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //     index: number,
  //   ) => {
  //     setSelectedIndex(index);
  //   };

  const handleListItemClick = (index: number) => {

    switch (index) {
      case 1: setChoosenDesignPatternName("singleton"); break;
      case 2: setChoosenDesignPatternName("builder"); break;

    }
    setSelectedIndex(index);
  };



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
          {<List component="nav" aria-label="secondary mailbox folder">
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
            bgcolor: '#2e1534',
          }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              {choosenDesignPattern.files.map(tabName => {
                return(
                  <StyledTab label={tabName} />
                );
              })}
              {/* <StyledTab label="Workflows" />
              <StyledTab label="Datasets" />
              <StyledTab label="Connections" /> */}
            </StyledTabs>

            <Divider />

            <CustomTabPanel value={value} index={0}>
              <CodeEditor path={choosenDesignPattern.files[0]} content={fileContent} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
              <CodeEditor path={file.name} content={"ujauja"} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CodeEditor path={file.name} content={"hehehe"} />
            </CustomTabPanel> */}
          </Box>

        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;