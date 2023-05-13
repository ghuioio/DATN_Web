import { Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { Check, CheckCircleRounded } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  img: {
    width: '80px',
    height: '110px',
    objectFit: 'cover',
    objectPosition: 'top'
  },
}))

const RecommendItem = (props) => {
  const classes = useStyles()
  return (
    <Box display='flex' marginTop={2} width='100%'>
      <Box marginRight={1}>
        <img className={classes.img} src={props.src} />
      </Box>
      <Box width={200}>
        <Typography variant="button" component="div" noWrap>
          {props.title}
        </Typography>
        <Typography variant="caption" component="h2" color="primary" style={{ textDecoration: 'underline' }}>
          {props.author}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Rating
            name="read-only"
            precision={0.1}
            value={Number(props.stars)}
            readOnly
            size="small"
          >
          </Rating>
          <Box marginLeft={1}>
            <Typography variant="body2">
              {props.votes}
            </Typography>
          </Box>
        </Box>


        <Typography gutterBottom variant="button" component="h2">
          {props.newprice + ' '}
          <Typography display="inline" variant="caption"
            color="textSecondary" style={{ textDecoration: 'line-through' }}>
            {props.oldprice}
          </Typography>
        </Typography>
      </Box>

    </Box>
  )
}

RecommendItem.defaultProps = {
  title: '',
  newprice: '',
  oldprice: '',
  src: '',
  author: '',
  stars: '',
  votes: '',
}

export default RecommendItem