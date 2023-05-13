import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Image from 'material-ui-image'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid4: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  gridItem: {
    width: '100%',
  },
  bigImg: {
    width: '80%',
    aspectRatio: 1,
    objectFit: 'cover',
    objectPosition: 'top',
    cursor: 'pointer',
  },
  smallImg: {
    width: '70%',
    aspectRatio: 1,
    objectFit: 'cover',
    objectPosition: 'top',
    cursor: 'pointer',
  },
  smallItem: {
    width: '100%',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'purple'
  },
  bigItem: {
    width: '100%',
    height: '280px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(1)
  },
  label: {
    marginLeft: theme.spacing(2),
    fontWeight: 'bold'
  },
  footer: {
    color: '#3F51B5',
    position: 'absolute',
    bottom: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      color: '#C7511F',
    }
  }
}))

const BoxItem = (props) => {
  const classes = useStyles()

  const getLabel = (item) => {

  }

  // useEffect(()=>{
  //   console.log(props.items)
  // }, [])

  return (
    <Grid item container xs={5} md={3} className={classes.root} justifyContent='center' >
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        width='350px'
        height='400px'
        paddingTop={2}
        zIndex={1}
        position='relative'
        style={{ backgroundColor: '#fff' }}
      >
        <Box paddingLeft={1}>
          <Typography variant='h6' style={{ fontWeight: '400' }} component="div" className={classes.label} noWrap>{props.label}</Typography>
        </Box>
        <Grid container direction="row" className={classes.grid4}>
          {props.items.map((item, index) => (
            <Grid
              key={index}
              item
              xs={props.items.length === 1 ? 12 : 6}
              className={classes.gridItem}>
              {props.items.length === 1 ? (
                <div className={classes.bigItem}>
                  <img
                    src={item.img_url}
                    className={classes.bigImg}
                    onClick={() => { console.log(item.link); window.open(item.link) }}
                  />
                  <ImageLabel
                    label={item.label}
                    sale_price={item.sale_price}
                    old_price={item.old_price}
                    sale_start={item.sale_start}
                    sale_end={item.sale_end}
                  />
                </div>
              ) : (
                <div className={classes.smallItem}>
                  <img
                    src={item.img_url}
                    className={classes.smallImg}
                    onClick={() => { console.log(item.link); window.open(item.link) }}
                  />
                </div>
              )}
            </Grid>
          ))}
        </Grid>
        <Box marginTop={2} paddingLeft={2} className={classes.footer}>
          <Typography
            onClick={() => { console.log(props.link); window.open(props.link) }}
          >
            {props.footer}
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}

BoxItem.defaultProps = {
  items: [],
  label: '',
  footer: 'Xem thêm'
}

export default BoxItem

const ImageLabel = (props) => {

  const dateToStr = (datestr) => {
    let date = new Date(datestr)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return (
    <Box
      width="100%"
      paddingLeft={8}
    >
      <Typography variant="body2" style={{ fontWeight: 'bold' }} noWrap>{props.label}</Typography>
      {props.sale_price ? (
        <Typography variant="caption" component='div' style={{ fontWeight: 'bold' }}>
          {props.sale_price}đ&nbsp;
          <Typography variant="caption" display='inline' style={{ textDecoration: 'line-through', fontSize: '12px' }}>{props.old_price}đ</Typography>
        </Typography>
      ) : (
        props.old_price && <Typography variant="caption">{props.old_price}đ</Typography>
      )}
      {props.sale_start && (
        <Typography variant="caption">{dateToStr(props.sale_start)} - {dateToStr(props.sale_end)}</Typography>
      )}
    </Box>
  )
}
