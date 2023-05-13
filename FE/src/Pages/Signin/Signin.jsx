import { Box, Divider} from "@material-ui/core"
import LoginBox from "./LoginBox"
import RegisterBox from "./RegisterBox"

const Signin = ({ _setUserInfo }) => {

  return (
    <Box
      width='100%'
      height='100%'
      style={{
        // backgroundImage: 'url("https://wallpapercrafter.com/th800/221212-book-market-book-sale-and-bookstore-hd.jpg")',
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
        backgroundColor: '#F4F3EC'
      }}
      boxSizing='border-box'
      paddingTop={8}
    >
      <Box
        marginTop={8}
        display='flex'
        justifyContent='space-evenly'
      >
        <LoginBox _setUserInfo={_setUserInfo}/>
        <Divider flexItem orientation="vertical"/>
        <RegisterBox/>
      </Box>
      <Box marginTop={10}/>
    </Box>
  )
}

export default Signin