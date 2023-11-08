import { Box } from "@mui/material";
import UnsavedProgressDialog from "./UnsavedProgressDialog";
import { PatternFamillyInfo } from "../../types";

interface UnsavedProgressContainterProps{
    open: boolean,
    setOpen: (open: boolean) => void,
    handleYes: () => void,

}

export default function UnsavedProgressContainer(props: UnsavedProgressContainterProps){

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleNo = () => {
        handleClose();
    }


    return(
        <Box>
            <UnsavedProgressDialog
                open={props.open}
                handleClose={handleClose}
                handleYes={props.handleYes}
                handleNo={handleNo}
            />
            
        </Box>
    );
}