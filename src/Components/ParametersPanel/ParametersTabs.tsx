import { Box, Tab, Tabs, Theme, tabsClasses, useTheme } from "@mui/material";
import styled from "@mui/styled-engine";
import React, { useEffect, useState } from "react";
import ParametersAccordion from "./ParametersAccordion";
import ParametersPaper from "./ParametersPaper";


interface ParametersTabsProps {
    children: React.ReactNode[],
    selectedTabIndex: number,
    setSelectedTabIndex: (index: number) => void,
    globalParamsNumber: number,
    localParamsNumber: number
}

const StyledTab = styled(Tab)<{ theme: Theme }>(({ theme }) => ({
    textTransform: "none",
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.light,
    borderWidth: '1px',
    borderColor: theme.palette.secondary.dark,
    borderStyle: 'solid',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default function ParametersTabs(props: ParametersTabsProps) {

    const theme = useTheme();

    const [isPatternFileTabDisabled, setIsPatternFileDisabled] = useState(props.localParamsNumber === 0);

    useEffect(() => {
        setIsPatternFileDisabled(props.localParamsNumber === 0);
        props.setSelectedTabIndex(0);
    }, [props.localParamsNumber])


    const handleTabChange = (newValue: number) => {
        props.setSelectedTabIndex(newValue);

    }

    return (

        <Box>
            <Tabs
                value={props.selectedTabIndex}
                onChange={(event, value) => handleTabChange(value)}
                variant="fullWidth"
                scrollButtons="auto"
                sx={{
                    height: "5svh",
                    marginBottom: "2px",
                    backgroundColor: "secondary.dark",
                    color: "#F7F1DB",
                    '.MuiTabs-indicator': {
                        backgroundColor: 'primary.dark',
                    },
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >


                <StyledTab
                    theme={theme}
                    label={"Global Pattern Parameters" + "(" + props.globalParamsNumber + ")"}
                />

                <StyledTab
                    theme={theme}
                    label={"Pattern File Parameters" + "(" + props.localParamsNumber + ")"}
                    disabled={isPatternFileTabDisabled}
                />



            </Tabs>

            <ParametersPaper
                header="Parameters"
            >
                {props.children}
            </ParametersPaper>
        </Box>

    );
}