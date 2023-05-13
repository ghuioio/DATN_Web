import { Box, Typography } from "@material-ui/core"
import { SentimentVeryDissatisfied } from "@material-ui/icons"
import { Fragment, useCallback, useEffect, useRef } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { HEROKU_API } from "../../../Services/Constants"
import Order from "./Order"
import OrderSkeleton from "./OrderSkeleton"
import OrderStatusBar from "./OrderStatusBar"
import useGetOrder from "./useGetOrder"

const BuyOrderPage = () => {
  const { status } = useParams()
  const [offset, setOffset] = useState(0)

  useEffect(()=>{setOffset(0)}, [status])

  const { loading, error, hasMore, carts } = useGetOrder(`${HEROKU_API}/bill/bills`, status, offset)

  const observer = useRef()

  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prev => prev + 5)
        console.log('visible')
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <Box
      paddingTop={10}
      width='100%'
      display='flex'
      justifyContent='center'
      paddingBottom={2}
      position='relative'
      boxSizing='border-box'
    >
      <Box
        width='100%'
        paddingX={2}
        boxSizing='border-box'
      >
        <OrderStatusBar />
        <Box marginTop={2} />

        {carts.map((order, index) =>
          <Fragment key={`${order._id}${order.status}`}>
            <Order
              _id={order._id}
              _status={order.status}
              _items={order.sellProducts}
              _totalBill={order.totalBill}
              _address={order.address}
              _loading={loading}
            />
            <Box marginTop={2} />
          </Fragment>
        )}
        {carts.length === 0 && !loading &&
          <Box
            width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            paddingTop={20}
          >
            {error ?
              <>
                <Typography variant='h5' style={{ fontWeight: 500 }} color='secondary'>Lỗi khi tải dữ liệu</Typography>
              </>
              :
              <>
                <SentimentVeryDissatisfied style={{ fontSize: '50px' }} />
                <Box marginTop={2} />
                <Typography variant='h5' style={{ fontWeight: 500 }}>Không có đơn hàng nào</Typography>
              </>
            }

          </Box>
        }

        {!error && hasMore &&
          <>
            <div ref={lastElementRef} />
            <OrderSkeleton />
            <Box marginTop={2} />
            <OrderSkeleton />
          </>
        }
      </Box>
    </Box>
  )
}

export default BuyOrderPage