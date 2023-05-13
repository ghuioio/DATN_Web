import { Box, makeStyles, Typography, Paper, Divider, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Checkbox, ButtonGroup } from "@material-ui/core";
import { CheckCircle, NotInterested } from "@material-ui/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomComponent/CustomButton";
import ThanhToanStepper from "./ThanhToanStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F3EC'
  },
}))


const ThanhToan = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { state } = useLocation()
  const user_address = state.user_address
  console.log(state, state.user_address)
  const placeOrder = () => {
    navigate('/dang-van-chuyen', { state: { user_address } })
  }

  return (
    <Box
      className={classes.root}
      width='100%'
      height='fit-content'
      boxSizing='border-box'
      paddingTop={8}
      display='flex'
    >
      <Box
        width='100%'
        height='fit-content'
        boxSizing='border-box'
        marginLeft={2}
        marginTop={2}
        marginRight={3}
        style={{ backgroundColor: '#00000000' }}
      >
        <ThanhToanStepper step={2} />
        <Box marginTop={2} />

        {/*Main area */}
        <Box
          width='100%'
          height='fit-content'
          padding={3}
          boxSizing='border-box'
          style={{ backgroundColor: '#fff' }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography
              variant="h5"
              style={{ fontWeight: '500' }}
              gutterBottom
            >
              Thanh toán
            </Typography>
            <Typography>
              Giá trị giỏ hàng: <b>10.000.000đ</b>&nbsp;+ Vận chuyển: <b>$10</b>
            </Typography>
          </Box>

          <Divider />
          <Box marginTop={2} />

          <Box>
            <Box
              display='flex'
            >
              <Box>
                <CheckCircle style={{ color: 'green', height: '100px', width: '100px' }} fontSize="large" />
              </Box>
              <Box display='flex' flexDirection='column' justifyContent='center' paddingLeft={3}>
                <Typography variant="h6" style={{ fontWeight: 400 }}>{'Số sách nạp credit >= số sách mua'}</Typography>
                <Typography >{'(2 >= 1)'}</Typography>
              </Box>
            </Box>

            <Box marginY={2}>
              <Divider />
            </Box>

            <Box
              display='flex'
              
            >
              <Box>
                <NotInterested style={{ color: 'red', height: '100px', width: '100px' }} fontSize="large" />
              </Box>
              <Box display='flex' flexDirection='column' justifyContent='center' paddingLeft={3}>
                <Typography variant="h6" style={{ fontWeight: 400 }}>{'Số dư credit >= Tổng tiền'}</Typography>
                <Typography >{'(100.000đ >= 200.000đ)'}</Typography>
                <Box marginTop={1} />
                <ButtonGroup variant="outlined" size="small" color="primary">
                  <Button>Nạp credit từ thẻ ngân hàng</Button>
                  <Button>Nạp credit từ mã quà tặng</Button>
                  <Button>Thanh toán khi nhận hàng</Button>
                </ButtonGroup>
              </Box>
            </Box>

            <Box marginY={2}>
              <Divider />
            </Box>

            <Box>
              {/* <Button variant="contained" color="primary" onClick={placeOrder}>Hoàn thành đặt hàng</Button> */}
              <CustomButton variant="contained" backgroundColor="yellow" onClick={placeOrder}>Hoàn thành đặt hàng</CustomButton>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default ThanhToan