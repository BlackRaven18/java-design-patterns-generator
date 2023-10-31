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
            anchor="left"
            open={isDrawerOpen}
            onClose={() => {dispatch(setIsDrawerOpen(false))}}
            PaperProps={{
                sx: {
                    backgroundColor: "primary.light"
                }
            }}
           
        >
            <Box 
            p={2} 
            width={props.width}
            //height="100%" 
            textAlign='center' 
            role='presentation'
            sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.light"
            }}
            >
                <Typography variant="h6" component='div'>
                    {props.headerLabel}
                </Typography>
            <Divider sx={{backgroundColor: "primary.contrastText"}}/>

            {props.children}
                
            </Box>

        </Drawer>
    );
}