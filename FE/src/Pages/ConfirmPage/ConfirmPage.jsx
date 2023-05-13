import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import { CheckCircleRounded } from "@material-ui/icons"
import { useLocation, useNavigate } from "react-router-dom"
import { common_variable } from "../common"
import { PrevChooseAddress } from "../../Services/Constants"
import { CustomButton } from "../CustomComponent/CustomButton"
import { numberWithCommas } from "../../Services/Ultils/NumberUtils"

const useStyles = makeStyles((theme) => ({
  img: {
    height: '150px',
    width: 'auto',
  }
}))

const ConfirmPage = (props) => {
  const classes = useStyles()

  const { state } = useLocation()

  const navigate = useNavigate()
  const goToCart = () => {
    navigate('/cart')
  }
  const checkOut = () => {
    navigate('/chon-dia-chi', {state: {prev: PrevChooseAddress.CHECK_OUT}})
  }

  return (
    <Box
      height='fit-content'
      width='100%'
      boxSizing='border-box'
      paddingTop={8}
      display='flex'
      paddingX={2}
    >
      <Box
        flex={1}
        height='250px'
        padding={3}
        boxSizing='border-box'
        style={{ backgroundColor: '#fff' }}
        marginTop={2}
        marginRight={3}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {state.prev === 'product-page' &&
          <Box
            display='flex'
            alignItems='center'
          >
            <img src={state.src} alt='book image' className={classes.img} />
            <Box marginLeft={4} />
            <CheckCircleRounded fontSize="large" style={{ color: 'green' }} />
            <Box marginLeft={1} />
            <Typography style={{ fontWeight: 'bold' }}>Đã thêm vào giỏ</Typography>
          </Box>
        }
      </Box>

      {state.prev === 'product-page' &&
        <Box
          width='350px'
          height='250px'
          padding={3}
          boxSizing='border-box'
          style={{ backgroundColor: '#fff' }}
          marginTop={2}
        >
          <Typography style={{ fontWeight: 'bold' }}>Tổng tiền ({`${props.item_count}`} sản phẩm): {`${numberWithCommas(props.total_price)}đ`}</Typography>
          <Box marginTop={4} />
          {/* <Button fullWidth color="primary" variant="contained" onClick={checkOut}>Thanh toán</Button> */}
          <CustomButton fullWidth variant="contained" onClick={checkOut} backgroundColor='yellow' borderRadius='8px'>Thanh toán</CustomButton>
          <Box marginTop={2} />
          {/* <Button fullWidth color="secondary" variant="contained" onClick={goToCart}>Đến giỏ hàng</Button> */}
          <CustomButton fullWidth variant="contained" onClick={goToCart} backgroundColor='white' borderRadius='8px'>đến giỏ hàng</CustomButton>

        </Box>
      }

    </Box>
  )

}

ConfirmPage.defaultProps = {
  total_price: 10000,
  item_count: 5
}

export default ConfirmPage