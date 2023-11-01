import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, FormControlLabel, Switch } from "@mui/material";

interface EditorReadOnlyDialogProps {
    open: boolean,
    handleClose: () => void,

}

export default function EditorReadOnlyDialog(props: EditorReadOnlyDialogProps) {

    return (

        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Disagree</Button>
                <Button onClick={props.handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>

    );

}