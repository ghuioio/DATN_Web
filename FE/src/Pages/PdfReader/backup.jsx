import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import { Box, Divider} from "@material-ui/core"
const PdfReader = () => {
  // const [url, setUrl] = React.useState('D:\Code\AAA_github\IT5419\Top 50 Machine Learning Interview Questions.pdf');
  const [url, setUrl] = React.useState('https://arxiv.org/pdf/quant-ph/0410100.pdf')
  const onChange = (e) => {
      const files = e.target.files;
      files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };
  return (
    <Box
      width='100%'
      height='100%'
      style={{
        // backgroundImage: 'url("https://wallpapercrafter.com/th800/221212-book-market-book-sale-and-bookstore-hd.jpg")',
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
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
        <div>Doc thu</div>
      </Box>
      <Box marginTop={10}/>
      <input type="file" accept=".pdf" onChange={onChange} />
      <PDFViewer
            document={{
                url: url,
            }}
        />
      </Box>
  )
}

export default PdfReader