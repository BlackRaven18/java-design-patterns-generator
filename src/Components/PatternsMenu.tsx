import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   setIsDrawerOpen,
   setIsEditorReadOnly,
   setSelectedPattern,
   setSelectedPatternFamillyIndex,
   setSelectedPatternIndex,
   setSelectedTabIndex,
} from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { LoadedPatternFileInfo, PatternFamillyInfo, PatternInfo } from "../types";
import FileReader from "../utils/FileReader";
import ExtendedPatternInfoCreator from "../utils/ExtendedPatternInfoCreator";

const PatternsMenu = () => {

   const dispatch = useDispatch<AppDispatch>();

   const appConfig = useSelector((state: RootState) => state.appState.appConfig);
   const selectedPatternFamillyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamillyIndex);
   const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);
;

   const extendedPatternInfoCreator = new ExtendedPatternInfoCreator();

   const handlePatterFamillyChange = (patternFamilly: PatternFamillyInfo, index: number) => {

      dispatch(setSelectedPatternFamillyIndex(index));
      handlePatternChange(patternFamilly.patterns[0], 0);
   }

   const handlePatternChange = (pattern: PatternInfo, index: number) => {

      extendedPatternInfoCreator.getExtendedPatternInfo(pattern).then(extendedPatternInfo => {

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
                                          '&.Mui-selected': {
                                             backgroundColor: 'action.active',
                                          },
                                       }}
                                       selected={selectedPatternIndex === index}
                                       onClick={() => handlePatternChange(pattern, index)}
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