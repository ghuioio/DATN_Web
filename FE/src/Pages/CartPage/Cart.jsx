import { Box, Button, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API, HEROKU_API, PrevChooseAddress } from "../../Services/Constants";
import { CustomButton } from "../CustomComponent/CustomButton";
import { axiosGet, axiosDelete, axiosPatch, axiosPost } from "../../Services/Ultils/axiosUtils";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";
import CartItem from "./CartItem";
import RecommendItem from "./RecommendItem";
import { common_variable } from "../common";
import Loading from "../Loading";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  },
  shoppingCart: {
    backgroundColor: theme.palette.common.white
  },
  subTotal: {
    backgroundColor: theme.palette.common.white,
    width: 300
  },
  youMayLike: {
    backgroundColor: theme.palette.common.white,
    width: 300,
    height: 'fit-content',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 5
  },
  rightGrid: {
    height: '600px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))

const item = {
  src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
  title: 'Harry Potter',
  author: 'JK Rowling',
  coverType: 'Paper back',
  price: '13.02',
  maxAmount: 10
}

// const items = new Array(3).fill(item)



const Cart = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()


  const [items, setItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const getCartItems = async () => {
    let items = JSON.parse(localStorage.getItem('cart'))
    setItems(items)
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const calcSubTotal = () => {
    let prices = document.getElementsByClassName('cart-item-price')
    let subtotal = 0
    for (let price of prices) {
      subtotal += Number(price.innerText.replace('.', '').replace('đ', ''))
    }
    setSubtotal(subtotal)
    // let subtotal = prices.reduce((prev, curr) => {
    //   return prev + Number(curr.innerText)
    // }, 0)
    // setSubtotal(subtotal)
    // console.log(subtotal)
  }

  const deleteItem = (id) => async (event) => {
    setLoading(true)
    let items = JSON.parse(localStorage.getItem('cart'))
    let index = items.findIndex(item => item.book === id)
    items.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(items))
    await axiosPost(`${HEROKU_API}/cart`, items, true)
    setItems(items)
    props.setRefreshNavbar(prev => !prev)
    setLoading(false)
  }

  const updateItem = async (id, amount) => {
    setLoading(true)
    let items = JSON.parse(localStorage.getItem('cart'))
    let index = items.findIndex(item => item.book === id)
    items[index].qualityBook = amount
    localStorage.setItem('cart', JSON.stringify(items))
    await axiosPost(`${HEROKU_API}/cart`, items, true)
    setItems(items)
    setLoading(false)
  }

  useEffect(()=>{
    calcSubTotal()
  }, [items])

  const checkOut = () => {
    navigate('/chon-dia-chi', { state: { prev: PrevChooseAddress.CHECK_OUT } })
  }

  return (
    <Box
      direction="row"
      className={classes.root}
      display='flex'
    >
      {items.length === 0 &&
        <Box className={classes.shoppingCart} height='fit-content' padding={2} boxSizing='border-box' width='100%'>
          <Box display='flex' justifyContent='space-between' alignItems='flex-end' paddingRight={2} >
            <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 400 }}>Price</Typography>
          </Box>
          <Divider />

          <Box display='flex' flexDirection='column' alignItems='center' marginTop={4} paddingBottom={4}>
            <Typography variant="h5">Bạn chưa có gì trong giỏ hàng</Typography>
            <Box marginTop={3} />
            <CustomButton 
              variant="contained" 
              backgroundColor='yellow'
              onClick={()=>{navigate('/')}}
            >
              Quay lại trang chủ
            </CustomButton>
          </Box>
        </Box>
      }
      {items.length > 0 &&
        <Box className={classes.shoppingCart} height='fit-content' padding={2} boxSizing='border-box' width='calc(100% - 348px - 16px)'>
          <Box display='flex' justifyContent='space-between' alignItems='flex-end' paddingRight={2} >
            <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 400 }}>Price</Typography>
          </Box>
          <Divider />
          {items.map((item, index) => (
            <CartItem
              key={`${item.book}`}
              _id={item.book}
              quantity={item.qualityBook}
              deleteItem={deleteItem}
              updateItem={updateItem}
              calcSubtotal={calcSubTotal}
              loading={loading}
            />
          ))}
          <Box display='flex' justifyContent='flex-end' marginTop={2} paddingRight={2}>
            <Typography variant="h6" style={{ fontWeight: 400 }}>{`Tổng (${items.length} sản phẩm):`} <b>{numberWithCommas(subtotal)}đ</b></Typography>
          </Box>
        </Box>
      }
      {items.length > 0 &&
        <>
          <Box marginRight={2} />
          <Box className={classes.rightGrid} maxWidth='348px'>
            <Box className={classes.subTotal} height='80px' display='flex' flexDirection='column' justifyContent='space-between' padding={3}>
              <Typography variant="body1" style={{ fontWeight: 400 }}>{`Tổng (${items.length} sản phẩm):`} <b>{numberWithCommas(subtotal)}đ</b></Typography>
              <Box boxSizing='border-box' width="100%">
                <CustomButton fullWidth variant="contained" backgroundColor='yellow' onClick={checkOut}
                disabled={loading}>Thanh toán</CustomButton>
              </Box>
            </Box>
            {/* <Box className={classes.youMayLike} height={500} padding={2} marginTop={2} >
              <Typography variant="h5" style={{ fontWeight: 400 }}>Bạn có thể thích</Typography>
              <Box>
                {booklist.map((data, index) => (
                  <RecommendItem
                    key={index}
                    title={data.title}
                    newprice={data.newprice}
                    oldprice={data.oldprice}
                    src={data.src}
                    author={data.author}
                    stars={data.stars}
                    votes={data.votes}
                  ></RecommendItem>
                ))}
              </Box>

            </Box> */}

          </Box>
        </>
      }

      {loading && <Loading/>}
    </Box>
  )
}

export default Cart