import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import SeeAllImage from "./SeeAllImage";

const useStyles = makeStyles((theme) => ({
  bigImage: {
    objectFit: 'cover',
    width: 'auto',
    maxWidth: '300px',
    height: '440px',
    boxShadow: '0px 0px 15px 0px grey',
    objectPosition: 'top'
  },
  smallImage: {
    objectFit: 'cover',
    width: '24%',
    height: '50px',
    objectPosition: 'top'
  },
}))
const smallimages = [
  'https://images-na.ssl-images-amazon.com/images/I/81PiNiKPESL.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/61m1Vxw8tiL.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/71Pt7z-Dt6L.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/81a4PaoziAL.jpg'
]

// const smallimages = new Array(4).fill(smallimage)

const BookImage = ({smallImages}) => {
  const classes = useStyles()

  return (
    <Box
      name="book-image"
      width='300px'
      height='fit-content'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
    >
      <img className={classes.bigImage} src={smallImages[0]} />
      <SeeAllImage 
        smallImages={smallImages}
      />

    </Box>
  )
}

export default BookImage
{/* <Box
  id="4images"
  display='flex'
  width='100%'
  height='60px'
  marginTop={2}
  justifyContent='space-between'
>
  {smallimages.map((img, index) => (
    <img key={index} className={classes.smallImage} src={img.src} />
  ))}
</Box>
<Box alignSelf='flex-start' marginBottom={1}>
  <Typography color="primary" style={{ cursor: 'pointer' }}>See all 4 images</Typography>
</Box> */}