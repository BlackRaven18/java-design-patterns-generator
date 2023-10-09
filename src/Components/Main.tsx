import { Box, Grid, Stack } from "@mui/material";
import { useState } from "react";
import CustomBackdrop from "./CustomBackdrop";


import EditorPanel from "./EditorPanel";
import PatternsMenu from "./PatternsMenu";
import ParametersPanel from "./ParametersPanel";


const Main = () => {

  const [isLoading, setIsLoading] = useState(false);


  // const handleParamsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   let tmp: string = selectedFile.content.replace("$CLASSNAME$", event.target.value);
  //   editorRef?.current?.setValue(tmp);
  // }

  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "#3FFF90",
        height: "100%",

      }}
    >
      {isLoading ? (
        <CustomBackdrop label={"Loading..."} />
      ) : (<></>)}

      <Grid
        container
        direction="row"
      >
        <Grid
          item
          xs={2}
          sx={{
            minWidth: 150
          }}
        >
          <PatternsMenu />

        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: "#F9E79F",
            paddingTop: "10px"
          }}
        >
          <Stack>
            
            <ParametersPanel/>
            {/* <TextField
              id="class-name"
              label="Singleton class name"
              variant="outlined"
              onChange={(event) => handleParamsChange(event)}
            // => {handleParamsChange(value)}}
            /> */}
          </Stack>
        </Grid>
        <Grid item xs={8}>

          <EditorPanel />

        </Grid>
      </Grid>
    </Box>
  )
}



export default Main;