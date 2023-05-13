import { Box, Button, Checkbox, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'cover',
    width: '80px',
    height: '120px',
    objectPosition: 'top'
  },
}))

const items = [
  {
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: '1',
    shipping: '30.98',
    src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg'
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo: A Novel',
    author: 'Taylor Jenskins Reid',
    price: '2',
    shipping: '30.98',
    src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg'
  },
  {
    title: 'It Ends with Us',
    author: 'Colleen Hoover',
    price: '3',
    shipping: '30.98',
    src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg'
  }
]

const BoughtTogether = (props) => {
  const classes = useStyles()
  const [checkList, setCheckList] = useState(new Array(items.length).fill(false))

  const getTotalPrice = () => {
    const result = items.reduce((prev, curr, index) => (prev + (checkList[index] ? Number(curr.price) : 0)), 0)
    return result
  }

  const [totalPrice, setTotalPrice] = useState(getTotalPrice())

  useEffect(() => {
    setTotalPrice(getTotalPrice())
  }, [checkList])

  const onCheck = (index) => (event) => {
    let checkListClone = checkList.slice()
    checkListClone[index] = event.target.checked
    setCheckList(checkListClone)
  } 

  const checkAll = (event) => {
    setCheckList(new Array(checkList.length).fill(true))
  }

  return (
    <Box
      // style={{ backgroundColor: 'yellow' }}
      name="bought-together"
      height='fit-content'
      width='100%'
    >
      <Typography variant="h5" >Thường mua cùng nhau</Typography>

      <Box
        display='flex'
        alignItems='center'
        marginTop={2}
        boxSizing='border-box'
        paddingLeft={4}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 && (
              <Box marginX={4}>
                <Typography variant="h5" color="textSecondary">+</Typography>
              </Box>
            )}
            <img className={classes.image} src={item.src} alt="" />
          </Fragment>
        ))}

        <Box
          marginLeft={8}
          height='150px'
        >
          <Typography color="textSecondary" component='div'>Tổng tiền:
            <Typography
              display="inline"
              color="secondary"
            >
              &nbsp;${totalPrice}
            </Typography>
          </Typography>
          <Box marginTop={2} />
          <Button variant="contained" color="primary" onClick={checkAll}>Thêm tất cả vào giỏ hàng</Button>
        </Box>
      </Box>

      {items.map((item, index) => (
        <Box
          key={index}
          display='flex'
          alignItems='center'
        >
          <Checkbox
            color="primary"
            onChange={onCheck(index)}
            size='small'
            style={{fontSize: 10, width: 10, height: 10 }}
            checked={checkList[index]}
          />
          <Box marginLeft={0.5}/>
          {index === 0 && <Typography style={{ fontWeight: '600' }} variant='body2'>This item:&nbsp;</Typography>}
          <Typography color={index === 0 ? 'textPrimary' : 'primary'} variant='body2'>{item.title}</Typography>
          <Typography variant="caption">&nbsp;by</Typography>
          <Typography variant='body2'>&nbsp;{item.author}</Typography>
          <Typography color="secondary">&nbsp;${item.price}</Typography>
          <Typography variant="caption">&nbsp;${item.shipping}&nbsp;shipping</Typography>

        </Box>
      ))}
    </Box>
  )
}

export default BoughtTogether