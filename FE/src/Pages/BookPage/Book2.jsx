import { Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { Check, CheckCircleRounded } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: 'calc(100% - 5px)',
    // maxWidth: '190px',
    // paddingLeft: '10px'
  },
  media: {
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
    boxSizing: 'border-box'
  },
  img: {
    height: '100%',
    maxWidth: 'calc(100% - 10px)',
    objectFit: 'cover',
    objectPosition: 'top'
  },
  cardActionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  }
}))

const Book2 = (props) => {
  const classes = useStyles()

  const dateToStr = (datestr) => {
    let date = new Date(datestr)

    if (date instanceof Date && !isNaN(date))
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    else return datestr
  }

  return (
    <Card className={classes.root} elevation={props.elevation}>
      <Link to={`/product/${props.link}`}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.media}
          >
            <img src={props.img_url} className={classes.img} />
          </CardMedia>
          <Box
            marginTop={1}
            paddingX={props.paddingX}
            paddingBottom={2}
          >
            <Typography color='primary' variant="body2" style={{ fontWeight: '400', color: 'black' }} className={classes.label}>
              {props.label}
            </Typography>
            {props.author &&
              <Typography variant="caption" color="textPrimary"> {'by '}
                <Typography display="inline" variant="caption" component="h2" color="primary" style={{ textDecoration: 'underline' }}>
                  {props.author}
                </Typography>
              </Typography>
            }

            <Box
              display='flex'
              alignItems='center'
              justifyContent='flex-start'
              marginY={0.2}
            >
              {!isNaN(props.rating) && props.rating > 0 &&
                <>
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={Number(props.rating)}
                    readOnly
                    size="small"
                  />
                  {!isNaN(props.votes) && props.votes > 0 &&
                    <Box marginLeft={1}>
                      {props.votes + ' '}
                    </Box>
                  }
                </>
              }
            </Box>

            {props.sale_price ? (
              <Typography variant="body1" component='div' style={{ fontWeight: '500' }}>
                {numberWithCommas(props.sale_price)}đ&nbsp;
                {props.sale_price !== props.old_price &&
                  <Typography variant="caption" display='inline' style={{ textDecoration: 'line-through', fontSize: '12px' }}>{numberWithCommas(props.old_price)}đ</Typography>
                }
              </Typography>
            ) : (
              props.old_price && <Typography variant="button">{numberWithCommas(props.old_price)}đ</Typography>
            )}
            {props.sale_start && (
              <Typography variant="caption" component='div'>{dateToStr(props.sale_start)} - {dateToStr(props.sale_end)}</Typography>
            )}

          </Box>
        </CardActionArea>
      </Link>

    </Card >
  )

}

Book2.defaultProps = {
  id: 1,
  link: '',
  label: '',
  sale_price: '',
  old_price: 0,
  img_url: '',
  author: '',
  rating: 0,
  votes: 0,
  sale_start: '',
  sale_end: '',
  elevation: 1,
  paddingX: 2
}

export default Book2