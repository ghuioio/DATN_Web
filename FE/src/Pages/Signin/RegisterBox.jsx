import { Box, Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { CheckCircleOutline, HighlightOff } from "@material-ui/icons"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HEROKU_API } from "../../Services/Constants"
import { axiosPost } from "../../Services/Ultils/axiosUtils"
import { OrangeButton } from "../CustomComponent/OrangeButton"

const RegisterBox = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const resetState = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPassword2('')
    setError('')
  }
  const login = async (e) => {
    e.preventDefault()
    let response = await axiosPost(`${HEROKU_API}/auth/register`, {
      username,
      email,
      password,
      password2
    })
    if (!response.success) setError(response.message)
    else {
      setError('')
      setSuccess(true)
      resetState()
    }
    console.log(response)
  }

  useEffect(() => {
    let t = 0
    if (success) {
      t = setTimeout(() => { setSuccess(false) }, 5000)
    }
    return () => { clearTimeout(t) }
  }, [success])

  return (
    <form onSubmit={login}>

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
          Đăng ký
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
          </>
        }
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
                Đăng ký thành công
              </Typography>
            </Box>

            <Box marginTop={2} />
          </>
        }

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          fullWidth
          required
        />
        <Box marginTop={2} />
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
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          fullWidth
          required
          type='password'
        />
        <Box marginTop={2} />
        <TextField
          label="Nhập lại Password"
          variant="outlined"
          value={password2}
          onChange={(e) => { setPassword2(e.target.value) }}
          fullWidth
          required
          type='password'
        />
        <Box marginTop={2} />

        <OrangeButton
          fullWidth
          type='submit'
        >
          Đăng ký
        </OrangeButton>
      </Box>
    </form >

  )
}

export default RegisterBox