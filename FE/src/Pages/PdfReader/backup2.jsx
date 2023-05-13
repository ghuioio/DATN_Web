import { Box, Divider} from "@material-ui/core"
import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import PDFViewer from 'pdf-viewer-reactjs'
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useLocation, useParams, useSearchParams } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import fileUrl from 'src/Pages/PdfReader/0.pdf'
const PdfReader = (props) => {
  // const [url, setUrl] = React.useState('https://arxiv.org/pdf/2212.05129.pdf')
  const [url, setUrl] = React.useState('./src/Pages/PdfReader/0.pdf')
  const { id } = useParams()
  const onChange = (e) => {
      const files = e.target.files;
      files.length > 0 && setUrl(URL.createObjectURL(files[0]));
      console.log(URL.createObjectURL(files[0]))
  };
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
      <Box
        marginTop={8}
        display='flex'
        justifyContent='space-evenly'
      >
      </Box>
          <div style={{display: 'flex', justifyContent:'center', margin:'10px'}}> 
            <input type="file" accept=".pdf" onChange={onChange} />
          </div>
          {/* <div>
              <PDFViewer
                document={{
                    url: url,
                }}
            />
          </div> */}
          <div style={{display: 'flex', justifyContent:'center'}}>
            <div className="mt-4" style={{ height: '600px', width:'70%'}}>
                {url ? (
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '100%',
                        }}
                    >
                        <Viewer fileUrl={url} />
                    </div>
                ) : (
                    <div
                        style={{
                            alignItems: 'center',
                            border: '2px dashed rgba(0, 0, 0, .3)',
                            display: 'flex',
                            fontSize: '2rem',
                            height: '100%',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        Preview area
                    </div>
                )}
            </div>
          </div>
      <Box marginTop={10}/>
    </Box>
  )
}

export default PdfReader