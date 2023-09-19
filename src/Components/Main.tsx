import { Box, Grid, List, ListItemButton, ListItemText, Tabs, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";

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
                padding: "10px",
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
                    <Tabs>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                    </Tabs>

                    <CustomTabPanel value={value} index={0}>
                        <CodeEditor path={file.name} content={fileContent} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <CodeEditor path={file.name} content={fileContent} />
                    </CustomTabPanel>



                </Grid>
            </Grid>




        </Box>
    )
}



export default Main;