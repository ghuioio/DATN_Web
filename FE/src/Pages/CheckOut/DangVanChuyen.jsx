import { Box, makeStyles, Typography, Divider, Button } from "@material-ui/core";
import { numberWithCommas, phoneNumberWithSpace } from "../../Services/Ultils/NumberUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ThanhToanStepper from "./ThanhToanStepper";
import { CustomButton } from "../CustomComponent/CustomButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F3EC'
  },
  submitButton: {
    width: '200px',
  },
  image: {
    width: 'auto',
    height: '200px',
    objectFit: 'cover',
  }
}))

const DangVanChuyen = (props) => {
  const classes = useStyles()
  const { state } = useLocation()

  const mbook_address = {
    name: "Monsters Books",
    street: "Số 1, đường Cổ Linh",
    ward: "Thạch Bàn",
    district: "Long Biên",
    province: "Hà Nội",
    mobile: "012345678",
  }

  const navigate = useNavigate()

  const isMBookShip = state && state.user_address

  const address = isMBookShip ? state.user_address : mbook_address

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
              {/* {isMBookShip ? '[Mbooks] ' : `[${props.username}] `} */}
              Đặt hàng thành công
            </Typography>

          </Box>

          <Divider />

          <Box
            display='flex'
            marginTop={3}
            boxSizing='border-box'
            paddingLeft={5}
          >
            <img src='https://cdn-icons-png.flaticon.com/512/237/237383.png' alt="shipping-truck" className={classes.image} />
            <Box marginLeft={10} />
            <Box
              width='60%'
              display='flex'
              flexDirection='column'
              justifyContent='center'
            >
              {isMBookShip ? (
                <Typography variant="h6">Địa điểm vận chuyển</Typography>
              ) : (
                <Typography variant="h6">Vui lòng vận chuyển tới cơ sở Monsters Books, chú ý bảo quản sách</Typography>
              )}

              <Box marginTop={1} />
              <Typography variant="body1" style={{ fontWeight: 500 }}>{address.name}</Typography>
              <Typography variant="body2">{address.street}</Typography>
              <Typography variant="body2">{address.ward},&nbsp;{address.district},&nbsp;{address.province}</Typography>
              <Typography variant="body2" component='div'>Số điện thoại:&nbsp;<span style={{ fontWeight: 500 }}>{phoneNumberWithSpace(address.mobile)}</span></Typography>
              {/* <Typography variant="body2" component='div'>Phí ship:&nbsp;<span style={{ fontWeight: 500, color: '#3E50B4' }}>{numberWithCommas(address.price)}đ</span></Typography> */}
              <Box marginTop={2}>
                <CustomButton 
                  backgroundColor='yellow' 
                  variant='contained'
                  onClick={()=>{navigate('/')}}
                >
                  Tiếp tục mua sắm {'>'}
                </CustomButton>
              </Box>
            </Box>

          </Box>



          <Box
            marginTop={5}
            marginBottom={2}
          >
            <Divider />
          </Box>


          {/* <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Button color="primary" variant="contained" >Nhắc Mbooks chậm trễ</Button>

        </Box> */}
        </Box>

      </Box>

    </Box>
  )
}

DangVanChuyen.defaultProps = {
  username: 'Tuan',
  isMBookShip: false,
  address1: '103 Ha Huy Tap',
  address2: 'Yen Vien',
  address3: 'Gia Lam',
  address4: 'Ha Noi',
  phone: '0386028080',
  price: 30000,
}

export default DangVanChuyen