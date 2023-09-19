import { Box, Grid, List, ListItemButton, ListItemText, Tabs, Tab, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));


const Main = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const files: { [key: string]: { name: string; value: string } } = {
    'singleton.txt': {
      name: 'singleton.txt',
      value: "singletonecode"
    },
    'builder.txt': {
      name: 'builder.txt',
      value: "buildecode"
    },
  };
  const [fileName, setFileName] = useState("singleton.txt");
  const file = files[fileName];
  const [fileContent, setFileContent] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const handleFileRead = async () => {
    try {
      const response = await fetch(fileName);
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
    handleFileRead();

  }, [fileName])


  // const handleListItemClick = (
  //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //     index: number,
  //   ) => {
  //     setSelectedIndex(index);
  //   };

  const handleListItemClick = (index: number) => {

    switch (index) {
      case 1: setFileName("singleton.txt"); break;
      case 2: setFileName("builder.txt"); break;

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
              <StyledTab label="Workflows" />
              <StyledTab label="Datasets" />
              <StyledTab label="Connections" />
            </StyledTabs>

            <Divider />

            <CustomTabPanel value={value} index={0}>
              <CodeEditor path={file.name} content={fileContent} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CodeEditor path={file.name} content={fileContent} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CodeEditor path={file.name} content={fileContent} />
            </CustomTabPanel>
          </Box>

        </Grid>
      </Grid>




    </Box>
  )
}



export default Main;