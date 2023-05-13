import { Box, Button, Divider, makeStyles, styled, Typography } from "@material-ui/core"
import { Check, Email, PhoneEnabled } from "@material-ui/icons"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CustomButton } from "../../Pages/CustomComponent/CustomButton"
import { OrangeButton } from "../../Pages/CustomComponent/OrangeButton"
import { WhiteButton } from "../../Pages/CustomComponent/WhiteButton"
const Footer = ({ signedIn }) => {
  const navigate = useNavigate()

  return (
    <>
      <Box
        width='100%'
        height='fit-content'
        boxSizing='border-box'
        padding={3}
        paddingTop={4}
        style={{ backgroundColor: '#13130D' }}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifySelf='start'
        zIndex={1002}
      >
        <Box width='90%' maxWidth='1500px'>
          <Box
            width='100%'
            height='fit-content'
            display='flex'
            justifyContent='space-between'
            paddingX={4}
            boxSizing='border-box'
            gridColumnGap={30}
          >
            <Box minWidth='219px'>
              <TypoHeader>Liên hệ với chúng tôi</TypoHeader>
              <Box marginTop={3} />
              <Box display='flex' alignItems='center'>
                <PhoneEnabled style={{ color: '#949380' }} />
                <Box marginLeft={2} />
                <TypoNormal>8888.888.888</TypoNormal>
              </Box>
              <Box display='flex' alignItems='center'>
                <Email style={{ color: '#949380' }} />
                <Box marginLeft={2} />
                <TypoNormal>book&chill@gmail.com</TypoNormal>
              </Box>
            </Box>
            <Box minWidth='150px'>
              <TypoHeader>Dịch vụ</TypoHeader>
              <Box marginTop={3} />
              <TypoLink link='/dieu-khoan'>Điều khoản sử dụng</TypoLink>
              <TypoLink link='/chinh-sach-bao-mat'>Chính sách bảo mật</TypoLink>
              <TypoLink link='/gioi-thieu'>Giới thiệu nhà sách</TypoLink>
            </Box>
            <Box minWidth='203px'>
              <TypoHeader>Hỗ trợ</TypoHeader>
              <Box marginTop={3} />
              <TypoNormal>Chính sách đổi trả hoàn tiền</TypoNormal>
              <TypoNormal>Phương thức vận chuyển</TypoNormal>
            </Box>

            <Box maxWidth='400px' minWidth='211px'>
              <TypoHeader>{'Bạn là thành viên Book&Chill?'}</TypoHeader>
              <Box marginTop={3} />
              <TypoNormal>Hãy đăng nhập để thưởng thức một cách trọn vẹn tất cả tác phẩm của chúng tôi.</TypoNormal>
              <Box marginTop={2} />
              {signedIn ?
                <TypoNormal>Bạn đã đăng nhập <Check/></TypoNormal>
                :
                <FooterButton onClick={() => navigate('/signin')} >Đăng nhập / Đăng ký</FooterButton>
              }

            </Box>
          </Box>
          <Box marginTop={6} />
          <Divider flexItem style={{ backgroundColor: '#949380', height: '1px', width: '100%' }} />
          <Box marginTop={4} />
          <Box width='100%'>
            <TypoNormal>Copyright 2022@book&chill</TypoNormal>
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default Footer

const TypoHeader = (props) => {
  return (
    <Typography
      style={{ color: '#ebe9cf' }}
      variant='h5'
    >
      {props.children}
    </Typography>
  )
}

const TypoNormal = (props) => {
  return (
    <Typography style={{ color: '#949380' }} gutterBottom>{props.children}</Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  typoLink: {
    '&:hover': {
      textDecoration: 'underline'
    },
  }
}))

const TypoLink = ({ link, ...props }) => {
  const classes = useStyles()

  return (
    <Link to={!!link ? link : '/'}>
      <Typography className={classes.typoLink} style={{ color: '#949380' }} gutterBottom>{props.children}</Typography>
    </Link>
  )
}

const FooterButton = styled(Button)(({ width }) => ({
  backgroundColor: '#13130D',
  color: '#c9a050',
  '&:hover': {
    backgroundColor: '#c9a050',
    color: 'white'
  },
  borderRadius: '0.25rem',
  width: width,
  border: '1px solid #c9a050',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '25px',
  paddingRight: '25px'
}))