import { Box, Button, ClickAwayListener, Container, Divider, Grid, List, ListItem, ListItemText, makeStyles, Paper, Popper, Typography } from "@material-ui/core";
import { ChevronRight, Clear } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { BASE_API, HEROKU_API } from "../../../Services/Constants";
import { axiosGet } from "../../../Services/Ultils/axiosUtils";

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '100vw',
    height: '350px',
    position: 'relative',
  },
  container: {
    height: '100%',
    width: '100%'
  },
  leftMenu: {
    height: '100%',
    backgroundColor: theme.palette.grey[100],
    // overflow: 'scroll',
    paddingTop: theme.spacing(2)
  },
  languageButton: {
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(2)
  },
  rightMenu: {
    height: '100%',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    // overflow: 'scroll'
  },
  exitIcon: {
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
    cursor: 'pointer',
  },
  categoryWrapper: {
    paddingRight: '100px',
    minWidth: 'fit-content',
    paddingBottom: '30px'
  },
  linkActive: {
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      color: '#303f9f',
    }
  },
  linkInActive: {
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'normal',
    '&:hover': {
      color: '#303f9f',
    }
  },
  categoryContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 'fit-content'
  }
}))

const MenuSach = (props) => {
  const classes = useStyles()
  const [categoriesV2, setCategoriesV2] = useState([])

  // const onClickCategoryV1 = (idv1) => (event) => {
  //   setCateIdV1(idv1)
  //   getCategoriesV2(idv1)
  // }

  const [cateIdV2, setCateIdV2] = useState('')

  const onClickCategoryV2 = (idv2) => (event) => {
    setCateIdV2(idv2)
    props.handleCloseMenu()
  }

  // const getCategoriesV1 = async () => {
  //   const response = await axiosGet(`${BASE_API}/categories`)
  //   const cv1 = response.data
  //   console.log('v1', cv1)
  //   setCategoriesV1(cv1)
  //   setCateIdV1(cv1[0]._id)
  //   getCategoriesV2(cv1[0]._id)
  // }

  const getCategoriesV2 = async () => {
    const response = await axiosGet(`${HEROKU_API}/category`)
    const cv2 = response.data
    console.log('catev2', cv2)
    setCategoriesV2(cv2)
    onClickCategoryV2(cv2[0].idCategory)
  }

  useEffect(() => {
    // getCategoriesV1()
    getCategoriesV2()
  }, [])

  const path = useLocation().pathname

  let path_cateIdV2 = path.split('?')[0].replace('/book-page/', '')

  useEffect(() => {
    if (path_cateIdV2) {
      setCateIdV2(path_cateIdV2)
    }
  }, [path_cateIdV2])
  return (
    <Popper
      open={props.anchor[0] === 'menu-sach'}
      anchorEl={props.anchor[0] === 'menu-sach' ? props.anchor[1] : null}
      placement="bottom"
      disablePortal
      modifiers={{ preventOverflow: { padding: 0 } }}
    >
      <Paper
        square
        elevation={3}
      >
        <ClickAwayListener onClickAway={props.handleCloseMenu}>
          <div className={classes.menu}>
            <Clear className={classes.exitIcon} onClick={props.handleCloseMenu}></Clear>
            <Box
              width='100%'
              height='100%'
              display='flex'
              flexWrap='wrap'
              alignContent='flex-start'
              justifyContent='center'
              boxSizing='border-box'
              paddingTop={4}
              paddingLeft={15}
              gridColumnGap={10}
            >
              {categoriesV2.map((cv2, index) => (
                <Box
                  width='30%'
                  height='50px'
                  key={index}
                >
                  <Link key={index} to={`/book-page/${cv2.idCategory}`}>
                    <Typography
                      variant="body1"
                      // style={{fontWeight: '500'}}
                      className={cv2.idCategory === cateIdV2 ? classes.linkActive : classes.linkInActive}
                      onClick={onClickCategoryV2(cv2.idCategory)}
                    >
                      {cv2.name}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
            {/* <Grid container className={classes.container}>
              <Grid item xs={10} className={classes.rightMenu}>
                <Grid container className={classes.categoryContainer} direction='column'>
                  {categoriesV2.map((cv2, index) => (
                    <Grid item xs={1} sm={1} md={2} lg={3} key={cv2._id} className={classes.categoryWrapper}>
                      <Link key={index} to={`/book-page/${cv2.idCategory}`}>
                        <Typography
                          variant="body2"
                          className={cv2.idCategory === cateIdV2 ? classes.linkActive : classes.linkInActive}
                          onClick={onClickCategoryV2(cv2.idCategory)}
                        >
                          {cv2.name}
                        </Typography>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={1}/>
            </Grid> */}

          </div>
        </ClickAwayListener>
      </Paper>
    </Popper>
  )

}

MenuSach.defaultProps = {
  anchor: [null, null],
  handleCloseMenu: () => { }
}

export default MenuSach

{/* <Link key={index} to={`/book-page/${cv2.idCategory}`}>
                        <Typography
                          variant="body2"
                          className={cv2.idCategory === cateIdV2 ? classes.linkActive : classes.linkInActive}
                          onClick={onClickCategoryV2(cv2.idCategory)}
                        >
                          {cv2.name}
                        </Typography>
                      </Link> */}