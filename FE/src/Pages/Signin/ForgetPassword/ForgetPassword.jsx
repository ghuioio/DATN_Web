import { Box, Divider } from "@material-ui/core"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import LoginBox from "../LoginBox"
import RegisterBox from "../RegisterBox"
import PasswordStep1 from "./PasswordStep1"
import PasswordStep2 from "./PasswordStep2"

const ForgetPassword = () => {
  const { step } = useParams()
  console.log(step)
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
        {step === '1' && <PasswordStep1 />}
        {step === '2' && <PasswordStep2 />}
      </Box>

      <Box marginTop={10}/>


    </Box>
  )
}

export default ForgetPassword