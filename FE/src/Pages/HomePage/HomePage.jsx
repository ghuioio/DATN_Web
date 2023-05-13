import { Box, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ItemSlider from "./Slider/ItemSlider";
import Loading from "../Loading";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import { HEROKU_API } from "../../Services/Constants";
import { LineItem, LineRow } from "../BookPage/useBookSearch";
import Banner from "../BookPage/Banner";
import BookFilter from "./BookFilter";
import { useSearchParams } from "react-router-dom";

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

const HomePage = () => {
  const classes = useStyles()
  const [lineData, setLineData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
      const categories = await getCategoriesV2()
      if (!categories) {
        setError(true)
        return
      }

      categories.map(cate => {
        let filtered_books = books.filter(book => book.category === cate.idCategory)
        let lineRow = new LineRow(cate.name, `/book-page/${cate.idCategory}`)
        filtered_books.map(book => {
          let lineItem = new LineItem(
            null,
            book.imageURL[0],
            book._id,
            book.price,
            null,
            null,
            null,
            book.name,
            book.stars.averageStars
          )
          lineRow.addItem(lineItem.getObject())
        })
        if (lineRow.items.length) lineResult.push(lineRow.getObject())
      })
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

      <BookFilter />

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

export default HomePage




// const getData = async () => {
//   // console.log(`${BASE_API}/pages/category/${cateIdV2}/blocks?offset=0&limit=2`)
//   const response = await axiosGet(`${BASE_API}/pages/category/${cateId}/blocks?offset=0&limit=2`)

//   let allblocks = response.data
//   // console.log(allblocks)
//   let lineResult = []
//   let gridResult = []
//   // console.log(allblocks.blocks)
//   allblocks.blocks.map(block => {
//     if (block.btype === 'LINE_BLOCK') {
//       let lineRow = new LineRow(block.label, block.link)
//       block.items.map(item => {
//         let lineitem = new LineItem(
//           item.itype,
//           item.img_url,
//           item.link,
//           item.oprice,
//           item.sprice,
//           item.sale_end,
//           item.sale_start,
//           item.label,
//           item.rating
//         )
//         lineRow.addItem(lineitem.getObject())
//       })
//       lineResult.push(lineRow.getObject())
//     } else if (block.btype === 'PAGE_BLOCK') {
//       block.items.map(item => {
//         let gridItem = new GridItem(
//           item.id,
//           item.link,
//           item.label,
//           item.sprice,
//           item.oprice,
//           item.img_url,
//           item.author,
//           item.rating,
//           item.votes,
//           item.sale_start,
//           item.sale_end,
//         )

//         gridResult.push(gridItem.getObject())
//       })
//     }
//   })
//   setLineData(lineResult)
//   setGridData(gridResult)
//   // console.log(gridResult)
// }

// getData()
