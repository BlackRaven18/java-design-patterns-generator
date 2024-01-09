import { Box } from "@mui/material";
import EditorReadOnlySwitch from "./EditorReadOnlySwitch";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditorReadOnly } from "../../redux/AppStateSlice";
import { AppDispatch, RootState } from "../../redux/store";
import EditorReadOnlyDialog from "./EditorReadOnlyDialog";
import { useState } from "react";


export default function EditorReadOnlyContainer(){

    const dispatch = useDispatch<AppDispatch>();

    const isEditorReadOnly = useSelector((state: RootState) => state.appState.isEditorReadOnly);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditorReadOnlyChange = () => {
        setIsDialogOpen(true);
        //dispatch(setIsEditorReadOnly(!isEditorReadOnly));
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    }

    const handleYes = () => {
        handleDialogClose();
        dispatch(setIsEditorReadOnly(!isEditorReadOnly));
    }

    const handleNo = () => {
        handleDialogClose();
    }

    return(
        <Box data-testid={"editor-read-only-container-test-id"}>

        <EditorReadOnlySwitch
            isEditorReadOnly={isEditorReadOnly}
            handleEditorReadOnlyChange={handleEditorReadOnlyChange}
        />

        <EditorReadOnlyDialog
            open={isDialogOpen}
            handleClose={handleDialogClose}
            handleYes={handleYes}
            handleNo={handleNo}
        />
            
        </Box>
    );
}