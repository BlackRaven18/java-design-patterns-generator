import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { setIsDrawerOpen } from "../redux/AppStateSlice";

export default function TopBar() {

    const dispatch = useDispatch<AppDispatch>();

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);

    const handleDrawerOpen = () => {
        dispatch(setIsDrawerOpen(true))
    }

    return (
        <Box
        >

            <Toolbar
                sx={{
                    backgroundColor: "primary.main",
                    color: 'primary.contrastText'
                }}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6" component="div" sx={{ flexGrow: 1 }}
                >
                    {selectedPattern.name}</Typography>
            </Toolbar>

        </Box>
    );
}

