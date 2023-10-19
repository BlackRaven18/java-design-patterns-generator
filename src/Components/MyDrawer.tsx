import { Box, Divider, Drawer, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDrawerOpen } from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";

interface MyDrawerProps{
    headerLabel: string,
    width: string,
    children: ReactNode;
}

export default function MyDrawer(props: MyDrawerProps){

    const dispatch = useDispatch<AppDispatch>();

    const isDrawerOpen = useSelector((state: RootState) => state.appState.isDrawerOpen);


    return(
        <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => {dispatch(setIsDrawerOpen(false))}}
        >
            <Box p={2} width={props.width} textAlign='center' role='presentation'>
                <Typography variant="h6" component='div'>
                    {props.headerLabel}
                </Typography>
            <Divider/>

            {props.children}
                
            </Box>

        </Drawer>
    );
}