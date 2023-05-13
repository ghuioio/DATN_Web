import { Box, Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { CheckCircleOutline, HighlightOff } from "@material-ui/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HEROKU_API } from "../../../Services/Constants"
import { axiosPost } from "../../../Services/Ultils/axiosUtils"
import { OrangeButton } from "../../CustomComponent/OrangeButton"

const useStyles = makeStyles((theme) => ({
  forgetLabel: {
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    }
  }
}))

const PasswordStep2 = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    let response = await axiosPost(`${HEROKU_API}/auth/confirm/forgot`, {
      "email": email,
      "code": Number(code),
      "password": password1,
      "confirmPassword": password2
    })
    console.log(response)
    if (!response.success) setError(response.message)
    else {
      setSuccess(true)
    }
  }

  return (
    <form onSubmit={send}>

      <Box
        boxSizing='border-box'
        width='420px'
        height='fit-content'
        style={{ backgroundColor: 'white' }}
        borderRadius='5px'
        padding={4}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Typography
          variant='button'
          style={{ fontWeight: 500, fontSize: '25px', fontFamily: "Gulzar, serif" }}
        >
          Mật khẩu mới
        </Typography>

        <Box marginTop={2} />

        {!!error &&
          <>
            <Box
              width='100%'
              minHeight='56px'
              height='fit-content'
              style={{ backgroundColor: '#FFF9FA' }}
              border='1px solid #FFD4D8'
              borderRadius='5px'
              display='flex'
              padding={2}
              boxSizing='border-box'
            >
              <HighlightOff style={{ fontSize: '20px' }} color='error' />
              <Box marginLeft={2} />
              <Typography variant='body2'>
                {error}
              </Typography>
            </Box>

            <Box marginTop={2} />
          </>}
        {success &&
          <>
            <Box
              width='100%'
              minHeight='56px'
              height='fit-content'
              style={{ backgroundColor: '#BFFAB2' }}
              border='1px solid #FFD4D8'
              borderRadius='5px'
              display='flex'
              padding={2}
              boxSizing='border-box'
            >
              <CheckCircleOutline style={{ fontSize: '20px', color: 'green' }} />
              <Box marginLeft={2} />
              <Typography variant='body2'>
                Cập nhật mật khẩu thành công
              </Typography>
            </Box>

            <Box marginTop={2} />
          </>}

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          fullWidth
          required
        />
        <Box marginTop={2} />

        <TextField
          label="Mã xác nhận"
          variant="outlined"
          value={code}
          onChange={(e) => { setCode(e.target.value) }}
          fullWidth
          required
        />
        <Box marginTop={2} />

        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          value={password1}
          onChange={(e) => { setPassword1(e.target.value) }}
          fullWidth
          required
          type='password'
        />

        <Box marginTop={2} />

        <TextField
          label="Nhập lại mật khẩu"
          variant="outlined"
          value={password2}
          onChange={(e) => { setPassword2(e.target.value) }}
          fullWidth
          required
          type='password'
        />

        <Box marginTop={2} />

        {success ?
          <OrangeButton
            fullWidth
            onClick={()=>{navigate('/signin')}}
          >
            quay về trang đăng nhập
          </OrangeButton>
          :
          <OrangeButton
            fullWidth
            type='submit'
            disabled={success}
          >
            Gửi
          </OrangeButton>
        }

      </Box>
    </form >

  )
}

export default PasswordStep2