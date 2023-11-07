import { Box, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PatternConfigInfo, PatternInfo } from '../types';

interface DownloadButtonProps {
    selectedPattern: PatternConfigInfo;
}


const DownloadButton = (props: DownloadButtonProps) => {
    const zip = new JSZip();

    const handleDownload = async () => {
        props.selectedPattern.files.forEach(file => {
            zip.file(file.currentName, file.currentContent);
        })

        const content = await zip.generateAsync({ type: 'blob' });

        const zipFile = new File([content],
            props.selectedPattern.name + ".zip", { type: 'application/zip' });


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
                sx={{
                    color: "secondary.contrastText",
                    backgroundColor: "secondary.main"
                }}
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