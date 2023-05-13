import { Box, Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { HighlightOff } from "@material-ui/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HEROKU_API } from "../../../Services/Constants"
import { axiosPost } from "../../../Services/Ultils/axiosUtils"
import { OrangeButton } from "../../CustomComponent/OrangeButton"

const useStyles = makeStyles((theme)=>({
  forgetLabel: {
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    }
  }
}))

const PasswordStep1 = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const send = async (e) => {
    e.preventDefault()
    let response = await axiosPost(`${HEROKU_API}/auth/forgotPassword`, {
      email: email
    })
    if (!response.success) setError(response.message)
    else {
      navigate('/forget-password/2', {state: {email: email}})
    }
  }

  return (
    <form onSubmit={send}>

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
          Email xác nhận
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          fullWidth
          required
        />
        <Box marginTop={2} />

        <OrangeButton
          fullWidth
          type='submit'
        >
          Gửi
        </OrangeButton>

      </Box>
    </form >

  )
}

export default PasswordStep1