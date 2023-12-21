import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Box, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsEditorReadOnly,
    setSelectedPattern,
    setSelectedPatternFamilyIndex,
    setSelectedPatternIndex,
    setSelectedTabIndex
} from "../redux/AppStateSlice";
import {setIsChangesMade} from "../redux/UnsavedProgressSlice";
import {AppDispatch, RootState} from "../redux/store";
import {PatternFamilyInfo} from "../types";
import ExtendedPatternInfoCreator from "../utils/ExtendedPatternInfoCreator";
import UnsavedProgressContainer from "./UnsavedProgressDialog/UnsavedProgressContainter";

const PatternsMenu = () => {

    const dispatch = useDispatch<AppDispatch>();

    const appConfig = useSelector((state: RootState) => state.appState.appConfig);
    const selectedPatternFamilyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamilyIndex);
    const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);

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


    const handlePatternChange = (patternFamily: PatternFamilyInfo, patternIndex: number) => {

        setTmpSelectedPatternFamily(patternFamily);
        setTmpSelectedPatternIndex(patternIndex);

        if (isChangesMade) {
            setIsUnsavedProgressDialogOpen(true);
        } else {
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

                {appConfig.patternFamilies.map((patternFamily, index) => {
                    return (
                        <Box key={index}>
                            <ListItemButton
                                sx={{
                                    backgroundColor: "primary.dark",
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                                key={index}
                                selected={selectedPatternFamilyIndex === index}
                                onClick={() => handlePatterFamilyChange(patternFamily, index)}
                            >
                                <ListItemText primary={patternFamily.patternFamilyName}/>
                                {selectedPatternFamilyIndex === index ? <ExpandLess/> : <ExpandMore/>}

                            </ListItemButton>


                            <Collapse in={selectedPatternFamilyIndex === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {patternFamily.patterns.map((pattern, index) => {
                                        return (
                                            <ListItemButton
                                                key={index}
                                                sx={{
                                                    pl: 4,
                                                    backgroundColor: "primary.main",
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'action.active',
                                                    },
                                                }}
                                                selected={selectedPatternIndex === index}
                                                onClick={() => handlePatternChange(appConfig.patternFamilies[selectedPatternFamilyIndex], index)}
                                            >
                                                <ListItemText primary={pattern.patternName}/>
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