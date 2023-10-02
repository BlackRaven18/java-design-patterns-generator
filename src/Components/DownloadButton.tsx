import JSZip from 'jszip';
import React from 'react';
import { saveAs } from 'file-saver';


const DownloadButton: React.FC = () => {
    const handleDownload = async () => {
        const zip = new JSZip();
        const text = 'to jest plik txt';

        // Dodaj kilka plików txt do archiwum zip
        zip.file('plik1.txt', text);
        zip.file('plik2.txt', text);
        zip.file('plik3.txt', text);

        // Wygeneruj zawartość archiwum zip
        const content = await zip.generateAsync({ type: 'blob' });

        // Zapytaj użytkownika o lokalizację pliku
        const file = new File([content], 'pliki.zip', { type: 'application/zip' });

        // Umożliw użytkownikowi wybór lokalizacji
        saveAs(file);
    };

    return (
        <div>
            <button onClick={handleDownload}>Pobierz archiwum ZIP</button>
        </div>
    );
};



export default DownloadButton;