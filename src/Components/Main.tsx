import React, { ReactEventHandler, useEffect } from "react";
import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Box, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { debug } from "console";


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

                    <CodeEditor path={file.name} content={fileContent} />

                </Grid>
            </Grid>




        </Box>
    )
}

export default Main;