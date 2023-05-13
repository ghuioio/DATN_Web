import { AppBar, Avatar, Badge, Box, Button, IconButton, InputBase, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Slide, TextField, Toolbar, Typography, useScrollTrigger, useTheme } from "@material-ui/core"
import { ArrowBack, Clear, ExitToApp, ExpandMore, Receipt, Search, ShoppingBasket, ShoppingBasketOutlined, SupervisorAccount } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import LogoIcon from "../images/logo.png"
import MenuSach from "./Navbar_Menu/MenuSach"
// import MenuGioiThieu from "./Navbar_Menu/MenuGioiThieu"
import CategoryBar from "./Navbar_Menu/CategoryBar"
import { Link, NavLink, useNavigate } from "react-router-dom"
import './Navbar.css'
import axios from "axios";
import { PDF_API, VOICE_API } from "../../Services/Constants"

const useStyles = makeStyles((theme) => ({
  appBar: {
    // boxShadow: (props) => (props.navBarTransparent ? theme.shadows[0] : theme.shadows[4]),
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.common.white,

  },
  toolBar: {
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // padding: theme.spacing(1),
    alignItems: 'center',
    height: "60px",
  },
  logoZone: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex'
    // display: (props) => (props.openSearch ? 'none' : 'flex'),
  },

  logoName: {
    display: 'block',
    fontWeight: theme.typography.fontWeightMedium,
    marginLeft: theme.spacing(1)
  },
  closeSearchButton: {
    // display: (props) => (props.openSearch ? 'block' : 'none'),
    marginLeft: theme.spacing(2),
  },
  searchZone: {
    // display: (props) => (props.openSearch ? 'flex' : 'none'),
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: '#F1F3F4',
    // borderRadius: theme.shape.borderRadius,
    width: '40%',
    // paddingLeft: theme.spacing(1),
    // [MediaQuery.down('sm')]: {
    //     display: (props) => (props.openSearch ? 'flex' : 'none'),
    //     flexGrow: 1,
    //     marginRight: theme.spacing(5),
    // },
    position: 'relative',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4)
  },
  input: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    fontSize: 15,
  },
  cancel: {
    display: 'none'
  },
  iconZone: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // [MediaQuery.down('sm')]: {
    //     display: (props) => (props.openSearch ? 'none' : 'flex'),
    // },
    gap: theme.spacing(3),
    height: "100%",
  },
  searchIcon: {
    display: 'block',
    // [theme.breakpoints.up('sm')]: {
    //     display: 'none'
    // }
  },

  tabBox: {
    height: "100%",
    paddingTop: "3px",
    borderBottom: `3px solid ${theme.palette.common.white}`,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },

  sideBar: {
    width: theme.spacing(30),
  },
  sideItem: {
    display: 'flex',
    height: theme.spacing(7)
  },
  sideIcon: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(3.5),
  },
  sideText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  menuBar: {
    // display: (props) => (props.openSearch ? 'none' : 'flex'),
    display: 'flex',
    // paddingLeft: theme.spacing(10),
    marginLeft: theme.spacing(5),
    height: '100%',
    gap: theme.spacing(3),

  },
  menuBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      color: '#3F51B5'
    }
  },
  expandIcon: {
    display: 'none',
    position: 'absolute',
    bottom: theme.spacing(1),
    transform: (props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'),
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  linkActive: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  linkInActive: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'normal'
  },
  logo: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    objectPosition: '50% 400%'
  },
}))

const HideOnScroll = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const categories = ['Tiểu thuyết', 'Truyện ngắn', 'Tác phẩm kinh điển']

