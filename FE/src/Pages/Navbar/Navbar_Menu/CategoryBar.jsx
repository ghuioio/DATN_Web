import { Box, Button, makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BASE_API } from "../../../Services/Constants";
import { axiosGet } from "../../../Services/Ultils/axiosUtils";

const useStyles = makeStyles(theme => ({
  bar: {
    paddingLeft: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.grey[200]}`
  }
}))

const CategoryBar = (props) => {
  let classes = useStyles()
  const [index, setIndex] = useState(false)


  const [categoriesV3, setCategoriesV3] = useState([])

  const path = useLocation().pathname

  let path_cateIdV2 = path.split('?')[0].replace('/book-page/', '')

  const getCategoriesV3 = async (parent_id) => {
    const response = await axiosGet(`${BASE_API}/categories/${parent_id}`)
    console.log('catev3', response.data)
    const cv3 = response.data || []
    setCategoriesV3(cv3)
  }

  const navigate = useNavigate()

  const handleChange = (event, newIndex) => {
    setIndex(newIndex)
    console.log(newIndex)
    navigate(`book-page/${path_cateIdV2}?cateIdV3=${categoriesV3[newIndex]._id}`)
  }

  useEffect(() => {
    if (!path.includes('book-page')) return
    if (path_cateIdV2 && path_cateIdV2 !== '/') {
      console.log('path', path_cateIdV2)
      getCategoriesV3(path_cateIdV2)
      setIndex(false)
      console.log('path_cateIdV2', path_cateIdV2)
    }
  }, [path_cateIdV2])

  let [searchParams] = useSearchParams()

  useEffect(() => {
    if (!path.includes('book-page')) return
    let path_cateIdV3 = searchParams.get('cateIdV3')
    if (path_cateIdV3) {
      let index = categoriesV3.findIndex(cate => cate._id === path_cateIdV3)
      if (index !== -1) setIndex(index)
      console.log(index)
    }
  }, [categoriesV3])

  return (
    <>
      {path.includes('book-page')
        && categoriesV3.length > 0
        && (
          <Tabs
            className={classes.bar}
            value={index}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {categoriesV3.map((cv3, index) => (
              <Tab
                key={index}
                label={cv3.name}
              />
            ))}
          </Tabs>
        )}
    </>
  )
}

CategoryBar.defaultProps = {
  cateIdV2: ''
}

export default CategoryBar