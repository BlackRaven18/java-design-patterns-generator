import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   setIsEditorReadOnly,
   setSelectedPattern,
   setSelectedPatternFamillyIndex,
   setSelectedPatternIndex,
   setSelectedTabIndex
} from "../redux/AppStateSlice";
import { setIsChangesMade } from "../redux/UnsavedProgressSlice";
import { AppDispatch, RootState } from "../redux/store";
import { PatternFamillyInfo } from "../types";
import ExtendedPatternInfoCreator from "../utils/ExtendedPatternInfoCreator";
import UnsavedProgressContainer from "./UnsavedProgressDialog/UnsavedProgressContainter";

const PatternsMenu = () => {

   const dispatch = useDispatch<AppDispatch>();

   const appConfig = useSelector((state: RootState) => state.appState.appConfig);
   const selectedPatternFamillyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamillyIndex);
   const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);

   const isChangesMade = useSelector((state: RootState) => state.unsavedProgressState.isChangesMade);
   const [isUnsavedProgressDialogOpen, setIsUnsavedProgressDialogOpen] = useState(false);

   const extendedPatternInfoCreator = new ExtendedPatternInfoCreator();

   const [tmpSelectedPatternFamilly, setTmpSelectedPatternFamilly] = useState<PatternFamillyInfo>(
      appConfig.patternFamillies[selectedPatternFamillyIndex]
   );
   const [tmpSelectedPatternIndex, setTmpSelectedPatternIndex] = useState<number>(0);

   const handlePatterFamillyChange = (patternFamilly: PatternFamillyInfo, index: number) => {

      dispatch(setSelectedPatternFamillyIndex(index));
      //handlePatternChange(patternFamilly, 0);
   }


   const handlePatternChange = (patternFamilly: PatternFamillyInfo, patternIndex: number) => {

      setTmpSelectedPatternFamilly(patternFamilly);
      setTmpSelectedPatternIndex(patternIndex);

      if (isChangesMade) {
         setIsUnsavedProgressDialogOpen(true);
      } else {
         handleYes(patternFamilly, patternIndex);
      }


   }

   const handleYes = (patternFamilly: PatternFamillyInfo, patternIndex: number) => {

      dispatch(setIsChangesMade(false));
      setIsUnsavedProgressDialogOpen(false);

      dispatch(setIsEditorReadOnly(true));

      extendedPatternInfoCreator.getExtendedPatternInfo(
         patternFamilly, patternFamilly.patterns[patternIndex]).then(extendedPatternInfo => {

            dispatch(setSelectedPattern(extendedPatternInfo));
            dispatch(setSelectedPatternIndex(patternIndex));
            dispatch(setSelectedTabIndex(0));
         })

   }

   return (
      <Box>
         <UnsavedProgressContainer
            open={isUnsavedProgressDialogOpen}
            setOpen={setIsUnsavedProgressDialogOpen}
            handleYes={() => { handleYes(tmpSelectedPatternFamilly, tmpSelectedPatternIndex) }}
         />
         <List component="nav">

            {appConfig.patternFamillies.map((patternFamilly, index) => {
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
                        selected={selectedPatternFamillyIndex === index}
                        onClick={() => handlePatterFamillyChange(patternFamilly, index)}
                     >
                        <ListItemText primary={patternFamilly.patternFamillyName} />
                        {selectedPatternFamillyIndex === index ? <ExpandLess /> : <ExpandMore />}

                     </ListItemButton>


                     <Collapse in={selectedPatternFamillyIndex === index} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                           {patternFamilly.patterns.map((pattern, index) => {
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
                                    onClick={() => handlePatternChange(appConfig.patternFamillies[selectedPatternFamillyIndex], index)}
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