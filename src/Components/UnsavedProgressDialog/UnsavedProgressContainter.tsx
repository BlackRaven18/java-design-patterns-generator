import { Box } from "@mui/material";
import UnsavedProgressDialog from "./UnsavedProgressDialog";
import { PatternFamillyInfo } from "../../types";

interface UnsavedProgressContainerProps{
    open: boolean,
    setOpen: (open: boolean) => void,
    handleYes: () => void,

}

export default function UnsavedProgressContainer(props: UnsavedProgressContainerProps){

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleNo = () => {
        handleClose();
    }


    return(
        <Box data-testid={'unsaved-progress-container-test-id'}>
            <UnsavedProgressDialog
                open={props.open}
                handleClose={handleClose}
                handleYes={props.handleYes}
                handleNo={handleNo}
            />

        </Box>
    );
}