import { Box, Button, MenuItem, TextField, Typography } from "@material-ui/core"
import { FilterList } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { HEROKU_API } from "../../Services/Constants"
import { axiosGet } from "../../Services/Ultils/axiosUtils"

const priceTypes = [
  {
    type: 0,
    price: 'Tất cả'
  },
  {
    type: 1,
    price: 'dưới 50.000đ',
  },
  {
    type: 2,
    price: '50.000đ - 100.000đ',
  },
  {
    type: 3,
    price: '100.000đ - 200.000đ',
  },
  {
    type: 4,
    price: '200.000đ - 500.000đ',
  },
  {
    type: 5,
    price: 'trên 500.000đ',
  }
]

const BookFilter = ({baseQuery}) => {
  const [category, setCategory] = useState('All')
  const [priceType, setPriceType] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      let response = await axiosGet(`${HEROKU_API}/category`)
      if (!response) return
      setCategories(response.data)
    }
    getCategories()
  }, [])

  let [searchParams, setSearchParams] = useSearchParams()
  const filter = () => {
    if (priceType !== 0) searchParams.set('price', `${priceType}`)
    else searchParams.delete('price')
    if (category !== 'All') searchParams.set('category', `${category}`)
    else searchParams.delete('category')
    setSearchParams(searchParams) 
  }

  useEffect(()=>{
    let price = searchParams.get('price')
    if (price) setPriceType(price)
    let cate = searchParams.get('category')
    if (cate) setCategory(cate)
  }, [searchParams])

  return (
    <>
      <Box
        width='100%'
        maxWidth='1480px'
        height='fit-content'
        // style={{ backgroundColor: 'white' }}
        display='flex'
        boxSizing='border-box'
        // paddingY={2}
        justifyContent='flex-end'
      // paddingX={2}
      >
        <Box
          display='flex'
          style={{ backgroundColor: 'white', borderRadius: '4px' }}
          width='fit-content'
          paddingX={2}
          paddingY={2}
          boxSizing='border-box'
        >
          <TextField
            select
            label='Khoảng giá'
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
            variant='outlined'
            style={{ width: '200px' }}
            size='small'
          >
            {priceTypes.map((option) =>
              <MenuItem key={option.type} value={option.type}>
                {option.price}
              </MenuItem>
            )}
          </TextField>
          <Box marginLeft={2} />
          <TextField
            select
            label='Thể loại'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant='outlined'
            style={{ width: '200px' }}
            size='small'
          >
            <MenuItem
              value={'All'}
            >
              Tất cả
            </MenuItem>
            {categories?.map((cate) =>
              <MenuItem
                key={cate._id}
                value={cate.idCategory}
              >
                {cate.name}
              </MenuItem>
            )}
          </TextField>
          <Box marginLeft={2} />
          <Button
            variant='contained'
            color='primary'
            style={{ width: '150px', backgroundColor: '#f28f40' }}
            size='small'
            onClick={filter}
          >
            Tìm kiếm
          </Button>
        </Box>

      </Box>

    </>
  )
}

export default BookFilter