const Navbar = (props) => {
  const theme = useTheme()
  // const [navBarTransparent, setNavBarTransparent] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const [anchor, setAnchor] = useState([null, null])
  const [pdfFile, setPdfFile] = useState(null)
  const classes = useStyles({ openSearch, expanded })

  const handleExpandClick = (menu_name) => (event) => {
    setAnchor([menu_name, event.currentTarget])
    setExpanded(true)
  };
  const handleCloseMenu = () => {
    setAnchor([null, null])
    setExpanded(false)
  }

  // useEffect(() => {
  //     const handleScroll = () => {
  //         const isTransparent = window.scrollY === 0
  //         if (isTransparent) setNavBarTransparent(true)
  //         else setNavBarTransparent(false)
  //     }
  //     document.addEventListener('scroll', handleScroll)
  //     return () => { document.removeEventListener('scroll', handleScroll) }
  // }, [])

  const [searchValue, setSearchValue] = useState('')

  const deleteSearch = () => {
    setSearchValue('')
    document.getElementById('cancel').style.display = 'none'
  }

  const onInput = (event) => {
    setSearchValue(event.target.value)
  }

  const navigate = useNavigate()
  const signIn = (event) => {
    navigate('/signin', { state: { prev: window.location.pathname } })
  }

  const pdfReader = (event) => {
    navigate('/pdf-page', { state: { prev: window.location.pathname } })
  }

  const pdfToSpeech = async() => {
    const formData = new FormData();
    if (!pdfFile) return;
    formData.append("pdf", pdfFile);
    formData.append("pdfName", pdfFile.name)
    try {
      const response = await axios({
        method: "post",
        url: `${PDF_API}/pdf_to_speech`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data"},
      });
      console.log(response.data)
      if (!response.data.success) return;
      // encodeURIComponent
      window.open(response.data.link , '_blank', 'noopener,noreferrer');
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = async (event) => {
    setPdfFile(event.target.files[0])
  } 

  const sendData = async (event) => {
    event.preventDefault()
    console.log("Sending to API!")
    console.log(pdfFile)
    pdfToSpeech();
  }

  const [cateIdV2, setCateIdV2] = useState('')

  const [badgeContent, setBadgeContent] = useState(0)

  useEffect(() => {
    setBadgeContent(JSON.parse(localStorage.getItem('cart'))?.length || 0)
    console.log('badge', JSON.parse(localStorage.getItem('cart'))?.length || 0)
  });

  const search = () => {
    if (searchValue)
      navigate(`/search/${searchValue}`)
  }

  const [avaMenu, setAvaMenu] = useState(null)
  const openAvaMenu = (e) => {
    setAvaMenu(e.currentTarget)
  }

  const closeAvaMenu = (e) => {
    setAvaMenu(null)
  }

  const logout = () => {
    localStorage.setItem('access_token', '')
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('prev', '')
    window.location.reload()
  }

  return (
    <div>
      <HideOnScroll {...props}>
        <AppBar color="default" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Box marginLeft={2} />

            <div className={classes.logoZone}>
              <Link to='/'>
                <Box display='flex' alignItems='center'>
                  <img
                    src={'https://res.cloudinary.com/ha-noi-science-and-techlonogy-university/image/upload/v1656736990/6902305_tne79l.png?fbclid=IwAR1B2eLt7nErZNVKTwfl1fVIbaR92srnar-maxw8T1itA26_vfCg7nWC8b8'}
                    className={classes.logo}
                  />
                  {/* <Box
                    width='50px'
                    height='50px'
                    style={{backgroundColor: 'yellow'}}
                  /> */}
                  <Box marginLeft={1} />
                  <Typography style={{ cursor: "pointer" }} variant="h5" className={classes.logoName}>
                    Books
                  </Typography>
                </Box>
              </Link>
            </div>
            <div className={classes.menuBar}>
              <div
                className={classes.menuBox}
                onClick={handleExpandClick('menu-sach')}
              >
                <Typography variant="body1" 
                style={{fontWeight: 'bold'}}
                component='div'>Thể loại</Typography>
                <ExpandMore
                  className={classes.expandIcon}
                  style={{ display: (anchor[0] === 'menu-sach') ? 'block' : 'none' }}
                />
              </div>
                
              <div 
                className={classes.menuBox}
                onClick={pdfReader}>
                <Typography variant="body1" 
                    style={{fontWeight: 'bold'}}
                    component='div'>Đọc thử</Typography>
              </div>

              <div 
                className={classes.menuBox}>
                <label>
                  <input name="" type="file" id="formId" hidden onChange={handleFileSelect} ></input>
                  <Typography variant="body1" 
                    style={{fontWeight: 'bold'}}
                    component='div'>PDF</Typography>
                </label>
              </div>

              <div 
                className={classes.menuBox}>
                  
                  <Button onClick={sendData}>
                  <Typography variant="body1" 
                    style={{fontWeight: 'bold'}}
                    component='div'>CONVERT</Typography>
                  </Button>
              </div>

            </div>

            <div className={classes.searchZone}>
              <TextField
                size='small'
                variant="outlined"
                id="input"
                placeholder="Tìm kiếm..."
                onInput={onInput}
                className={classes.input}
                value={searchValue}
                type='search'
              />

            </div>

            <div className={classes.iconZone}>
              <IconButton className={classes.searchIcon} onClick={search}>
                <Search></Search>
              </IconButton>
                


              <Box className={classes.tabBox}>
                <NavLink to='/cart'>
                  {({ isActive }) => (
                    // <Typography variant="body2" className={isActive ? classes.linkActive : classes.linkInActive}>
                    //   Giỏ hàng
                    // </Typography>
                    <Badge badgeContent={badgeContent} color="secondary" overlap="rectangular">
                      <ShoppingBasketOutlined />
                    </Badge>
                  )}
                </NavLink>
              </Box>

              <Box className={classes.tabBox} >
                {props.signedIn ? (
                  <>
                    <Avatar src={props.avatar_url} onClick={openAvaMenu} />
                    <Menu
                      anchorEl={avaMenu}
                      open={!!avaMenu}
                      onClose={closeAvaMenu}
                      onMouseLeave={() => { closeAvaMenu() }}
                      // elevation={0}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      anchorPosition={{
                        top: '100px'
                      }}
                      PaperProps={{
                        style: {
                          left: '50%',
                          transform: 'translateY(13px)',
                        },
                      }}

                    >
                      {console.log('nav', props.userInfo)}
                      {!!props.userInfo && props.userInfo.isAdmin &&
                        <Link to='/admin'>
                          <MenuItem onClick={() => closeAvaMenu()}>
                            <ListItemIcon>
                              <SupervisorAccount style={{ color: 'purple' }} />
                            </ListItemIcon>
                            <ListItemText>
                              <span style={{ color: 'purple' }}>ADMIN</span>
                            </ListItemText>
                          </MenuItem>
                        </Link>
                      }

                      {!!props.userInfo && !props.userInfo.isAdmin &&
                        <Link to='/bill'>
                          <MenuItem onClick={() => closeAvaMenu()}>
                            <ListItemIcon>
                              <Receipt />
                            </ListItemIcon>
                            <ListItemText>
                              <span >Đơn mua</span>
                            </ListItemText>
                          </MenuItem>
                        </Link>
                      }
                      <MenuItem onClick={() => { logout(); closeAvaMenu() }}>
                        <ListItemIcon>
                          <ExitToApp style={{ color: 'red' }} />
                        </ListItemIcon>
                        <ListItemText>
                          <span style={{ color: 'red' }}>Đăng xuất</span>
                        </ListItemText>
                      </MenuItem>

                    </Menu>
                  </>
                ) : (
                  <Typography variant="body2" onClick={signIn} style={{ cursor: 'pointer', color: 'orange', fontWeight: 500 }}>
                    Sign in
                  </Typography>
                )}

              </Box>
              <Box marginLeft={0.1} />
            </div>
          </Toolbar>
          {/* <CategoryBar /> */}
          <MenuSach anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuSach>
          {/* <MenuNapCredit anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuNapCredit> */}
          {/* <MenuGioiThieu anchor={anchor} handleCloseMenu={handleCloseMenu}></MenuGioiThieu> */}
        </AppBar>
      </HideOnScroll>


    </div >
  )
}

Navbar.defaultProps = {
  signedIn: false,
  avatar_url: ''
}

export default Navbar