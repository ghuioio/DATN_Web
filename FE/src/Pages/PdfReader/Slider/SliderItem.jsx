import { Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  img: {
    height: '150px',
    width: '180px',
    objectFit: 'cover',
    objectPosition: 'top'
  }
}))

const SliderItem = (props) => {
  const classes = useStyles()

  const dateToStr = (datestr) => {
    let date = new Date(datestr)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return (
    <Box
      height='250px'
      width='180px'
      style={{backgroundColor: '#fff', overflow: 'hidden', cursor: 'pointer'}}
      boxShadow={2}
      borderRadius={5}
    >
      <Link to={`/product/${props.id}`}>
        <Box
          height='150px'
          width='180px'
        >
          <img src={props.src} className={classes.img}/>
        </Box>
        <Box
          marginTop={2}
          boxSizing='border-box'
          paddingLeft={1}
        >
          <Typography color='primary' variant="body2" style={{ fontWeight: '400' }} noWrap>{props.label}</Typography>
          {props.sale_price ? (
            <Typography variant="body1" component='div' style={{ fontWeight: '500' }}>
              {props.sale_price}đ&nbsp;
              <Typography variant="caption" display='inline' style={{ textDecoration: 'line-through', fontSize: '12px' }}>{props.old_price}đ</Typography>
            </Typography>
          ) : (
            props.old_price && <Typography variant="button">{props.old_price}đ</Typography>
          )}
          {props.sale_start && (
            <Typography variant="caption">{dateToStr(props.sale_start)} - {dateToStr(props.sale_end)}</Typography>
          )}
        </Box>
      </Link>
    </Box>
  )

}

SliderItem.defaultProps = {
  sale_price: '',
  old_price: '',
  src: '',
  label: '',
  sale_start: '',
  sale_end: '',
  link: '',
  id: 1,
}

export default SliderItem