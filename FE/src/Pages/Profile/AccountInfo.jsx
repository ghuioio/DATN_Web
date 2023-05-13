import { Box, Button, Divider, TextField, Typography } from "@material-ui/core"
import { CustomButton } from "../CustomComponent/CustomButton"

const AccountInfo = () => {
  return (
    <Box
      width='100%'
      height='fit-content'
      padding={3}
      boxSizing='border-box'
      style={{ backgroundColor: '#fff' }}
      // marginLeft={2}
      marginTop={2}
      // marginRight={3}
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
          Thông tin tài khoản
        </Typography>

      </Box>

      <Divider />
      <Box marginTop={2} />

      <Box width='60%'>
        <form>
          <TextField required label="Tên" fullWidth id="username" variant="outlined" size="small"/>
          <Box marginTop={1} />
          <TextField required label="Số điện thoại" fullWidth id="phone" variant="outlined" type='number' size="small"/>
          <Box marginTop={1} />
          <TextField required label="Email" fullWidth id="email" variant="outlined" size="small"/>
          <Box marginTop={2} />
          {/* <Button type="submit" variant="contained" color="primary" style={{ width: 300 }}>Cập nhật</Button> */}
          <CustomButton type="submit" variant="contained" backgroundColor="yellow" style={{ width: 300 }} borderRadius='amazon'>Cập nhật</CustomButton>
        </form>
      </Box>

    </Box>
  )
}

export default AccountInfo