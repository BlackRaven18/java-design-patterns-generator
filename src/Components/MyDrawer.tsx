import {Box, Drawer, IconButton, Typography} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react";
import { setIsDrawerOpen } from "../redux/AppStateSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function MyDrawer(){

    const dispatch = useDispatch<AppDispatch>();

    const isDrawerOpen = useSelector((state: RootState) => state.appState.isDrawerOpen);


    return(
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => {dispatch(setIsDrawerOpen(false))}}
        >
            <Box p={2} width='250px' textAlign='center' role='presentation'>
                <Typography variant="h6" component='div'>
                    Drawer menu
                </Typography>
                
            </Box>

        </Drawer>
    );
}