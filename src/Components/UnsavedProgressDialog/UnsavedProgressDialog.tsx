import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface UnsavedProgressDialogProps {
    open: boolean,
    handleClose: () => void,
    handleYes: () => void,
    handleNo: () => void,
}

export default function UnsavedProgressDialog(props: UnsavedProgressDialogProps) {
    return (
        <Dialog
            data-testid={'unsaved-progress-dialog-test-id'}
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
                <Button
                    data-testid={'unsaved-progress-dialog-button-no-test-id'}
                    onClick={props.handleNo}
                    autoFocus>No</Button>
            </DialogActions>
        </Dialog>

    )
}