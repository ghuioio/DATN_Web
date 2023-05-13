import { Box, makeStyles, Typography, Paper, Divider, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Checkbox, ButtonGroup, Input } from "@material-ui/core";
import { CheckCircle, NotInterested } from "@material-ui/icons";
import { useState } from "react";
import AccountInfo from "./AccountInfo";
import AccountManage from "./AccountManage";
import BienDongSoDu from "./BienDongSoDu";
import DSDonHangNap from "./DSDonHangNap";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F3EC'
  },
}))


const ProfilePage = () => {
  const classes = useStyles()
  const [valid, setValid] = useState(true)
  const submit = () => {
    setValid(!valid)
  }
  return (
    <Box
      className={classes.root}
      width='100%'
      height='fit-content'
      boxSizing='border-box'
      paddingTop={8}
      paddingX={2}
    >
      {/*Main area */}
      <AccountInfo/>
      <BienDongSoDu/>
      <AccountManage/>
      <DSDonHangNap/>
    </Box>
  )
}

export default ProfilePage