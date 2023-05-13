import { Box, Button, Divider, TextField, Typography } from "@material-ui/core"
import { CustomButton } from "../CustomComponent/CustomButton"

const AccountManage = () => {
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
          Quản lý tài khoản
        </Typography>

      </Box>

      <Divider />
      <Box marginTop={2} />

      {/* <Button variant="contained" color="primary" style={{ width: 300 }}>Quản lý thông tin đăng nhập</Button> */}
      <CustomButton variant="contained" backgroundColor="yellow" borderRadius='amazon' style={{ width: 300 }}>Quản lý thông tin đăng nhập</CustomButton>
    
      <Box marginTop={2} />
      {/* <Button variant="contained" color="primary" style={{ width: 300 }}>Quản lý public profile</Button> */}
      <CustomButton variant="contained" backgroundColor="yellow" borderRadius='amazon' style={{ width: 300 }}>Quản lý public profile</CustomButton>
    

    </Box>
  )
}

export default AccountManage