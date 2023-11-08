import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PatternFamillyInfo } from "../../types";

interface UnsavedProgressDialogProps {
    open: boolean,
    handleClose: () => void,
    handleYes: () => void,
    handleNo: () => void,

}


export default function UnsavedProgressDialog(props: UnsavedProgressDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Change pattern?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to change the pattern?
                </DialogContentText>
                <DialogContentText>
                    You have made some changes which will be lost when you change the pattern.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleYes}>Yes</Button>
                <Button onClick={props.handleNo} autoFocus>No</Button>
            </DialogActions>
        </Dialog>

    )
}