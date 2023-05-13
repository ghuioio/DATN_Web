import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core"
import { CustomButton } from "../../CustomComponent/CustomButton"
import { numberWithCommas, phoneNumberWithSpace } from "../../../Services/Ultils/NumberUtils"

const useStyles = makeStyles(theme => ({
  submitButton: {
    width: '300px',
  },
}))

const Address = (props) => {
  const classes = useStyles()

  const getAddress = () => {
    return {
      _id: props._id,
      name: props.name,
      mobile: props.mobile,
      province: props.province,
      district: props.district,
      ward: props.ward,
      street: props.street,
      is_office: props.is_office
    }
  }

  return (
    <Box>
      <Typography variant="body1" style={{ fontWeight: 500 }}>{props.name}</Typography>
      <Typography variant="body2">{props.street}</Typography>
      <Typography variant="body2">{props.ward},&nbsp;{props.district},&nbsp;{props.province}</Typography>
      <Typography variant="body2" component='div'>Số điện thoại:&nbsp;<span style={{ fontWeight: 500 }}>{phoneNumberWithSpace(props.mobile)}</span></Typography>
      {/* <Typography variant="body2" component='div'>Phí ship:&nbsp;<span style={{ fontWeight: 500, color: '#3E50B4' }}>{numberWithCommas(props.price)}đ</span></Typography> */}

      <Box marginTop={1} />
      {/* <Button size='small' className={classes.submitButton} color="primary" variant="contained" onClick={props.chooseAddress(getAddress())}>Giao đến địa chỉ này</Button> */}
      <CustomButton size='small' className={classes.submitButton} backgroundColor="yellow" variant="contained" onClick={props.chooseAddress(getAddress())}>Giao đến địa chỉ này</CustomButton>
      <Box display='flex' width='300px' marginTop={1}>
        <Button fullWidth variant="outlined" size="small" onClick={props.onClickUpdateAddress(getAddress())}>Sửa</Button>
        <Box marginLeft={1} />
        <Button fullWidth variant="outlined" size="small" onClick={props.deleteAddress(props._id)}>Xóa</Button>
      </Box>
    </Box>
  )
}

export default Address