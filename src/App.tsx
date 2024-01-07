import { Box, Grid } from '@mui/material';
import { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import EditorPanel from './components/EditorPanel';
import MyDrawer from './components/MyDrawer';
import ParametersPanel from './components/ParametersPanel/ParametersPanel';
import PatternsMenu from './components/PatternsMenu';
import TopBar from './components/TopBar';
import { AppDispatch } from './redux/store';
import InitialStateLoader from './utils/InitialStateLoader';
import { setState } from './redux/AppStateSlice';

function App() {

    const dispatch = useDispatch<AppDispatch>();

    const parentEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const initialStateLoader = new InitialStateLoader();

    const setEditorRef = (editorRef: editor.IStandaloneCodeEditor | null) => {
        parentEditorRef.current = editorRef;
    };

    useEffect(() => {
        loadInitialState();
        registerResizeObserverEventListener();
    }, [])

    const registerResizeObserverEventListener = () => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }

    const loadInitialState = () => {
        initialStateLoader.loadInitialState().then(appState => {
            dispatch(setState(appState));
        })
    }

    return (
        <div className="App" data-testid={'app-test-id'}>
            <Box
                sx={{
                    backgroundColor: "primary.dark",
                    height: "100vh",

                }}
            >

                <TopBar />

                <MyDrawer headerLabel="Design Patterns" width="250px">
                    <PatternsMenu />
                </MyDrawer>

                <Grid
                    container
                    direction="row"
                //height="90%"
                >

                    <Grid
                        item
                        zeroMinWidth
                        xs={4}
                        sx={{
                            backgroundColor: "secondary.main"
                        }}
                    >
                        <ParametersPanel />

                    </Grid>
                    <Grid
                        item
                        xs={8}

                    >

                        <EditorPanel setEditorParentRef={setEditorRef} />

                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default App;
