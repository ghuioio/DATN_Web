import { Box, makeStyles, Typography } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { useState } from "react"

const useStyles = makeStyles((theme) => ({
  readmore: {
    height: '100px',
    overflow: 'hidden',
    paddingTop: theme.spacing(1)
  },
  readless: {
    height: 'fit-content',
    paddingTop: theme.spacing(1)
  }
}))
const ReadMoreBox = ({ content }) => {
  const classes = useStyles()
  const [readmore, setReadmore] = useState(false)
  return (
    <Box
      position='relative'
    >
      <Box
        className={readmore ? classes.readless : classes.readmore}
      >
        <Typography component='div' variant="body1">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </Typography>
      </Box>
      {/* <Box marginTop={3} /> */}
      <Box
        display={readmore ? 'none' : 'block'}
        position='absolute'
        top='50px'
        height='50px'
        width='100%'
        style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0),#fff)' }}
      />
      <Box
        display='flex'
        alignItems='center'
        onClick={() => { setReadmore(!readmore) }}
        style={{ cursor: 'pointer' }}
      >
        {readmore ? <ExpandLess /> : <ExpandMore />}
        <Box marginLeft={1} />
        <Typography component='div' color='primary' variant="body2">{readmore ? 'Thu gọn' : 'Đọc thêm'}</Typography>
      </Box>
      
    </Box>
  )
}

export default ReadMoreBox