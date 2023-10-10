import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   setSelectedPattern,
   setSelectedPatternFamillyIndex,
   setSelectedPatternIndex,
   setSelectedTabIndex
} from "../redux/AppStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { PatternFamillyInfo, PatternInfo } from "../types";
import FileReader from "../utils/FileReader";

const PatternsMenu = () => {

   const dispatch = useDispatch<AppDispatch>();

   const appConfig = useSelector((state: RootState) => state.appState.appConfig);
   const selectedPatternFamillyIndex = useSelector((state: RootState) => state.appState.selectedPatternFamillyIndex);
   const selectedPatternIndex = useSelector((state: RootState) => state.appState.selectedPatternIndex);

   const fileReader = new FileReader();

   const handlePatterFamillyChange = (patternFamilly: PatternFamillyInfo, index: number) => {

      dispatch(setSelectedPatternFamillyIndex(index));
      handlePatternChange(patternFamilly.patterns[0], 0);
   }

   const handlePatternChange = (pattern: PatternInfo, index: number) => {

      //setIsLoading(true);

      dispatch(setSelectedPattern(pattern));
      dispatch(setSelectedPatternIndex(index));
      dispatch(setSelectedTabIndex(0));

      fileReader.loadFileToState(pattern.patternFilesDirectory, pattern.files[0].name)


   }

   return (
      <Box>
         <List component="nav">

            {appConfig.patternFamillies.map((patternFamilly, index) => {
               return (
                  <Box key={index}>
                     <ListItemButton
                        sx={{
                           backgroundColor: "#2ECC71",
                           '&.Mui-selected': {
                              backgroundColor: '#58D68D',
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
                                          backgroundColor: '#82E0AA ',
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