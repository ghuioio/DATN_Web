import { Box, makeStyles, Typography } from "@material-ui/core"
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'
import img4 from './images/4.png'

const colors = [
  { border: '#187EA0', background: '#20A8D8' },
  { border: '#54BAD6', background: '#63C2DE' },
  { border: '#C69500', background: '#FFC032' },
  { border: '#F52F2E', background: '#F86C6B' },
]

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    objectPosition: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
}))

const StatBox = ({ name, value, color = 0 }) => {

  const classes = useStyles()

  const getImg = (color) => {
    switch (color) {
      case 0: return <img src={img1} className={classes.img} />;
      case 1: return <img src={img2} className={classes.img} />;
      case 2: return <img src={img3} className={classes.img} />;
      case 3: return <img src={img4} className={classes.img} />;
    }
  }
  return (
    <>
      <Box
        flexGrow={1}
        height='210px'
        style={{ backgroundColor: colors[color].background, borderColor: colors[color].border }}
        border='2px solid'
        borderRadius={5}
        boxSizing='border-box'
        // paddingLeft={3}
        paddingTop={4}
        position='relative'
        // maxWidth='370px'
        overflow='hidden'
        width='25%'
      >
        <Box paddingLeft={3}>
          <Typography variant='h5' style={{ color: '#fff', fontWeight: 'bold' }}>{value}</Typography>
          <Box marginTop={1} />
          <Typography style={{ color: '#fff' }}>{name}</Typography>
        </Box>

        {getImg(color)}
      </Box>
    </>
  )
}

export default StatBox