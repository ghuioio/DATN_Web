import React, { useEffect, useState } from 'react'
import './SlideShow.css'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { IconButton, makeStyles } from '@material-ui/core'
import { BASE_API } from '../../../Services/Constants'
import { axiosGet } from '../../../Services/Ultils/axiosUtils'

const useStyles = makeStyles((theme) => ({
  buttonPrev: {
    position: 'absolute',
    top: '20%',
    left: 0,
    zIndex: 2,
    width: 100,
    height: 100
  },
  buttonNext: {
    position: 'absolute',
    top: '20%',
    right: 0,
    zIndex: 2,
    width: 100,
    height: 100
  },
  arrowIcon: {
    width: 80,
    height: 80,
    color: 'white',
    backgroundColor: '#00000030',
    borderRadius: 40
  }
}))


const SlideShow = () => {
  const classes = useStyles()
  const [dataSlider, setDataSlider] = useState([])
  const [slideIndex, setSlideIndex] = useState(1)
  const [slideSwitch, setSlideSwitch] = useState(false)
  let slideInterval = 0

  useEffect(() => {
    // setSlideInterval(setInterval(nextSlide, 500))
    slideInterval = setInterval(nextSlide, 2000)
    return () => { clearInterval(slideInterval) }
  }, [slideSwitch])

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1)
    }
    else if (slideIndex === dataSlider.length) {
      setSlideIndex(1)
    }
    setSlideSwitch(prev => !prev)
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length)
    }
    setSlideSwitch(!slideSwitch)
  }
  const moveDot = index => {
    clearInterval(slideInterval)
    setSlideSwitch(!slideSwitch)
    setSlideIndex(index)
  }

  const getDataSlider = async () => {
    const response = await axiosGet(`${BASE_API}/pages/home/bads`)
    setDataSlider(response.data)
  }

  useEffect(() => {
    getDataSlider()
  }, [])

  return (
    <div className="slider-wrapper">
      <div className="container-slider">
        {dataSlider.map((data, index) => {
          return (
            <div
              key={index}
              className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
              onClick={() => { console.log(data.link); window.open(data.link, "_blank") }}
            >
              <img
                src={data.img_url}
                alt='image'
              />
            </div>
          )
        })}
        {/* <div className="container-buttons">

        </div> */}
        <IconButton onClick={prevSlide} className={classes.buttonPrev}>
          <ChevronLeft className={classes.arrowIcon} fontSize='large' />
        </IconButton>
        <IconButton onClick={nextSlide} className={classes.buttonNext}>
          <ChevronRight className={classes.arrowIcon} fontSize='large' />
        </IconButton>
        {/* <div className="container-dots">
          {Array.from({ length: 5 }).map((item, index) => (
            <div key={index}
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            >

            </div>
          ))}
        </div> */}
      </div>
    </div>

  )
}

export default SlideShow