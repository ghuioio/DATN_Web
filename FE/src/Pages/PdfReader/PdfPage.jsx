import { Box, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ItemSlider from "./Slider/ItemSlider";
import Loading from "../Loading";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import { HEROKU_API } from "../../Services/Constants";
import { LineItem, LineRow } from "../BookPage/useBookSearch";
import Banner from "../BookPage/Banner";
import { useSearchParams } from "react-router-dom";
import pdf_data from "./book.json"
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    backgroundColor: '#F4F3EC',
    width: '100%',
    alignItems: 'center'
  }
}))

const PdfPage = () => {
  const classes = useStyles()
  const [lineData, setLineData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  console.log(pdf_data)
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    setLoading(true)
    const getCategoriesV2 = async () => {
      const response = await axiosGet(`${HEROKU_API}/category`)
      if (!response) {
        setError(true)
        return null
      }
      const cv2 = response.data
      return cv2
    }
    const getBooks = async () => {
      let price = searchParams.get('price')
      let category = searchParams.get('category')
      const response = await axiosGet(`${HEROKU_API}/books`, {
        price,
        category
      })
      if (!response) {
        setError(true)
        return
      }
      const books = response.data
      console.log('heroku book', books)

      let lineResult = []
      
      let pdfLineRow = new LineRow('PDF', `/pdf-page/`)
      pdf_data.map(pdf =>{
        let pdfLineItem = new LineItem(
            null,
            pdf.imageLink,
            pdf.id,
            10000,
            null,
            null,
            null,
            pdf.title,
            null,
        )
        pdfLineRow.addItem(pdfLineItem.getObject())
      })
      lineResult.push(pdfLineRow.getObject())
      console.log(lineResult)
      setLineData(lineResult)
      setLoading(false)
    }

    getBooks()
  }, [searchParams])

  return (
    <div className={classes.root}>
      <Banner
        img_url={'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1659368560/book_chill_store3_mrb0qw.png?fbclid=IwAR1yONGA_ma3I0CvY1O70WZJe7nSmZ2jIQ6tK_mhiuFJ3blNbsRWGPd4tck'}
      />

      <Box marginTop={2} />


      {lineData.map((row, index) => {
        return (
          <Fragment key={index}>
            <Box marginTop={2} />
            <ItemSlider
              key={index}
              items={row.items}
              label={row.label}
              link={row.link}
            />
          </Fragment>
        )
      })}

      {!lineData.length && !loading &&
        <>
          <Box marginTop={4}/>
          <Typography variant='h5' style={{fontWeight: 500}}>Không có sách nào :(</Typography>
        </>
      }

      {!error && loading && <Loading />}
      {error &&
        <>
          <Box marginTop={4} />
          <Typography variant='h5' color='secondary'>Lỗi khi tải trang :(</Typography>
        </>
      }
      <Box marginTop={4} />
    </div>
  )

}

export default PdfPage




