import { Box, Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { HighlightOff } from "@material-ui/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HEROKU_API } from "../../Services/Constants"
import { axiosPost } from "../../Services/Ultils/axiosUtils"
import { OrangeButton } from "../CustomComponent/OrangeButton"

const useStyles = makeStyles((theme) => ({
  forgetLabel: {
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    }
  }
}))

const LoginBox = ({ _setUserInfo }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = async (e) => {
    e.preventDefault()
    let response = await axiosPost(`${HEROKU_API}/auth/login`, {
      username: username,
      password: password
    })
    console.log(response)
    if (!response.success) setError(response.message)
    else {
      _setUserInfo({ ...response.data, 'username': username })
      let prevpage = localStorage.getItem('prevpage')
      if (prevpage) navigate(prevpage)
      else navigate('/')
    }
  }

  return (
    <form onSubmit={login}>

      <Box
        boxSizing='border-box'
        width='420px'
        height='450px'
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
          Đăng nhập
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
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          fullWidth
          required
          type='password'
        />

        <Box marginTop={2} />


        <OrangeButton
          fullWidth
          type='submit'
        >
          Đăng nhập
        </OrangeButton>

        <Box marginTop={1} />


        <Typography
          variant='caption'
          className={classes.forgetLabel}
          onClick={() => { navigate('/forget-password/1') }}
        >
          Quên mật khẩu
        </Typography>
      </Box>
    </form >

  )
}

export default LoginBox