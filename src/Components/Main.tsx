import React, { ReactEventHandler } from "react";
import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Box, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";


const Main = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const files: { [key: string]: { name: string; value: string } } = {
        'singleton.java' : {
            name: 'singleton.java',
            value: "singletonecode"
        },
        'builder.java': {
            name: 'builder.java',
            value: "buildecode"
        },
    };
    const [fileName, setFileName] = useState("singleton.java");
    const file = files[fileName];


    // const handleListItemClick = (
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     index: number,
    //   ) => {
    //     setSelectedIndex(index);
    //   };

    const handleListItemClick = (index: number) => {

        switch(index){
            case 1: setFileName("singleton.java"); break;
            case 2: setFileName("builder.java"); break;
        
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
                            onClick={(event) => handleListItemClick(1)}
                        >
                            <ListItemText primary="Singleton" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(2)}
                        >
                            <ListItemText primary="Builder" />
                        </ListItemButton>
                    </List>}

                </Grid>
                <Grid item xs={10}>
                
                    <CodeEditor path={file.name} content={file.value}/>

                </Grid>
            </Grid>




        </Box>
    )
}

export default Main;