import { Box, Button, Divider, IconButton, makeStyles, Slide, Snackbar, TextField, Typography } from "@material-ui/core";
import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import isNumber from "is-number";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { common_variable } from "../common";
import { BASE_API, HEROKU_API } from "../../Services/Constants";
import { CustomButton, MyButton } from "../CustomComponent/CustomButton";
import Loading from "../Loading";
import { axiosPost } from "../../Services/Ultils/axiosUtils";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";
import SeeAllImage from "./SeeAllImage";
import './TextField.css'
import axios from "axios";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  priceBox: {
    backgroundColor: theme.palette.common.white,
  },
  bigImage: {
    objectFit: 'fill',
    width: '95%',
    height: 'auto',
    boxShadow: '0px 0px 15px 0px grey',
    objectPosition: 'top'
  },
  smallImage: {
    objectFit: 'cover',
    width: '24%',
    height: '50px',
    objectPosition: 'top'
  },
}))

function TransitionRight(props) {
  return (
    <Slide {...props} direction="right">
      <Alert
        severity="success"
        elevation={6} variant="filled"
      >
        Đã thêm vào giỏ
      </Alert>
    </Slide>
  )
}

const PriceBox = ({ smallImages, price, setRefreshNavbar, maxAmount, userInfo, loading, setLoading }) => {
  const classes = useStyles()
  const [amount, setAmount] = useState(1)
  const [buyable, setBuyable] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  let [searchParams] = useSearchParams()
  let buy_amount = searchParams.get('buy_amount')

  useEffect(() => {
    if (!isNumber(buy_amount)) return
    let value = parseInt(buy_amount)
    console.log('buy amount', value >= 0 ? value : 0)
    setAmount(value >= 0 ? value : 0)
  }, [buy_amount])

  useEffect(() => {
    let buyable = isNumber(amount) && amount > 0 && parseFloat(amount) === parseInt(amount) && amount <= maxAmount
    setBuyable(buyable)
  }, [amount])

  const handleClickAmount = (isAdd) => (event) => {
    if (isAdd) setAmount(amount + 1)
    else if (amount > 0) setAmount(amount - 1)
  }

  let { id } = useParams()

  useEffect(() => {
    setAmount(1)
  }, [id])
  const navigate = useNavigate()
  const addToCart = async () => {

    if (!userInfo) {
      // console.log(window.location.pathname)
      localStorage.setItem('prevpage', window.location.pathname)
      navigate('/signin')
      return
    } 

    let cart = JSON.parse(localStorage.getItem('cart'))
    let sameIndex = cart.findIndex(book => book.book === id)
    if (sameIndex !== -1) cart[sameIndex].qualityBook += amount
    else cart.push({
      book: id,
      qualityBook: amount
    })
    setLoading(true)
    let response = await axiosPost(`${HEROKU_API}/cart`, cart, true)
    if (!response || !response.success) return
    localStorage.setItem('cart', JSON.stringify(cart))
    setLoading(false)
    console.log('cart', cart)
    setOpenAlert(true)
    setRefreshNavbar(prev => !prev)
  }

  const onChangeAmount = (event) => {
    let value = event.target.value
    setAmount(value)
  }

  const onBlur = (event) => {
    let value = Number(event.target.value)
    let isValid = isNumber(value) && value >= 0
    if (isValid) setAmount(Math.floor(value))
    else setAmount(0)
  }


  return (
    <Box
      id='price-box'
      width='320px'
      minWidth='320px'
      height='fit-content'
      padding={2}
      boxSizing='border-box'
      className={classes.priceBox}
      border={6}
      borderRadius={10}
      borderColor='grey.200'
      overflow='hidden'
    >
      <Box
        display='flex'
        justifyContent='space-between'
      >
        <Typography variant='h6'>Giá</Typography>
        <Typography variant='h6' color="secondary">{numberWithCommas(price)}đ</Typography>
      </Box>

      <Box marginTop={4} />

      <SeeAllImage
        smallImages={smallImages}
      />

      <Box paddingTop={0.5} paddingBottom={1.5}><Divider /></Box>


      <Box marginTop={1}></Box>
      <Typography
        style={{ color: (maxAmount > 0) ? 'green' : 'red', fontWeight: '500' }} 
        variant="h6"
      >{(maxAmount > 0) ? `Còn ${maxAmount} sản phẩm` : 'Hết hàng'}</Typography>

      <Box
        display='flex'
        alignItems='center'
      >

        <Typography variant='body2'>Số lượng:</Typography>
        <IconButton onClick={handleClickAmount(true)}><AddBox></AddBox></IconButton>

        {/* <Typography component='div' variant='body2'>{amount}</Typography> */}
        <TextField type='number' value={amount} onChange={onChangeAmount} style={{ width: '50px', textAlign: 'center' }} inputProps={{ style: { textAlign: 'center' } }} onBlur={onBlur} />
        <IconButton disabled={amount === 0} onClick={handleClickAmount(false)}><IndeterminateCheckBox></IndeterminateCheckBox></IconButton>
      </Box>

      <Box
        marginTop={2}
      >
        {/* <Button color='primary' variant="contained" fullWidth onClick={addToCart} disabled={amount === 0}>Thêm vào giỏ hàng</Button> */}
        <CustomButton backgroundColor='yellow' borderRadius='round' variant="contained" fullWidth onClick={addToCart} disabled={!buyable || loading}>Thêm vào giỏ hàng</CustomButton>
        <Box marginTop={1}></Box>

        {/* <Button color='secondary' variant="contained" fullWidth disabled={amount === 0}>Mua ngay</Button> */}
        {/* <CustomButton backgroundColor='orange' borderRadius='round' variant="contained" fullWidth disabled={!buyable}>Mua ngay</CustomButton> */}
      </Box>

      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => { setOpenAlert(false) }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={TransitionRight}
      >

      </Snackbar>


    </Box>
  )
}

export default PriceBox