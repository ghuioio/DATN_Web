import { Avatar, Box, Button, Divider, Paper, Typography } from "@material-ui/core"
import { Check } from "@material-ui/icons"
import { Rating } from "@material-ui/lab"

const Review = (props) => {
  return (
    <Paper elevation={2}>

      <Box
        width='100%'
        marginBottom={1.5}
        // paddingLeft={2}
        padding={2}
      >
        <Box
          display='flex'
          alignItems='center'
        >
          <Avatar src={props.src} />
          <Box marginLeft={2} />
          <Typography>{props.username}</Typography>
        </Box>

        <Box
          display='flex'
          alignItems='center'
          marginY={1}
        >
          <Rating
            name="read-only"
            precision={0.1}
            value={Number(props.stars)}
            readOnly
            size="small">
          </Rating>
          <Box marginLeft={1.5} />
          {/* <Typography component='div' style={{ fontWeight: 600 }}>{props.summary}</Typography> */}
        </Box>

        <Box marginTop={1} />
        <Typography 
          variant='body1'
          component='div'
          style={{width: 'calc(100% - 20px)'}}
        >{props.details}</Typography>

      </Box>
    </Paper>
  )
}

Review.defaultProps = {
  src: '',
  username: 'Tuan',
  stars: '4',
  summary: 'Nice summary',
  place: 'Ha Noi',
  date: '13/4/2018',
  verified: true,
  details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque delectus eligendi porro, eum iste unde nam, veniam ut culpa quas doloribus? Ducimus suscipit sint quod ipsa quis praesentium hic, autem saepe aperiam earum repellat pariatur debitis fugiat reprehenderit magni nemo vero dolore adipisci, quo harum inventore accusantium non fugit placeat. Eos voluptatem quas a? Perspiciatis quaerat optio, beatae nulla aliquam sunt! Delectus sequi accusamus quo sunt modi, voluptatum voluptatibus ipsam nihil nesciunt odit saepe! Cupiditate debitis exercitationem ab dolores sit molestias. Aspernatur perferendis libero distinctio impedit natus, similique nemo! Assumenda amet ex ad inventore laudantium omnis hic voluptas vitae pariatur.',
  votes: '1,100'
}

export default Review