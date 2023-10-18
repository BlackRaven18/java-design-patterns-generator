import { Box, Grid, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useRef, useState } from "react";
import CustomBackdrop from "./CustomBackdrop";
import { editor } from "monaco-editor";
import EditorPanel from "./EditorPanel";
import ParametersPanel from "./ParametersPanel";
import PatternsMenu from "./PatternsMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopBar from "./TopBar";


const Main = () => {

  const [isLoading, setIsLoading] = useState(false);

  const parentEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const setEditorRef = (editorRef: editor.IStandaloneCodeEditor | null) => {
    parentEditorRef.current = editorRef;
  };



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

      <TopBar/>

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

            <ParametersPanel editorRef={parentEditorRef} />
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

          <EditorPanel setEditorParentRef={setEditorRef} />

        </Grid>
      </Grid>
    </Box>
  )
}



export default Main;