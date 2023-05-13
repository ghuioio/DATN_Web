import { Box, Paper, Tab, Tabs, Typography, useScrollTrigger } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BUY_STATUS, BUY_STATUS_VN } from "../../../Services/Constants"

const OrderStatusBar = () => {

  const navigate = useNavigate()
  const { status } = useParams()

  useEffect(() => {
    setValue(BUY_STATUS.indexOf(status))
  }, [status])

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const trigger = useScrollTrigger({ target: undefined, threshold: 0 })

  return (
    <Paper 
      square 
      style={{
        // width: '100%',
        position: '-webkit-sticky',
        position: 'sticky',
        top: trigger ? 0 : 64,
        zIndex: 1000,
      }}
    >
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        // variant="fullWidth"
        style={{minWidth: '0px'}}
        centered
      >
        {BUY_STATUS.map((status) =>
          <Tab
            key={`${status}`}
            label={`${BUY_STATUS_VN[status]}`}
            style={{width: '25%', minWidth: 0}}
            onClick={() => { navigate(`/admin/order-page/${status}`) }}
          />
        )}
      </Tabs>
    </Paper>
  )
}

export default OrderStatusBar
