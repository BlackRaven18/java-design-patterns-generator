import { Box, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

interface PatternInfo {
    patternName: string,
    patternFilesDirectory: string,
    fileNames: string[]
}

interface DownloadButtonProps {
    editorValueArray: string[];
    selectedPattern: PatternInfo;
}


const DownloadButton = (props: DownloadButtonProps) => {
    const zip = new JSZip();

    const handleDownload = async () => {
        props.editorValueArray.map((value, index) => {
            zip.file(props.selectedPattern.fileNames[index], value);
        })

        const content = await zip.generateAsync({ type: 'blob' });

        const zipFile = new File([content],
            props.selectedPattern.patternName + ".zip", { type: 'application/zip' });


        saveAs(zipFile);

    }

    return (
        <Box
            sx={{
               margin: 'auto',
               alignItems: "center",
               justifyContent: "center",
            
            }}
        >
            <Button
                onClick={handleDownload}
                variant='contained'
            >
                Download pattern files
            </Button>
        </Box>
        // <div>
        //     <button onClick={handleDownload}>Pobierz archiwum ZIP</button>
        // </div>
    );

}






export default DownloadButton;