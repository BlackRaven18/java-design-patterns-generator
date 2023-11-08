import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   setIsEditorReadOnly,
   setSelectedPattern,
   setSelectedPatternFamillyIndex,
   setSelectedPatternIndex,
   setSelectedTabIndex
} from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { PatternFamillyInfo } from "../types";
import ExtendedPatternInfoCreator from "../utils/ExtendedPatternInfoCreator";
import { useState } from "react";

const PatternsMenu = () => {

   const dispatch = useDispatch<AppDispatch>();

   const appConfig = useSelector((state: RootState) => state.appState.appConfig);
   const selectedPatternFamillyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamillyIndex);
   const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);

   const [isUnsavedProgressDialogOpen, setIsUnsavedProgressDialogOpen] = useState(false);

   const extendedPatternInfoCreator = new ExtendedPatternInfoCreator();

   const handlePatterFamillyChange = (patternFamilly: PatternFamillyInfo, index: number) => {

      dispatch(setSelectedPatternFamillyIndex(index));
      //handlePatternChange(patternFamilly, 0);
   }

   const handlePatternChange = (patternFamilly: PatternFamillyInfo, index: number) => {

      extendedPatternInfoCreator.getExtendedPatternInfo(patternFamilly, patternFamilly.patterns[index]).then(extendedPatternInfo => {


        dispatch(setSelectedPattern(extendedPatternInfo));
        dispatch(setSelectedPatternIndex(index));
        dispatch(setSelectedTabIndex(0));
        dispatch(setIsEditorReadOnly(true));
     })

   }

   return (
         <Box>
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