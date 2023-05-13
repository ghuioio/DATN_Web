import { Box, Button, Divider, IconButton, MenuItem, TextField, Typography, Slide, Snackbar } from "@material-ui/core"
import { FileCopyOutlined } from "@material-ui/icons"
import { Fragment, useEffect } from "react"
import { useState } from "react"
import { BUY_STATUS, HEROKU_API } from "../../Services/Constants"
import { axiosGet, axiosPut } from "../../Services/Ultils/axiosUtils"
import { numberWithCommas } from "../../Services/Ultils/NumberUtils"
import BillItem from "./BillItem"

const Bill = ({ _id, _status, _items, _totalBill, _address, setOpenAlert, setAlertMessage, setAlertSevirity }) => {

  const [hidden, setHidden] = useState(false)
  const clickCopy = () => {
    navigator.clipboard.writeText(_id);
  }

  const cancelOrder = async () => {
    let response = await axiosPut(`${HEROKU_API}/bill/canceledBill/${_id}`, {
      "status": 'canceled',
    }, true)
    console.log(response)
    setOpenAlert(true)
    if (!response || !response.success) {
      setAlertMessage('Không thể hủy đơn hàng')
      setAlertSevirity('error')
      return
    }
    setHidden(true)
    setAlertMessage('Hủy đơn hàng thành công')
    setAlertSevirity('success')
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
                <BillItem
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
                {_status==='unprocessed' &&
                  <Button variant='outlined' onClick={cancelOrder}>
                    Hủy đơn
                  </Button>
                }
              </Box>
            </Box>

          </Box>
        </Box>
      }
    </>
  )
}

export default Bill