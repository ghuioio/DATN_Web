import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Book2 from "./Book2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // height: '40%',
    // backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(5),
    justifyContent: 'center',
    maxWidth: '1480px'
  },
  header: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
  },
  list: {
    display: 'flex',
    flexGrow: 1,
    // backgroundColor: theme.palette.grey[200],
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },

}))

const book = {
  id: 1,
  link: '',
  label: 'Harry Potter',
  sale_price: '',
  old_price: 20000,
  img_url: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
  author: 'JK Rowling',
  stars: 0,
  votes: 0,
  sale_start: '',
  sale_end: '',
}

const BookListGrid = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Box className={classes.header} alignSelf={props.namePosition}>
        <Typography gutterBottom variant="h5" style={{fontWeight: 500, color: '#f28f40'}}>
          {(!props.loading && props.items.length === 0) ? `Không có ${props.listname} nào :(` : props.listname}
        </Typography>
      </Box>
      <div className={classes.list}>
        <Grid container spacing={3} justifyContent="center">
          {props.items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Book2
                link={item.link}
                label={item.label}
                sale_price={item.sale_price}
                old_price={item.old_price}
                img_url={item.img_url}
                author={item.author}
                rating={item.rating}
                votes={item.votes}
                sale_start={item.sale_start}
                sale_end={item.sale_end}
              />
            </Grid>
          ))}

        </Grid>
      </div>
    </div>
  )

}

BookListGrid.defaultProps = {
  listname: '',
  namePosition: 'center',
}

export default BookListGrid