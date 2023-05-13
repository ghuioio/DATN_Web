import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Book from "./Book";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '40%',
    // backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2)
  },
  header: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  list: {
    display: 'flex',
    flexGrow: 1,
    // backgroundColor: theme.palette.grey[200],
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

}))

const book = {
  id: '1',
  title: 'Harry Potter and the Philosopher Stone',
  newprice: '$9.99',
  oldprice: '$11.11',
  src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg'
}


const booklist = new Array(5).fill(book)

const BookListRow = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography gutterBottom variant="h6">
          {props.listname}
        </Typography>
        <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
          See more
        </Typography>
      </div>
      <div className={classes.list}>
        {booklist.map((data, index) => (
          <Book
            key={index}
            id={data.id}
            title={data.title}
            newprice={data.newprice}
            oldprice={data.oldprice}
            src={data.src}
          />
        ))}

      </div>
    </div>

  )

}

export default BookListRow