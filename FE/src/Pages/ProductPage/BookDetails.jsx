import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import InfoIcon from "./InfoIcon";
import { numberWithCommas } from '../../Services/Ultils/NumberUtils'
import ReadMoreBox from "./ReadMoreBox";
import classNames from "classnames";
import isNumber from "is-number";
const useStyles = makeStyles((theme) => ({
  bigImage: {
    objectFit: 'fill',
    width: '95%',
    height: 'auto',
    boxShadow: '0px 0px 15px 0px grey',
    objectPosition: 'top'
  },
  smallImage: {
    objectFit: 'cover',
    width: '24%',
    height: '50px',
    objectPosition: 'top'
  }
}))

export const choices = {
  'NEW': 'Mới',
  'LIKE_NEW': 'Cũ như mới',
  'VERY_GOOD': 'Cũ nhưng rất tốt',
  'GOOD': 'Cũ nhưng tốt',
  'ACCEPTABLE': 'Cũ dùng được',
}


const responsive = {
  xl: {
    breakpoint: {
      max: 3000,
      min: 1536
    },
    items: 4,
    partialVisibilityGutter: 40
  },
  lg: {
    breakpoint: {
      max: 1536,
      min: 1200
    },
    items: 3,
    partialVisibilityGutter: 30
  },
  md: {
    breakpoint: {
      max: 1200,
      min: 900
    },
    items: 2,
    partialVisibilityGutter: 20
  },
  sm: {
    breakpoint: {
      max: 900,
      min: 600
    },
    items: 1,
    partialVisibilityGutter: 10
  },
  xs: {
    breakpoint: {
      max: 600,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 0
  }
}

const BookDetails = ({ authors, desc, quantity_sold, rating, review_count, title, specs}) => {
  const classes = useStyles()
  
  return (
    <Box
      name="book-details"
      width='calc(100% - 300px - 320px - 16px)'
      style={{ backgroundColor: '#fff' }}
      paddingX={2}
      boxSizing='border-box'
    >
      <Typography component="div" variant="h5" >{title}</Typography>
      {!!authors &&
        <Typography component="div">bởi&nbsp;
          <Typography color='primary' display="inline" >{authors.join(', ')}</Typography>
        </Typography>
      }
      <Box
        id="rating-box"
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
      >
        <Rating
          name="read-only"
          precision={0.1}
          value={rating ? rating : 0}
          readOnly>
        </Rating>
        <Box marginLeft={2} />
        <Box
          display='flex'
          alignItems='center'
        >
          {!!rating &&
            <>
              <Typography style={{ color: 'orange' }}>{rating}</Typography>
              <Box marginLeft={2} />
              <Divider flexItem orientation="vertical" />
              <Box marginLeft={2} />
            </>
          }
          {!!review_count &&
            <>
              <Typography component="div" color='textPrimary' style={{ textDecoration: 'underline' }}>
                {numberWithCommas(review_count)}
              </Typography>
              <Box marginLeft={1} />
              <Typography variant="body2" color='textSecondary'>Đánh giá</Typography>
              <Box marginLeft={2} />
              {/* <Divider flexItem orientation="vertical" />
              <Box marginLeft={2} /> */}
            </>
          }
          {!!quantity_sold &&
            <>
              <Typography component="div" color='textPrimary' style={{ display: 'flex', alignItems: 'center' }}>
                {numberWithCommas(quantity_sold)}
              </Typography>
              <Box marginLeft={1} />
              <Typography variant="body2" color='textSecondary'>Đã bán</Typography>
            </>
          }
        </Box>
      </Box>

      <Box marginTop={2} />
      <Divider />
      <Box marginTop={3} />

      <Box marginTop={2} />

      {/* <Typography component='div' variant="body1">
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
      </Typography> */}
      <ReadMoreBox content={desc} />

      <Box marginTop={2} />
      <Divider />

      <Box
        height='fit-content'
        width='90%'
        position='relative'
        paddingX={3}
      >
        <Carousel
          additionalTransfrom={0}
          autoPlay={false}
          shouldResetAutoplay={false}
          autoPlaySpeed={0}
          centerMode={false}
          draggable
          focusOnSelect={false}
          infinite={false}
          minimumTouchDrag={0}
          responsive={responsive}
          showDots={false}
          slidesToSlide={2}
          swipeable
          renderDotsOutside
          className="slider"
        >
          {specs[0].attributes.filter(attr => attr.value).map((attr, index) => (
            <InfoIcon
              key={index}
              name={attr.name}
              code={attr.code}
              value={attr.value}
            />

          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default BookDetails