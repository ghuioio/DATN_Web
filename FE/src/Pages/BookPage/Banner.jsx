import { Box, Button, Grid, IconButton, Link, makeStyles, Paper, Typography } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos, ArrowRight, NavigateBefore, NavigateNext } from "@material-ui/icons";
import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '400px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1480px',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    objectPosition: 'center',
  },
  slide: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0,
    transition: 'opacity ease-in-out 0.4s',
    zIndex: 0,
  },
  topSlide: {
    opacity: 1,
    zIndex: 1,
  }
}))

const images = [
  'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1659368560/book_chill_store_cwy1ii.png?fbclid=IwAR1x1q44Wrv5jrrV0q7xabHtcxKd7Ear-nAu1_j6rW0OnlPirBk620FcYUg',
  'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1659368561/book_chill_store2_vv0lfn.png?fbclid=IwAR1n16i8L8FCniJBo2fErheAKPPsaQ9TJ5ZVpS4lQBEaUo2Sxoheq7fvNN4',
  'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1659368560/book_chill_store3_mrb0qw.png?fbclid=IwAR1yONGA_ma3I0CvY1O70WZJe7nSmZ2jIQ6tK_mhiuFJ3blNbsRWGPd4tck'
]

const Banner = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer = setTimeout(() => next(), 5000)

    return () => clearTimeout(timer)
  }, [index])

  const next = () => {
    setIndex(prev => {
      if (prev < images.length - 1) return prev + 1
      else return 0
    })
  }

  const back = () => {
    setIndex(prev => {
      if (prev > 0) return prev - 1
      else return images.length - 1
    })
  }

  return (
    <Box
      className={classes.root}
      position='relative'
    >
      <Box
        height='100%'
        width='100%'
        position='relative'
      >
        {images.map((image, _index) =>
          <Box
            key={_index}
            className={classNames({
              [classes.slide]: true,
              [classes.topSlide]: _index === index
            })}
          >
            <img
              className={classes.image}
              src={image}
              alt="banner"
            />
          </Box>
        )}
      </Box>


      <Box
        position='absolute'
        top='0'
        bottom='0'
        display='flex'
        width='100%'
        justifyContent='space-between'
        boxSizing='border-box'
        paddingX={2}
        height='fit-content'
        margin='auto'
        zIndex={2}
      >
        <IconButton size='small' onClick={back}>
          <NavigateBefore style={{ fontSize: 80 }} />
        </IconButton>
        <IconButton size='small' onClick={next}>
          <NavigateNext style={{ fontSize: 80 }} />
        </IconButton>
      </Box>
    </Box>

  )

}

export default Banner