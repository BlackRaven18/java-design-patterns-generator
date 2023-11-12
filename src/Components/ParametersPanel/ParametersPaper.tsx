import { Paper, Stack, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

interface ParametersPaperProps {
    header: string,
    children: React.ReactNode,
}

export default function ParametersPaper(props: ParametersPaperProps) {

    return (
        <Paper
            elevation={2}
            square={false}
            sx={{
                color: "secondary.contrastText",
                backgroundColor: "secondary.light"
            }}
        >

            <Stack
                direction={"row"}
                spacing={"15px"}
                marginTop={"20px"}
                padding={"10px"}
                paddingTop={"20px"}
            >
                <SettingsIcon />
                <Typography fontSize={18}>
                    {props.header}
                </Typography>


            </Stack>

            <Stack
                direction={"column"}
                marginTop={"5px"}
                padding={"15px"}
                spacing={"20px"}
                
            >
                {props.children}
            </Stack>


        </Paper>
    );
}
