import { Box, Button, Divider, TextField, Typography } from "@material-ui/core"

const DSDonHangNap = () => {
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
          Danh sách đơn hàng nạp sách
        </Typography>

      </Box>

      <Divider />
      <Box marginTop={2} />

    </Box>
  )
}

export default DSDonHangNap