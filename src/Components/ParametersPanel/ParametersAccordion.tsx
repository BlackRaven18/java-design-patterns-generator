import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import React from "react";

interface ParametersAccordionProps {
    children: React.ReactNode[],
    header: string,
}

export default function ParametersAccordion(props: ParametersAccordionProps) {

    const getChildrenNumber = () => {

        let childrenNumber = 0;

        if (props.children.length > 0) {
            let children = props.children.flat().filter(child => child !== undefined);
            childrenNumber = children.length;
        }

        return childrenNumber;
    }

    return (
        <Accordion

            sx={{
                backgroundColor: "secondary.light",
            }}
            defaultExpanded={true}

        >
            <AccordionSummary
                sx={{
                    //border: '2px solid #ff0000'
                }}
                expandIcon={<ExpandMoreIcon />}
            >
                <Stack
                    direction={"row"}
                    spacing={"5px"}
                >
                    <SettingsIcon />
                    <Typography>{props.header + " (" + getChildrenNumber() + ")"}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    spacing={"20px"}
                >

                    {props.children}

                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}