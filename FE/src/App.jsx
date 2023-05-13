import { Box, makeStyles } from "@material-ui/core"
import { Navigate, Route, Routes } from "react-router-dom"
import BookPage from "./Pages/BookPage/BookPage"
import CartPage from "./Pages/CartPage/CartPage"
import ChooseAddress from "./Pages/CheckOut/ChooseAddress/ChooseAddress"
import ThanhToan from "./Pages/CheckOut/ThanhToan"
import Navbar from "./Pages/Navbar/Navbar"
import ProductPage from "./Pages/ProductPage/ProductPage"
import ProfilePage from "./Pages/Profile/ProfilePage"
import SearchResult from "./Pages/SearchResult/SearchResult"
import Signin from "./Pages/Signin/Signin"
import PdfReader from "./Pages/PdfReader/pdfReader"
import PdfPage from "./Pages/PdfReader/PdfPage"
import { useEffect, useState } from "react"
import ConfirmPage from "./Pages/ConfirmPage/ConfirmPage"
import { BASE_API, HEROKU_API } from "./Services/Constants"
import { axiosGet } from "./Services/Ultils/axiosUtils"
import { common_variable } from "./Pages/common"
import Login from "./Pages/Signin/CustomSignIn"
import HomePage from './Pages/HomePage/HomePage'
import DangVanChuyen from "./Pages/CheckOut/DangVanChuyen"
import ForgetPassword from "./Pages/Signin/ForgetPassword/ForgetPassword"
import AdminPage from "./Pages/AdminPage/AdminPage"
import AddBookPage from "./Pages/AdminPage/AddBookPage/AddBookPage"
import UpdateBookPage from "./Pages/AdminPage/UpdateBookPage/UpdateBookPage"
import OrderPage from "./Pages/AdminPage/OrderPage.jsx/OrderPage"
import { Typography } from "@material-ui/core"
import BillPage from "./Pages/BillPage/BillPage"
import Footer from "./Layouts/Footer/Footer"
import DieuKhoan from './Layouts/Footer/DieuKhoan'
import ChinhSachBaoMat from './Layouts/Footer/ChinhSachBaoMat'
import GioiThieu from './Layouts/Footer/GioiThieu'
import StatPage from "./Pages/AdminPage/StatPage/StatPage"

const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    height: 'fit-content',
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    position: 'relative',
    backgroundColor: '#F4F3EC',
    display: 'flex',
    flexDirection: 'column'
  },
}))


const App = () => {
  const classes = useStyles()
  const [userInfo, setUserInfo] = useState(null)
  const [signedIn, setSignedIn] = useState(false)
  const [checkLogin, setCheckLogin] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([]))
    const checkLogin = async () => {
      let url = `${HEROKU_API}/auth/verify`
      let response = await axiosGet(url, null, true)
      console.log('check login', response)
      if (response !== null && response.success) {
        setSignedIn(true)
        setUserInfo(response.data)
        getCart()
      }
      setCheckLogin(true)
    }
    checkLogin()
  }, [])

  const _setUserInfo = async (info) => {
    console.log('data', info)
    setSignedIn(true)
    setUserInfo(info)
    console.log('user info', userInfo)
    localStorage.setItem('access_token', info.token)
    getCart()
  }

  const getCart = async (data) => {
    let response = await axiosGet(`${HEROKU_API}/cart`, null, true)
    let cart = []
    if (response && response.success)
      cart = response.data.sellProducts.map((item) => {
        return {
          book: item.book,
          qualityBook: item.qualityBook
        }
      })
    console.log('cart', response)
    localStorage.setItem('cart', JSON.stringify(cart))
    setRefreshNavbar(prev => !prev)
  }

  useEffect(() => {
    common_variable.signedIn = signedIn
  }, [signedIn])

  const [refreshNavbar, setRefreshNavbar] = useState(false)


  return (
    <>
      {checkLogin &&
        <div className={classes.app}>
          <Navbar signedIn={signedIn} refresh={refreshNavbar} userInfo={userInfo} />
          <Routes>
            <Route path='/home' element={<Navigate to='/' />} />
            <Route path='/' element={<HomePage />} />
            <Route path="/book-page/:idCategory" element={<BookPage />} />
            <Route path="/cart" element={<CartPage setRefreshNavbar={setRefreshNavbar} />} />
            <Route path="/product/:id" element={<ProductPage setRefreshNavbar={setRefreshNavbar} userInfo={userInfo} />} />
            <Route path="/search/:keyword" element={<SearchResult />} />
            <Route path="/chon-dia-chi" element={<ChooseAddress />} />
            <Route path="/thanh-toan" element={<ThanhToan />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dang-van-chuyen" element={<DangVanChuyen />} />
            <Route path="/signin" element={<Signin _setUserInfo={_setUserInfo} />} />
            <Route path="/pdf-page" element={<PdfPage />} />
            <Route path="/pdfreader/:id" element={<PdfReader />}  />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/forget-password/:step" element={<ForgetPassword />} />

            <Route path="/admin" element={<Navigate to='/admin/add-book' />} />
            <Route path="/admin" element={<AdminPage userInfo={userInfo} />}>
              <Route path="add-book" element={<AddBookPage />} />
              <Route path="update-book" element={<UpdateBookPage />} />
              <Route path="order-page/:status" element={<OrderPage />} />
              <Route path="order-page" element={<Navigate to='unprocessed' />} />
              <Route path="stat-page" element={<StatPage />} />
            </Route>

            <Route path="/bill" element={<Navigate to='/bill/unprocessed' />} />
            <Route path="/bill/:status" element={<BillPage userInfo={userInfo} />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/chinh-sach-bao-mat" element={<ChinhSachBaoMat />} />
            <Route path="/dieu-khoan" element={<DieuKhoan />} />

          </Routes>

          <Box flexGrow={1} display='flex' alignItems='end'>
            <Footer signedIn={signedIn}/>
          </Box>
        </div>
      }
    </>

  )
}

export default App