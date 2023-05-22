import { Box, Button, Dialog, Divider, Grid, LinearProgress, makeStyles, TextField, Typography, Snackbar, Slide } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HEROKU_API } from "../../Services/Constants";
import { axiosPost } from "../../Services/Ultils/axiosUtils";
import { common_variable } from "../common";
import { CustomButton } from "../CustomComponent/CustomButton";
import badWords from "../../Services/Ultils/badWord.js"
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles(theme => ({

}))

function TransitionRight(props) {
  return (
    <Slide {...props} direction="right">
      <Alert
        severity="error"
        elevation={6} variant="filled"
      >
        Bình luận có chứa từ ngữ không hợp lệ.
      </Alert>
    </Slide>
  )
}

const CustomerRatings = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [star, setStar] = useState(5)
  const [comment, setComment] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  let { id } = useParams()
  const navigate = useNavigate()
  const clickOpenDialog = () => {
    if (!common_variable.signedIn) navigate('/signin')
    else {
      setOpenDialog(true)
    }
  }

  // Check if a comment has bad words
  const checkBadWords = (comment) => {

    const listBadWords = badWords.split(' ');
    const listWordInComment = comment.split(' ');

    for(const word of listWordInComment){
      if(listBadWords.includes(word)){
        return true;
      }
    }
    return false;
  }

  const postComment = async () => {
    // checkBadWords(comment)
    if(comment.length < 1 || checkBadWords(comment)) {
      // console.log('Your Comment has bad words')
      setOpenAlert(true)
      return
    }
    props.setLoading(true)
    let data = {
      "content": comment,
      "bookId": id,
      "numberStars": star
    }
    setOpenDialog(false)
    setStar(5)
    setComment('')
    await axiosPost(`${HEROKU_API}/comments`, data, true)
    props.getBookDetails()
  }

  return (
    <Box
      width='25%'
      maxWidth='400px'
      boxSizing='border-box'
      paddingTop={2}
    // style={{backgroundColor:'yellow'}}
    >
      <Typography variant="h5">Đánh giá</Typography>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        marginTop={1}
        marginBottom={1}
      >
        <Rating
          name="read-only"
          precision={0.1}
          value={Number(props.stars)}
          readOnly>
        </Rating>
        <Box marginLeft={1} />
        <Typography variant="body1">{props.stars}/5</Typography>
      </Box>
      <Typography variant="body2">{props.votes}&nbsp;đánh giá</Typography>

      <Box marginTop={2} />

      {/* {props.ratings.map((rating, index) => (
        <Grid container alignItems="center" spacing={2} key={index}>
          <Grid item >
            <Typography color="primary" component='div' variant="body2">{5 - index}&nbsp;sao</Typography>
          </Grid>
          <Grid item xs={7}>
            <LinearProgress value={rating} variant="determinate" style={{ height: '20px', borderRadius: '5px' }} />
          </Grid>
          <Grid item >
            <Typography color="primary" component='div' variant="body2">{rating}%</Typography>
          </Grid>
        </Grid>
      ))} */}

      {props.allowComment &&
        <>
          <Box marginTop={4} marginBottom={3}><Divider /></Box>
          <Box paddingRight={2}>
            <Typography variant="h6">Đánh giá sản phẩm này</Typography>
            <Box marginTop={0.5} />
            <Typography variant='body2'>Chia sẻ suy nghĩ của bạn với mọi người</Typography>
            <Box marginTop={2} />
            <Button variant="outlined" color="primary" fullWidth onClick={clickOpenDialog}>Viết đánh giá</Button>
          </Box>
        </>
      }

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }}>
        <Box padding={2} width='500px'>
          <Typography variant='h6'>Đánh giá sách</Typography>
          <Divider />
          <Box marginTop={2} />
          <Box display='flex'>
            <Typography>Số sao:</Typography>
            <Box marginLeft={1} />
            <Rating precision={1} value={star} onChange={(e, value) => { if (value) setStar(value) }} />
            <Box marginLeft={1} />
            <Typography>({star})</Typography>
          </Box>
          <Box marginTop={2} />
          <TextField
            value={comment}
            onChange={(e) => { setComment(e.target.value) }}
            variant="outlined"
            placeholder="Đánh giá của bạn..."
            size='small'
            fullWidth
            multiline
            minRows={10}
            maxRows={15}
          />
          <Box marginTop={2} />
          <CustomButton variant='contained' backgroundColor='yellow' onClick={postComment}>Gửi đánh giá</CustomButton>
        </Box>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => { setOpenAlert(false) }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={TransitionRight}
      >
      </Snackbar>

    </Box>
  )
}

CustomerRatings.defaultProps = {
  stars: '',
  votes: '',
  ratings: []
}

export default CustomerRatings