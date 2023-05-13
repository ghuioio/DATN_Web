import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Navigate, Link, useParams, useLocation } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  activeTab: {
    backgroundColor: '#0273A9',
    color: 'white',
    cursor: 'pointer'
  },
  inactiveTab: {
    backgroundColor: '#23282D',
    color: 'white',
    cursor: 'pointer'
  }
}))

const SideBar = () => {
  const classes = useStyles()
  const [tab, setTab] = useState('add-book')
  const location = useLocation()
  
  useEffect(() => {
    if (location.pathname.includes('add-book'))
      setTab('add-book')
  }, [location.pathname])

  return (
    <Box
      width='200px'
      height='100vh'
      style={{ backgroundColor: '#23282D', zIndex: 1001 }}
      position='fixed'
      top='0px'
      boxSizing='border-box'
      paddingTop={8}
    >
      <Link to='add-book'>
        <Box
          width='100%'
          height='50px'
          className={location.pathname.includes('add-book') ? classes.activeTab : classes.inactiveTab}
          display='flex'
          alignItems='center'
          paddingLeft={1}
          boxSizing='border-box'
        >
          <Typography>Thêm sách</Typography>
        </Box>
      </Link>
      <Link to='update-book'>
        <Box
          width='100%'
          height='50px'
          className={location.pathname.includes('update-book') ? classes.activeTab : classes.inactiveTab}
          display='flex'
          alignItems='center'
          paddingLeft={1}
          boxSizing='border-box'
        >
          <Typography>Update sách</Typography>
        </Box>
      </Link>
      <Link to='order-page'>
        <Box
          width='100%'
          height='50px'
          className={location.pathname.includes('order-page') ? classes.activeTab : classes.inactiveTab}
          display='flex'
          alignItems='center'
          paddingLeft={1}
          boxSizing='border-box'
        >
          <Typography>Đơn hàng</Typography>
        </Box>
      </Link>
      <Link to='stat-page'>
        <Box
          width='100%'
          height='50px'
          className={location.pathname.includes('stat-page') ? classes.activeTab : classes.inactiveTab}
          display='flex'
          alignItems='center'
          paddingLeft={1}
          boxSizing='border-box'
        >
          <Typography>Thống kê</Typography>
        </Box>
      </Link>
    </Box>
  )
}

export default SideBar