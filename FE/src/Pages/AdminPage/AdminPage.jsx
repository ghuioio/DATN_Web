import { Box } from "@material-ui/core"
import { useEffect } from "react"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import AddBookPage from "./AddBookPage/AddBookPage"
import SideBar from "./SideBar"

const AdminPage = ({userInfo}) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if (!userInfo || !userInfo.isAdmin) navigate('/')
  }, [userInfo])
  return (
    <Box
      width='100%'
      minHeight='100vh'
      height='fit-content'
      style={{ backgroundColor: '#F4F3EC' }}
      display='flex'
      position='relative'
      paddingBottom={2}
      boxSizing='border-box'
    >
      <SideBar />
      <Box minWidth='200px' width='200px'/>
      <Outlet/>
    </Box>
  )
}

export default AdminPage