import { Box, Grid } from '@mui/material';
import { editor } from 'monaco-editor';
import { useRef, useState } from 'react';
import './App.css';
import EditorPanel from './components/EditorPanel';
import MyDrawer from './components/MyDrawer';
import ParametersPanel from './components/ParametersPanel';
import PatternsMenu from './components/PatternsMenu';
import TopBar from './components/TopBar';
import CustomBackdrop from './components/common/CustomBackdrop';

function App() {

  const [isLoading, setIsLoading] = useState(false);

  const parentEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const setEditorRef = (editorRef: editor.IStandaloneCodeEditor | null) => {
    parentEditorRef.current = editorRef;
  };

  return (
    <div className="App">
      <Box
        sx={{
          backgroundColor: "primary.dark",
          height: "100vh",

        }}
      >
        {isLoading ? (
          <CustomBackdrop label={"Loading..."} />
        ) : (<></>)}

        <TopBar />

        <MyDrawer headerLabel="Design Patterns" width="250px">
          <PatternsMenu />
        </MyDrawer>

        <Grid
          container
          direction="row"
          height="90%"
        >

          <Grid
            item
            xs={3}
          >
            <ParametersPanel editorRef={parentEditorRef} />

          </Grid>
          <Grid item xs={9}>

            <EditorPanel setEditorParentRef={setEditorRef} />

          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
