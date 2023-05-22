import { Box, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { HEROKU_API } from "../../Services/Constants";
import ItemSlider from "../HomePage/Slider/ItemSlider";
import Loading from "../Loading";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import Banner from "./Banner";
import BookListGrid from "./BookListGrid";
import { GridItem } from "./useBookSearch";

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

const BookPage = () => {
  const classes = useStyles()
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { idCategory } = useParams()
  const [gridLabel, setGridLabel] = useState('')
  useEffect(() => {
    if (!idCategory) return
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
      const response = await axiosGet(`${HEROKU_API}/books`)
      if (!response) {
        setError(true)
        return
      }
      const books = response.data
      // console.log('heroku book', books)

      let gridResult = []
      const categories = await getCategoriesV2()
      if (!categories) {
        setError(true)
        return
      }
      let gridLabel = categories.find(cate => cate.idCategory === idCategory).name
      let filtered_books = books.filter(book => book.category === idCategory)
      // console.log('filter', filtered_books)
      filtered_books.map(book => {
        let gridItem = new GridItem(
          null,
          book._id,
          book.name,
          null,
          book.price,
          book.imageURL[0],
          book.author,
          book.stars.averageStars,
          book.totalAmountVotes,
          null,
          null
        )
        gridResult.push(gridItem.getObject())
      })
      // console.log('grid', gridResult)
      setGridLabel(gridLabel)
      setGridData(gridResult)
      setLoading(false)
    }

    getBooks()
  }, [idCategory])

  return (
    <div className={classes.root}>
      <Banner
        img_url={'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1654856935/banner_sach1_p84do2.webp'}
      />
      <BookListGrid
        listname={gridLabel}
        namePosition='center'
        items={gridData}
        loading={loading}
      />

      {!error && loading && <Loading />}
      {error && <Typography variant='h5' color='secondary'>Lỗi khi tải trang :(</Typography>}

      <Box marginTop={4}/>
    </div>
  )

}

export default BookPage




