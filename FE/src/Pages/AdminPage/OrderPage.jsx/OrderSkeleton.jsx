import { Box, Divider } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

const OrderSkeleton = () => {
  return (
    <>
      <Box
        width='100%'
        padding={2}
        style={{ backgroundColor: 'white' }}
        boxSizing='border-box'
      >
        <Box marginTop={1}/>
        <Skeleton variant="text" width={300} height={30}/>
        <Box marginTop={3}/>
        <Divider/>
        <Box marginTop={1}/>
        <Skeleton variant="rect" width='100%' height={100} />
        <Box marginTop={1.5}/>
        <Divider/>
        <Box marginTop={1.5}/>
        <Skeleton variant="text" width={150}/>
        <Skeleton variant="text" width={250}/>
        <Skeleton variant="text" width={180}/>
        <Skeleton variant="text" width={100}/>
        
      </Box>
    </>
  )
}

export default OrderSkeleton