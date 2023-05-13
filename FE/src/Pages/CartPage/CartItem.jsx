import { Box, Button, ButtonGroup, Divider, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import { Add, AddBox, Delete, IndeterminateCheckBox } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { HEROKU_API } from "../../Services/Constants";
import { CustomButton } from "../CustomComponent/CustomButton";
import { choices } from "../ProductPage/BookDetails";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100px',
    height: '140px',
    objectFit: 'cover',
    objectPosition: 'top',
    cursor: 'pointer'
  },
  formControl: {
    minWidth: 60
  },
  amountButton: {
    width: 8,
    height: 8,
    fontSize: 8
  },
  functionButton: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
}))

const CartItem = (props) => {
  const classes = useStyles()
  const [details, setDetails] = useState(null)
  // const [amount, setAmount] = useState(1)
  // const isChangeAmount = useRef(false)
  const changeAmount = (isAdd) => (event) => {
    // isChangeAmount.current = true
    if (isAdd) {
      // setAmount(prev => prev + 1)
      props.updateItem(props._id, props.quantity + 1)
    }
    else if (props.quantity > 0) {
      // setAmount(prev => prev - 1)
      props.updateItem(props._id, props.quantity - 1)
    }
  }

  useEffect(() => {
    if (!props._id) return
    const getData = async () => {
      let response = await axiosGet(`${HEROKU_API}/books/${props._id}`)
      let data = response.data
      console.log(data)
      let details = {
        image: data.imageURL[0],
        authors: [data.author],
        title: data.name,
        price: data.price,
        quantity: props.quantity
      }
      setDetails(details)

      props.calcSubtotal()
    }
    getData()
  }, [props._id])

  // useEffect(() => {
  //   if (!isChangeAmount.current) return
  //   isChangeAmount.current = false
  //   props.updateItem(props._id, amount)
  // }, [amount])

  // useEffect(() => {
  //   if (props.quantity) setAmount(props.quantity)
  // }, [props.quantity])

  const navigate = useNavigate()
  const goToProductPage = () => {
    navigate(`/product/${props._id}`)
  }

  return (
    <div>
      {!!details &&
        <>
          <Box
            display='flex'
            padding={2}
            boxSizing='border-box'
            justifyContent='space-between'
            height={170}
          >
            <Box width='120px'>
              <img
                className={classes.img}
                src={`${details.image}`}
                onClick={() => { goToProductPage() }}
              />
            </Box>
            <Box
              width='calc(100% - 200px)'
              position='relative'
              paddingX={2}
              boxSizing='border-box'
            >
              <Typography variant='h6' component='div' noWrap onClick={() => { goToProductPage() }} className={classes.title}>{details.title}</Typography>
              <Typography variant='subtitle1' component='div'>{`by ${details.authors.join(', ')}`}</Typography>
              <Typography style={{ color: 'orange' }}>({numberWithCommas(details.price)}đ)</Typography>
              <Box
                width='100%'
                position='absolute'
                bottom={-5}
                display='flex'
                alignItems='center'
              >
                <IconButton 
                  className={classes.amountButton} 
                  onClick={changeAmount(true)}
                  disabled={props.loading}
                ><AddBox></AddBox></IconButton>
                <Box marginLeft={1} />
                <Typography component='div'>{props.quantity}</Typography>
                <Box marginLeft={1} />
                <IconButton 
                  className={classes.amountButton} 
                  onClick={changeAmount(false)}
                  disabled={props.loading || props.quantity === 1}
                ><IndeterminateCheckBox></IndeterminateCheckBox></IconButton>
                {/* <ButtonGroup variant="text" size="small">
              <Button color="primary" className={classes.functionButton} variant>Xóa</Button>
              <Button color="primary" className={classes.functionButton}>Save for later</Button>
              <Button color="primary" className={classes.functionButton}>Compare with similar items</Button>
            </ButtonGroup> */}
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
              alignItems='flex-end'
            >
              <Typography align="right" variant="h6"><span className="cart-item-price">{`${numberWithCommas(details.price * props.quantity)}đ`}</span></Typography>
              <CustomButton variant="contained" backgroundColor='white' size="small" width='80px' onClick={props.deleteItem(props._id)} disabled={props.loading}>Xóa</CustomButton>
            </Box>
          </Box>
          <Divider />
        </>
      }
      {!!!details &&
        <Box
          display='flex'
          padding={2}
          boxSizing='border-box'
          // justifyContent='space-between'
          height={170}
        >
          <Box width='120px'>
            <Skeleton variant="rect" width={'100%'} height={'100%'} />
          </Box>
          <Box
            width='calc(100% - 200px)'
            position='relative'
            paddingX={2}
            boxSizing='border-box'
          >
            <Skeleton variant="text" width={'300px'} />
            <Skeleton variant="text" width={'200px'} />
            <Skeleton variant="text" width={'180px'} />
          </Box>
        </Box>
      }
    </div>

  )
}

CartItem.defaultProps = {
  src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
  title: 'Harry Potter',
  author: 'JK Rowling',
  coverType: 'Paper back',
  price: 13.02,
  maxAmount: 10
}

export default CartItem