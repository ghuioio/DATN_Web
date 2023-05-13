import { Box, Button, Divider, makeStyles, Typography } from "@material-ui/core";
import '../HomePage/Slider/ItemSlider.css'
import BookImage from "./BookImage";
import BookDetails from "./BookDetails";
import PriceBox from "./PriceBox";
import BoughtTogether from "./BoughtTogether";
import ItemSlider from "../HomePage/Slider/ItemSlider";
import CustomerReviews from "./CustomerRatings";
import Review from "./Review";
import CustomerRatings from "./CustomerRatings";
import { Fragment, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosGet } from '../../Services/Ultils/axiosUtils'
import { BASE_API, HEROKU_API } from "../../Services/Constants";
import { convertBlockToLineRow, LineItem, LineRow } from "../BookPage/useBookSearch";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";
import Loading from "../Loading";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
}))

class Specs {
  name
  code
  value
  constructor(name, code, value) {
    this.name = name
    this.code = code
    this.value = value
  }
  getObject() {
    return ({
      name: this.name,
      code: this.code,
      value: this.value
    })
  }
}


const ProductPage = (props) => {
  const classes = useStyles()
  const [data, setData] = useState(null)
  const [details, setDetails] = useState(null)
  const [buyOptionIndex, setBuyOptionIndex] = useState(0)
  const [sameBooks, setSameBooks] = useState(null)
  const [comments, setComments] = useState([])
  const [allowComment, setAllowComment] = useState(true)
  const [firstLoad, setFirstLoad] = useState(false)
  const [loading, setLoading] = useState(false)
  let { id } = useParams()
  const getComments = async (id) => {
    let response = await axiosGet(`${HEROKU_API}/books/${id}/comments`)
    if (!response || !response.success) return
    const comments = response.data
    setComments(comments)
    console.log('comments', comments)
    if (!props.userInfo) return
    console.log(props.userInfo)
    let index = comments.findIndex(comment => {
      return comment.createdBy.username === props.userInfo.username
    })
    if (index !== -1) setAllowComment(false)
    else setAllowComment(true)
  }
  const getSameBook = async (cate) => {
    let response = await axiosGet(`${HEROKU_API}/books?category=${cate}`)
    if (!response || !response.success) return
    console.log('same cate', response.data)
    return response.data
  }
  const getBookDetails = async (id) => {
    setLoading(true)
    console.log('book id:', id)
    let response = await axiosGet(`${HEROKU_API}/books/${id}`)
    console.log(response)
    if (!response || !response.success || !response.data) {
      setFirstLoad(true)
      return
    }
    let data = response.data
    let details = {
      images: data.imageURL,
      authors: [data.author],
      desc: data.description,
      quantity_sold: null,
      rating: data.stars.averageStars,
      review_count: data.stars.totalAmountVotes,
      title: data.name,
      specs: [{
        attributes: [
          new Specs('Nhà xuất bản', 'publisher', data.publisher).getObject(),
          new Specs('Ngày xuất bản', 'publication_date', data.publication_date).getObject(),
          new Specs('Số trang', 'number_of_page', data.number_of_page).getObject(),
          new Specs('Nhà sách', 'manufacturer', data.manufacturer).getObject(),
          new Specs('Bìa sách', 'book_cover', data.book_cover).getObject(),

        ]
      }],
      price: data.price
    }
    console.log('book data:', data)

    const sameBooks = await getSameBook(data.category)
    await getComments(id)
    let filtered_books = sameBooks.filter(book => book._id !== data._id)
    let lineRow = new LineRow('Sản phẩm liên quan', `/book-page/${data.category}`)
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
    if (lineRow.items.length > 0) setSameBooks(lineRow)
    setData(response.data)
    setDetails(details)
    // setSimilarBuy(convertBlockToLineRow(response.data.similar_buy_block).getObject())
    // setSimilarView(convertBlockToLineRow(response.data.similar_view_block).getObject())
    setFirstLoad(true)
    setLoading(false)
  }
  useEffect(() => {
    getBookDetails(id)
  }, [id])

  const clickBuyOption = (index) => () => {
    setBuyOptionIndex(index)
  }

  return (
    <>
      {!data && firstLoad &&
        <Box
          width='100%'
          display='flex'
          justifyContent='center'
          paddingTop={15}
        >
          <Typography variant='h5'>Sách bạn đang tìm không tồn tại</Typography>
        </Box>
      }
      {data &&
        <Box
          className={classes.root}
          width='100%'
          height='fit-content'
          boxSizing='border-box'
          paddingX={2}
          paddingTop={11}
        >
          {!!details &&
            <Box
              id="firstpart"
              width='100%'
              height='fit-content'
              display='flex'
              justifyContent='space-between'
              boxSizing='border-box'
            >
              <BookImage
                smallImages={details.images}
              />
              <Box marginLeft={2} />
              <BookDetails
                authors={details.authors}
                desc={details.desc}
                // list_price={details.list_price}
                // price={details.price}
                quantity_sold={details.quantity_sold}
                rating={details.rating.toFixed(1)}
                review_count={details.review_count}
                title={details.title}
                specs={details.specs}
                buyOptionIndex={buyOptionIndex}
                clickBuyOption={clickBuyOption}
              // buyOptions={data.buy_options}
              //.filter(option => option.price)
              />
              <Box marginLeft={2} />
              <PriceBox
                price={details.price}
                smallImages={details.images}
                setRefreshNavbar={props.setRefreshNavbar}
                maxAmount={data.amount}
                userInfo={props.userInfo}
                setLoading={setLoading}
                loading={loading}
              />

            </Box>
          }

          {/* <Box marginY={2}><Divider /></Box> */}

          {/* <BoughtTogether /> */}

          <Box marginTop={2}><Divider /></Box>
          {sameBooks &&
            <Box width='100%'>
              <ItemSlider
                items={sameBooks.items}
                label={sameBooks.label}
                link={sameBooks.link}
                maxWidth='none'
              />
              <Box><Divider /></Box>
            </Box>
          }


          {!!details &&
            <Box
              display='flex'
              paddingBottom={4}
            >

              <CustomerRatings stars={details.rating.toFixed(1)} votes={numberWithCommas(details.review_count)} getBookDetails={() => getBookDetails(id)} allowComment={allowComment} setLoading={setLoading}/>

              <Divider flexItem orientation="vertical" />
              <Box
                width='75%'
                marginLeft={2}
                paddingTop={2}
              >
                <Typography variant='h5'>Bình luận</Typography>
                <Box marginTop={2} />
                {comments.map((comment, key) => (
                  <Fragment key={key}>
                    <Box marginTop={1.5} />
                    <Review
                      username={comment.createdBy.username}
                      stars={comment.stars}
                      details={comment.content}
                    />
                    <Box marginTop={1.5} />
                  </Fragment>
                ))}

                {comments.length === 0 &&
                  <Typography>Chưa có bình luận nào :(</Typography>
                }

                {/* <Divider /> */}
                <Box marginTop={1} />
                {/* <Button color="primary" size='small'>Xem tất cả đánh giá &nbsp;{'>'}</Button> */}
                <Box marginTop={3} />

              </Box>
            </Box>
          }


        </Box>
      }

      {loading && <Loading />}
    </>


  )
}

export default ProductPage