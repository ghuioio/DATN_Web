import { Box, Button, Divider, IconButton, MenuItem, TextField, Typography } from "@material-ui/core"
import { FileCopyOutlined } from "@material-ui/icons"
import { Fragment, useEffect } from "react"
import { useState } from "react"
import { BUY_STATUS, BUY_STATUS_VN, HEROKU_API } from "../../../Services/Constants"
import { axiosGet, axiosPut } from "../../../Services/Ultils/axiosUtils"
import { numberWithCommas } from "../../../Services/Ultils/NumberUtils"
import Loading from "../../Loading"
import OrderItem from "./OrderItem"


const Order = ({ _id, _status, _items, _totalBill, _address }) => {

  const [hidden, setHidden] = useState(false)
  const clickCopy = () => {
    navigator.clipboard.writeText(_id);
  }
  const [status, setStatus] = useState(_status)
  const [loading, setLoading] = useState(false)
  const confirm = async () => {
    setLoading(true)
    let response = await axiosPut(`${HEROKU_API}/bill/${_id}`, {
      "status": status,
    }, true)
    console.log(response)
    if (!response || !response.success) return
    setHidden(true)
    setLoading(false)
  }
  return (
    <>
      {!hidden &&
        <Box
          width='100%'
          padding={2}
          style={{ backgroundColor: 'white' }}
          boxSizing='border-box'
        >
          <Box display='flex' alignItems='center'>
            <Typography style={{ fontWeight: 600 }}>ID: {_id}</Typography>
            <Box marginLeft={2} />
            <IconButton
              size="small"
              onClick={clickCopy}
            >
              <FileCopyOutlined />
            </IconButton>
          </Box>

          <Box marginTop={2} />
          <Divider />

          <Box>
            {/**items */}
            {_items.map((item) => (
              <Fragment
                key={item._id}
              >
                <Box marginTop={1} />
                <OrderItem
                  _data={item.book}
                  _quantity={item.qualityBook}
                  _id={item._id}
                />
                <Box marginTop={1} />
                <Divider />
              </Fragment>
            ))}
          </Box>

          <Box marginTop={2} />

          <Box
            width='100%'
            display='flex'
            height='fit-content'
            justifyContent='space-between'
          >
            <Box width='70%'>
              {!!_address && typeof _address === 'object' &&
                <Typography variant='body2'>
                  {_address.name}
                  <br />
                  {_address.mobile}
                  <br />
                  {_address.street}, {_address.ward}, {_address.district}, {_address.province}
                </Typography>
              }
            </Box>
            <Box
              display='flex'
              alignItems='end'
              flexDirection='column'
              textAlign='end'
            >
              <Typography>
                <span style={{ color: 'orange', fontWeight: 'bold' }}>{numberWithCommas(_totalBill)}đ</span>
              </Typography>

              <Box marginTop={1} />
              <Box
                display='flex'
                justifyContent='flex-end'
                alignItems='end'
                paddingLeft={5}
              >
                <TextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  variant='outlined'
                  size="small"
                  style={{ width: '150px' }}
                >
                  {BUY_STATUS.map(status =>
                    <MenuItem
                      key={status}
                      value={status}
                    >
                      {BUY_STATUS_VN[status]}
                    </MenuItem>
                  )}
                </TextField>
                <Box marginLeft={1} />
                <Button
                  variant='contained'
                  color="primary"
                  disabled={status === _status || loading}
                  style={{ height: '40px', width: '100px' }}
                  onClick={confirm}
                >
                  Confirm
                </Button>
              </Box>
            </Box>

          </Box>
        </Box>
      }
      {loading && <Loading></Loading>}
    </>
  )
}

export default Order