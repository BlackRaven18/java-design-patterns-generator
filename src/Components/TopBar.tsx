import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar(){

    const selectedPattern = useSelector((state: RootState) => state.appState.selectedPattern);
    const idDrawerOpened = useSelector((state: RootState) => state.appState.isDrawerOpen);

    const handleDrawerOpen = () => {

    }

    return (
        <Box
        >

            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                    sx={{ ...(idDrawerOpened && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6" component="div" sx={{ flexGrow: 1 }}
                >
                    {selectedPattern.patternName}</Typography>
            </Toolbar>

        </Box>
    );
}

