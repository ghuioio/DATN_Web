import { useState } from 'react'
import { Box, Divider} from "@material-ui/core"
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ReactAudioPlayer from 'react-audio-player';
import audio from "./8152f681-446c-412f-8589-e61f680113a6.mp3";
function App() {

    // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // pdf file onChange state
    const [pdfFile, setPdfFile] = useState('https://github.com/ghuioio/IT5419/blob/main/Top%2050%20Machine%20Learning%20Interview%20Questions.pdf');

    // pdf file error state
    const [pdfError, setPdfError] = useState('');

    const [isNotChosen, setIsNotChosen] = useState(true)


    // handle file onChange event
    const allowedFiles = ['application/pdf'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
                const files = e.target.files
                const formData = new FormData()
                formData.append('pdf', 'test.pdf')
                console.log(formData);
                fetch('http://127.0.0.1:5000/pdf_to_text', {
                    method: 'POST',
                    body: formData
                })
                .then(response => console.log(response))
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error(error)
                })
            }
            else {
                setPdfError('Not a valid pdf: Please select only PDF');
                setPdfFile('');
            }
            setIsNotChosen(false);
        }
        else {
            console.log('please select a PDF');
        }
    }

    return (
        <Box
            width='100%'
            height='100%'
            style={{
                backgroundColor: '#F4F3EC'
            }}
            boxSizing='border-box'
            paddingTop={8}
            >
                
            <div style={{display:'flex',justifyContent:'center', paddingTop:'15px'}}>
                <div >
                    <ReactAudioPlayer src={audio} controls style={{ width: '500px' }}/>   
                </div>
            </div>
            <form>

                {/* <label><h5>Upload PDF</h5></label> */}
                <br></br>

                {isNotChosen && (<input type='file' className="form-control"
                    onChange={handleFile}></input>)}

                {/* we will display error message in case user select some fileother than pdf */}
                {pdfError && <span className='text-danger'>{pdfError}</span>}

            </form>

            {/* <h5>View PDF</h5> */}
            <div className="viewer"  style={{ height: 1200 }}>
                {/* render this if we have a pdf file */}
                {pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl={pdfFile}
                            initialPage={0}
                            plugins={[defaultLayoutPluginInstance]}>
                        </Viewer>
                    </Worker>
                )}

                {/* render this if we have pdfFile state null   */}
                {!pdfFile && <>No file is selected yet</>}

            </div>
            <Box marginTop={10}/>
        </Box>
    );
}

export default App;


// import file from "./files/pdf/hossain2018.pdf";