import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));

export default StyledTab;