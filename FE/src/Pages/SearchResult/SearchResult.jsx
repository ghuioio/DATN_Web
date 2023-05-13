import { Box, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { BASE_API, BASE_FILE, HEROKU_API } from "../../Services/Constants";
import ItemSlider from "../HomePage/Slider/ItemSlider";
import Loading from "../Loading";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import Banner from "../BookPage/Banner";
import BookListGrid from "../BookPage/BookListGrid";
import { GridItem } from "../BookPage/useBookSearch";
import BookFilter from "../HomePage/BookFilter";

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

const SearchResult = () => {
  const classes = useStyles()
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { keyword } = useParams()
  const [gridLabel, setGridLabel] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!keyword) return
    setLoading(true)
    setGridLabel(`Kết quả tìm kiếm cho từ khóa: ${keyword}`)
    const getBooks = async () => {
      let price = searchParams.get('price')
      let category = searchParams.get('category')
      const response = await axiosGet(`${HEROKU_API}/books?keyword=${keyword}`, {
        price,
        category
      })
      if (!response) {
        setError(true)
        return
      }
      const books = response.data
      // console.log('heroku book', books)

      let gridResult = []

      // console.log('filter', filtered_books)
      books.map(book => {
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
      // setGridLabel(gridLabel)
      setGridData(gridResult)
      setLoading(false)
    }

    getBooks()
  }, [keyword, searchParams])

  return (
    <div className={classes.root}>

      {/* {lineData.map((row, index) => {
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
      })} */}
      <Banner
        img_url={'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1654856935/banner_sach1_p84do2.webp'}
      />

      <Box marginTop={2} />

      <BookFilter />

      {(!loading && gridData.length === 0) ?
        <>
          <Box marginTop={2} />
          <Typography Typography gutterBottom variant="h5" style={{fontWeight: 600}}>Không có kết quả nào :(</Typography>
        </>
        :
        <BookListGrid
          listname={gridLabel}
          namePosition='center'
          items={gridData}
          loading={loading}
        />
      }

      {!error && loading && <Loading />}
      {error && <Typography variant='h5' color='secondary'>Lỗi khi tải trang :(</Typography>}
      <Box marginTop={4} />
    </div >
  )

}

export default SearchResult




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
