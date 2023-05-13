import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  bigImage: {
    objectFit: 'fill',
    width: 'auto',
    height: '90%',
    // boxShadow: '0px 0px 15px 0px grey',
    objectPosition: 'top'
  },
  typeBoxActive: {
    border: '1px solid #e7a976',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: '#fdf8f3',
    cursor: 'pointer'
  },
  typeBoxInActive: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer'
  },
}))

const choices = [
  {
    type: 'Mới',
    price: '120.000đ'
  },
  {
    type: 'Cũ như mới',
    price: '90.000đ'
  },
  {
    type: 'Cũ nhưng rất tốt',
    price: '70.000đ'
  },
  {
    type: 'Cũ nhưng tốt',
    price: '50.000đ'
  },
  {
    type: 'Cũ dùng được',
    price: '30.000đ'
  },
]

const Result = (props) => {
  const classes = useStyles()

  const [boxType, setBoxType] = useState(0)
  const onClickBoxType = (type) => (event) => {
    setBoxType(type)
  }

  const navigate = useNavigate()
  const nextStep = (event) => {
    // event.preventDefault()
    navigate(`/product/${props.id}`)
  }
  return (
    <Box
      display='flex'
      boxSizing='border-box'
      border={1}
      borderColor='#f5f5f5'
      borderRadius={5}
      overflow='hidden'
      marginBottom={1}
    >
      <Box
        width='250px'
        height='250px'
        style={{ backgroundColor: '#f5f5f5', cursor: 'pointer' }}
        display='flex'
        justifyContent='center'
        onClick={nextStep}
      >
        <img src={props.src} alt='book-img' className={classes.bigImage} />
      </Box>

      <Box
        name="book-details"
        flexGrow={1}
        style={{ backgroundColor: '#fff' }}
        paddingX={2}
        boxSizing='border-box'
        marginLeft={2}
        paddingTop={1}
      >
        <Typography component="div" variant="h5" onClick={nextStep} style={{cursor: 'pointer'}}>Where the Crawdads Sing</Typography>
        <Typography component="div" style={{ fontWeight: 500 }}>by&ensp;
          <Typography color='primary' display="inline" style={{ fontWeight: 500 }}>Delia Owens</Typography>
          &ensp;|&ensp;
          <Typography color='textSecondary' display="inline" style={{ fontWeight: 500 }}>Dec 30, 2018</Typography>
        </Typography>
        <Box
          id="rating-box"
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
          marginTop={1}
        >
          <Rating
            name="read-only"
            precision={0.1}
            value={4.5}
            readOnly>
          </Rating>
          <Box marginLeft={2} />
          <Typography component="div" color='primary' style={{ fontWeight: 500 }}>200,000 đánh giá</Typography>
        </Box>

        <Box marginTop={3} />
        {/* <Divider /> */}
        <Box marginTop={2} />
        <Box width='80%'>
          <Grid
            container
            justifyContent='space-between'
            spacing={1}
          >
            {choices.map((choice, index) => (
              <Grid item key={index} xs={6} sm={5} md={3} lg={2}>
                <Box
                  onClick={onClickBoxType(index)}
                  className={boxType === index ? classes.typeBoxActive : classes.typeBoxInActive}
                >
                  <Typography
                    component='div'
                    style={{ fontWeight: boxType === index ? 'bold' : 'normal' }}
                  >
                    {choice.type}
                  </Typography>
                  <Typography
                    component='div'
                    style={{
                      fontWeight: boxType === index ? 'bold' : 'normal',
                      color: boxType === index ? '#a3331a' : 'black'
                    }}
                  >
                    {choice.price}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Box>

    </Box>
  )
}

Result.defaultProps = {
  src: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg",
  id: '1'
}

export default Result