import { Box, Button, ButtonGroup, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core"
import { numberWithCommas } from "../../Services/Ultils/NumberUtils";

const BienDongSoDu = () => {
  return (
    <Box
      width='100%'
      height='fit-content'
      padding={3}
      boxSizing='border-box'
      style={{ backgroundColor: '#fff' }}
      // marginLeft={2}
      marginTop={2}
      // marginRight={3}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography
          variant="h5"
          style={{ fontWeight: '500' }}
          gutterBottom
        >
          Thông tin biến động số dư
        </Typography>

      </Box>

      <Divider />
      <Box marginTop={2} />

      <InfoTable />

    </Box>
  )
}

export default BienDongSoDu


function createData(name, calories, fat, carbs) {
  return {
    name,
    calories,
    fat,
    carbs,
  };
}

function createUpDownTypo(value) {
  const str = value.toString()
  const isDown = str.includes('-')
  const sign = isDown ? '' : '+'
  return (
    <Typography style={{ color: isDown ? "red" : "green" }}>{sign}{numberWithCommas(value)}</Typography>
  )
}

const rows = [
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(100000), '1.200.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),
  createData('2022/04/10', 'Thanh toán đơn hàng XYZ123', createUpDownTypo(-100000), '1.100.000'),

];

const InfoTable = () => {

  return (
    <TableContainer component={Paper} style={{maxHeight: '350px'}}>
      <Table size="small" aria-label="a dense table" stickyHeader >
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell align="center">Nội dung</TableCell>
            <TableCell align="center">{'Số credit (vnđ)'}</TableCell>
            <TableCell align="center">{'Số dư sau (vnđ)'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
}