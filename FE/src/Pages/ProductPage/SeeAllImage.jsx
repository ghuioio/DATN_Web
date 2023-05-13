import { Box, Dialog, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import { Clear } from "@material-ui/icons"
import { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => ({
  halfImage: {
    objectFit: 'cover',
    width: '100%',
    height: '50px',
    objectPosition: 'top'
  },
  bigImage: {
    width: 'auto',
    maxWidth: '400px',
    height: '550px',
    objectFit: 'cover',
    objectPosition: 'top'
  },
  smallImage: {
    objectFit: 'cover',
    width: '60px',
    height: '60px',
    objectPosition: 'top',
    border: '1px solid grey',
    padding: '1px',
    cursor: 'pointer'
  },
  smallImageActive: {
    objectFit: 'cover',
    width: '60px',
    height: '60px',
    objectPosition: 'top',
    padding: '1px',
    cursor: 'pointer',
    border: '1px solid orange',
  },

}))

const SeeAllImage = ({ smallImages }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [bigImg, setBigImg] = useState(null)

  useEffect(() => {
    setBigImg(smallImages[imgIndex])
  }, [imgIndex])

  const onClickImage = (index) => (e) => {
    setImgIndex(index)
  }

  const setDialogState = (state) => (e) => {
    setOpenDialog(state)
  }

  return (
    <>
      <Box
        id="4images"
        display='flex'
        width='300px'
        maxWidth='300px'
        height='30px'
        marginTop={2}
        justifyContent='flex-start'
        overflow='hidden'
      >
        {smallImages.map((img, index) => (
          <Box key={index} minWidth='75px' width='75px' boxSizing='border-box' paddingRight='2px'>
            <img className={classes.halfImage} src={img} />
          </Box>
        ))}
      </Box>
      <Box
        alignSelf='flex-start'
        marginBottom={1}
      >
        <Typography
          color="primary"
          style={{ cursor: 'pointer' }}
          onClick={setDialogState(true)}
          variant='body2'
        >
          Xem {smallImages.length} ảnh
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={setDialogState(false)} maxWidth='xl'>
        <Box
          width='fit-content'
          minWidth='820px'
          minHeight='500px'
        >
          <Box
            style={{ backgroundColor: '#EDEDED' }}
            height='50px'
            display='flex'
            alignItems='center'
            paddingLeft={2}
            paddingRight={1}
            justifyContent='space-between'
          >
            <Typography
              variant="caption"
              style={{ fontWeight: 500, fontSize: 15 }}
            >Ảnh ({smallImages.length})</Typography>

            <IconButton size="small" onClick={setDialogState(false)}>
              <Clear fontSize="small" />
            </IconButton>
          </Box>
          <Box
            display='flex'
            padding={2}
            style={{ backgroundColor: 'fff' }}
            boxSizing='border-box'
            paddingLeft={10}
            paddingRight={5}
            width='100%'
            justifyContent='center'
          >
            <Box>
              <img className={classes.bigImage} src={bigImg} />
            </Box>
            <Box marginLeft={6} />
            <Box
              id="4images"
              display='flex'
              height='fit-content'
              width='fit-content'
              maxWidth='300px'
              justifyContent='flex-start'
              flexWrap='wrap'
            >
              {smallImages.map((img, index) => (
                <Box key={index} width='64px' height='64px' paddingLeft='5px' paddingBottom='5px'>
                  <img className={index === imgIndex ? classes.smallImageActive : classes.smallImage} src={img} onClick={onClickImage(index)} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

SeeAllImage.defaultProps = {
  smallimages: [
    'https://images-na.ssl-images-amazon.com/images/I/81PiNiKPESL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61m1Vxw8tiL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71Pt7z-Dt6L.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81a4PaoziAL.jpg'
  ]
}

export default SeeAllImage