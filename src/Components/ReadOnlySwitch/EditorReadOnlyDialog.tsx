import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface EditorReadOnlyDialogProps {
    open: boolean,
    handleClose: () => void,
    handleYes: () => void,
    handleNo: () => void,

}

export default function EditorReadOnlyDialog(props: EditorReadOnlyDialogProps) {

    return (

        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Turn off editor read-only mode?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to turn off editor read-only mode?
                </DialogContentText>
                <DialogContentText>
                    You won't be able to use parameters to make changes in code anymore.
                </DialogContentText>
                <DialogContentText>
                    You will be able to make changes by yourself directly in the editor window.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleYes}>Yes</Button>
                <Button onClick={props.handleNo} autoFocus>No</Button>
            </DialogActions>
        </Dialog>

    );

}