import { Box, Typography } from "@material-ui/core"
import { numberWithCommas } from "../../Services/Ultils/NumberUtils"

const BillItem = ({ _id, _data, _quantity }) => {


  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='space-between'
    >
      <Box display='flex'>
        <Box>
          <img
            src={`${_data.imageURL[0]}`}
            style={{
              height: '80px',
              width: '80px',
              objectFit: 'contain',
              objectPosition: 'center',
              cursor: 'pointer'
            }}
          />
        </Box>
        <Box marginLeft={1} />
        <Box>
          <Typography variant='body2'>
            {_data.name} <b>x{_quantity}</b>
            <br />
            ID: {_id}
          </Typography>
        </Box>

      </Box>
      <Box>
        <Typography style={{ textAlign: 'end', color: 'orange', fontWeight: 'bold' }}>
          {numberWithCommas(_data.price * _quantity)}đ
        </Typography>
        <Typography variant='body2'>
          ({numberWithCommas(_data.price)}đ x{_quantity})
        </Typography>
      </Box>
    </Box>
  )
}

export default BillItem