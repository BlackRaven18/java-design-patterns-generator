import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsEditorReadOnly,
    setSelectedPattern,
    setSelectedPatternFamilyIndex,
    setSelectedPatternIndex,
    setSelectedTabIndex
} from "../redux/AppStateSlice";
import { setIsChangesMade } from "../redux/UnsavedProgressSlice";
import { AppDispatch, RootState } from "../redux/store";
import { PatternFamilyInfo } from "../types";
import ExtendedPatternInfoCreator from "../utils/ExtendedPatternInfoCreator";
import UnsavedProgressContainer from "./UnsavedProgressDialog/UnsavedProgressContainter";

type ActivePatternProps = {
    activePatternFamilyIndex: number,
    activePatternIndex: number
}

const PatternsMenu = () => {

    const dispatch = useDispatch<AppDispatch>();

    const appConfig = useSelector((state: RootState) => state.appState.appConfig);
    const selectedPatternFamilyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamilyIndex);
    const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);

    const [activePatternIndex, setActivePatternIndex] = useState<ActivePatternProps>({
        activePatternFamilyIndex: selectedPatternFamilyIndex,
        activePatternIndex: selectedPatternIndex
    });

    const isChangesMade = useSelector((state: RootState) => state.unsavedProgressState.isChangesMade);
    const [isUnsavedProgressDialogOpen, setIsUnsavedProgressDialogOpen] = useState(false);

    const extendedPatternInfoCreator = new ExtendedPatternInfoCreator();

    const [tmpSelectedPatternFamily, setTmpSelectedPatternFamily] = useState<PatternFamilyInfo>(
        appConfig.patternFamilies[selectedPatternFamilyIndex]
    );
    const [tmpSelectedPatternIndex, setTmpSelectedPatternIndex] = useState<number>(0);

    const handlePatterFamilyChange = (patternFamily: PatternFamilyInfo, index: number) => {

        dispatch(setSelectedPatternFamilyIndex(index));
    }


    const handlePatternChange = (patternFamily: PatternFamilyInfo, patternFamilyIndex: number, patternIndex: number) => {

        setTmpSelectedPatternFamily(patternFamily);
        setTmpSelectedPatternIndex(patternIndex);

        if (isChangesMade) {
            setIsUnsavedProgressDialogOpen(true);
        } else {
            setActivePatternIndex({
                activePatternFamilyIndex: patternFamilyIndex,
                activePatternIndex: patternIndex
            })

            handleYes(patternFamily, patternIndex);
        }


    }

    const handleYes = (patternFamily: PatternFamilyInfo, patternIndex: number) => {

        dispatch(setIsChangesMade(false));
        setIsUnsavedProgressDialogOpen(false);

        dispatch(setIsEditorReadOnly(true));

        extendedPatternInfoCreator.getExtendedPatternInfo(
            patternFamily, patternFamily.patterns[patternIndex]).then(extendedPatternInfo => {

                dispatch(setSelectedPattern(extendedPatternInfo));
                dispatch(setSelectedPatternIndex(patternIndex));
                dispatch(setSelectedTabIndex(0));
            })

    }

    return (
        <Box data-testid={"patterns-menu-test-id"}>
            <UnsavedProgressContainer
                open={isUnsavedProgressDialogOpen}
                setOpen={setIsUnsavedProgressDialogOpen}
                handleYes={() => {
                    handleYes(tmpSelectedPatternFamily, tmpSelectedPatternIndex)
                }}
            />
            <List component="nav">

                {appConfig.patternFamilies.map((patternFamily, familyIndex) => {
                    return (
                        <Box key={familyIndex}>
                            <ListItemButton
                                sx={{
                                    backgroundColor: "primary.dark",
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                                key={familyIndex}
                                selected={selectedPatternFamilyIndex === familyIndex}
                                onClick={() => handlePatterFamilyChange(patternFamily, familyIndex)}
                            >
                                <ListItemText primary={patternFamily.patternFamilyName} />
                                {selectedPatternFamilyIndex === familyIndex ? <ExpandLess /> : <ExpandMore />}

                            </ListItemButton>


                            <Collapse in={selectedPatternFamilyIndex === familyIndex} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {patternFamily.patterns.map((pattern, patternIndex) => {
                                        return (
                                            <ListItemButton
                                                key={patternIndex}
                                                sx={{
                                                    pl: 4,
                                                    backgroundColor: "primary.main",
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'action.active',
                                                    },
                                                }}
                                                selected={
                                                    activePatternIndex.activePatternIndex === patternIndex
                                                    && activePatternIndex.activePatternFamilyIndex === familyIndex
                                                }
                                                onClick={() => handlePatternChange(
                                                    appConfig.patternFamilies[selectedPatternFamilyIndex],
                                                    familyIndex,
                                                    patternIndex
                                                )}
                                            >
                                                <ListItemText primary={pattern.patternName} />
                                            </ListItemButton>
                                        );
                                    })}

                                </List>
                            </Collapse>

                        </Box>

                    );
                })}

            </List>
            {/* <DownloadButton editorValueArray={editorValueArray} selectedPattern={selectedPattern} />
            <Button onClick={() => getEditorValue()}>Show editor content</Button> */}
        </Box>
    );
}


export default PatternsMenu;