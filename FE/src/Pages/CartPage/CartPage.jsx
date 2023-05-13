import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookListGrid from "../BookPage/BookListGrid";
import { common_variable } from "../common";
import Cart from "./Cart";

const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    backgroundColor: '#F4F3EC',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
}))

const CartPage = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  useEffect(() => {
    if (!common_variable.signedIn) {
      navigate('/signin', {state: {prev: window.location.pathname}})
    }
  }, [])
  return (
    <div className={classes.root}>
      <Cart setRefreshNavbar={props.setRefreshNavbar}></Cart>
      {/* <BookListGrid></BookListGrid> */}

    </div>
  )
}

export default CartPage