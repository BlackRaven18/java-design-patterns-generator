import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import React, { useState } from "react";
import ParametersAccordion from "./ParametersAccordion";
import styled from "@mui/styled-engine"
import { theme } from "../../index"

interface ParametersTabsProps {
    children: React.ReactNode[],
    selectedTabIndex: number,
    setSelectedTabIndex: (index: number) => void,
    globalParamsNumber: number,
    localParamsNumber: number
}

const StyledTab = styled(Tab)({
    textTransform: "none",
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.light,
    borderWidth: "1px",
    border: '1px solid #5F5E58',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    },
    '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.action.hover,
    },
});
export default function ParametersTabs(props: ParametersTabsProps) {

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        props.setSelectedTabIndex(newValue);

    }

    function isLocalParamsTabDisabled(): boolean {
        if (props.localParamsNumber === 0) {
            props.setSelectedTabIndex(0);
            return true;
        }
        return false;
    }

    return (
        <Box>
            <Tabs
                value={props.selectedTabIndex}
                onChange={handleTabChange}
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
                    label={"Global Pattern Parameters" + "(" + props.globalParamsNumber + ")"}
                />

                <StyledTab
                    label={"Pattern File Parameters" + "(" + props.localParamsNumber + ")"}
                    disabled={isLocalParamsTabDisabled()}
                />


            </Tabs>

            <ParametersAccordion
                header="Parameters"
            >
                {props.children}
            </ParametersAccordion>
        </Box>
    );
}