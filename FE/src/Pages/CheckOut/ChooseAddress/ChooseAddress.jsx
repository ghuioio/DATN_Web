import { Box, makeStyles, Typography, Paper, Divider, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Checkbox, Input } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../Services/Ultils/NumberUtils";
import Address from "./Address";
import ThanhToanStepper from "../ThanhToanStepper";
import { CustomButton } from "../../CustomComponent/CustomButton";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "../../../Services/Ultils/axiosUtils";
import { v4 } from "uuid";
import { BASE_API, HEROKU_API, PrevChooseAddress } from "../../../Services/Constants";
import { common_variable } from "../../common";
import Loading from "../../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F3EC'
  },
  submitButton: {
    width: '300px',
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'top',
    height: '100%',
    width: 'auto',
  }
}))

const address = {
  _id: '-1',
  name: 'Tuan',
  mobile: '0386028080',
  province: 'Ha Noi',
  district: 'Gia Lam',
  ward: 'Thi tran Yen Vien',
  street: '103 Ha Huy Tap',
  is_office: true
}



const ShipAddress = (props) => {
  const classes = useStyles()
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const [resetKey0, setResetKey0] = useState(true)
  const [resetKey1, setResetKey1] = useState(true)
  const [resetKey2, setResetKey2] = useState(true)
  const [addressList, setAddressList] = useState([])
  const [addressID, setAddressID] = useState('')
  const [name, setName] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [street, setStreet] = useState('')
  const [mobile, setMobile] = useState('')
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!common_variable.signedIn) {
      navigate('/signin', { state: { prev: '/home' } })
    }
  }, [])

  const getProvinceList = async () => {
    const data = await axiosGet('https://api.mysupership.vn/v1/partner/areas/province')
    setProvinceList(data.results)
  }
  const getUserAddresses = async () => {
    let response = await axiosGet(`${BASE_API}/users/addresses`, null, true)
    console.log('addresses', response.data)
    setAddressList(response.data)
  }

  useEffect(() => {
    getProvinceList()
    // getUserAddresses()
  }, [])

  const clearAddressInput = () => {
    setAddressID('')
    setName('')
    setMobile('')
    setProvince('')
    setDistrict('')
    setWard('')
    setStreet('')
    setUpdate('')
    setResetKey0(prev => !prev)
    setResetKey1(prev => !prev)
    setResetKey2(prev => !prev)
  }

  const onChooseProvince = async (event, name) => {
    // const index = provinceList.findIndex(province => province.name === name)
    // if (index !== -1) {
    //   const data = await axiosGet(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceList[index].code}`)
    //   setDistrictList(data.results)
    // }
    // else {
    //   setDistrictList([])
    //   setCommuneList([])
    // }
    setResetKey1(prev => !prev)
    setResetKey2(prev => !prev)
    setProvince(name)
    setDistrict('')
    setWard('')
  }

  const onChooseDistrict = async (event, name) => {
    // const index = districtList.findIndex(district => district.name === name)
    // if (index !== -1) {
    //   const data = await axiosGet(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtList[index].code}`)
    //   setCommuneList(data.results)
    // }
    // else {
    //   setCommuneList([])
    // }
    setResetKey2(prev => !prev)
    setDistrict(name)
    setWard('')
  }

  const onFocusDistrict = async () => {
    const index = provinceList.findIndex(prov => prov.name === province)
    if (index !== -1) {
      const data = await axiosGet(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceList[index].code}`)
      setDistrictList(data.results)
    }
    else {
      setDistrictList([])
      setCommuneList([])
    }
  }

  const onFocusCommune = async () => {
    const index = districtList.findIndex(dist => dist.name === district)
    if (index !== -1) {
      const data = await axiosGet(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtList[index].code}`)
      setCommuneList(data.results)
    }
    else {
      setCommuneList([])
    }
  }

  const { state } = useLocation()
  const prev = (state) ? state.prev : null

  const addNewAddress = async (event) => {
    event.preventDefault()
    const inputs = event.target.elements

    const name = inputs['name'].value
    const mobile = inputs['mobile'].value.toString()
    const ward = inputs['ward'].value
    const district = inputs['district'].value
    const province = inputs['province'].value
    const street = inputs['street'].value
    const new_address = {
      name,
      mobile,
      province,
      district,
      ward,
      street,
    }
    console.log('new address', new_address)
    setLoading(true)
    let response = await axiosPost(`${HEROKU_API}/bill`, {
      "sellProducts": JSON.parse(localStorage.getItem('cart')),
      "address": new_address,
    }, true)
    if (!response || !response.success) return
    localStorage.setItem('cart', JSON.stringify([]))
    await axiosPost(`${HEROKU_API}/cart`, [], true)
    setLoading(false)
    if (prev === PrevChooseAddress.SHIP_DINH_GIA) navigate('/dang-van-chuyen', { state: { user_address: new_address } })
    else if (prev === PrevChooseAddress.CHECK_OUT) navigate('/dang-van-chuyen', { state: { user_address: new_address } })
  }

  const exitUpdate = () => {
    clearAddressInput()
    setUpdate(false)
  }


  return (
    <>
      <Box
        className={classes.root}
        width='100%'
        height='fit-content'
        boxSizing='border-box'
        paddingTop={8}
        display='flex'
      >
        <Box
          width='100%'
          height='fit-content'
          boxSizing='border-box'
          marginLeft={2}
          marginTop={2}
          marginRight={3}
          style={{ backgroundColor: '#00000000' }}
        >

          {prev === PrevChooseAddress.CHECK_OUT &&
            <ThanhToanStepper step={1} />
          }
          <Box marginTop={2} />

          {/*Main area */}
          <Box
            width='100%'
            height='fit-content'
            padding={3}
            boxSizing='border-box'
            style={{ backgroundColor: '#fff' }}
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
                Địa chỉ giao hàng
              </Typography>

            </Box>
            <Divider />

            <Box marginTop={2} />

            <form onSubmit={addNewAddress}>
              <Box width='60%'>
                {/* <Input fullWidth placeholder="Người nhận" required id="username"></Input> */}
                <TextField value={name} size="small" variant="outlined" fullWidth label="Người nhận" required id="name" onChange={(e) => setName(e.target.value)}></TextField>
              </Box>

              <Box width='60%' display='flex' marginTop={0.5}>
                <Autocomplete
                  id="province"
                  key={'0' + resetKey0}
                  fullWidth
                  name="province"
                  freeSolo
                  options={provinceList.map((option) => option.name)}
                  value={province}
                  renderInput={(params) => (
                    <TextField {...params}
                      size="small" label="Thành phố" margin="dense" variant="outlined" required
                      onChange={(e) => { setProvince(e.target.value) }}
                    />
                  )}
                  onChange={onChooseProvince}
                />
                <Box marginLeft={1.5} />
                <Autocomplete
                  id="district"
                  key={'1' + resetKey1}
                  fullWidth
                  name="district"
                  freeSolo
                  options={districtList.map((option) => option.name)}
                  value={district}
                  renderInput={(params) => (
                    <TextField {...params}
                      size="small" label="Huyện" margin="dense" variant="outlined" required
                      onChange={(e) => { setDistrict(e.target.value) }}
                    />
                  )}
                  onChange={onChooseDistrict}
                  onFocus={onFocusDistrict}
                />
                <Box marginLeft={1.5} />
                <Autocomplete
                  id="ward"
                  key={'2' + resetKey2}
                  fullWidth
                  name="ward"
                  freeSolo
                  options={communeList.map((option) => option.name)}
                  value={ward}
                  renderInput={(params) => (
                    <TextField {...params}
                      size="small" label="Xã" margin="dense" variant="outlined" required
                      onChange={(e) => setWard(e.target.value)}
                    />
                  )}
                  onChange={(e, name) => setWard(name)}
                  onFocus={onFocusCommune}
                />
              </Box>

              <Box width='60%' marginTop={1}>
                <TextField value={street} size="small" variant="outlined" fullWidth label="Địa chỉ nhà" required id="street"
                  onChange={(e) => setStreet(e.target.value)}
                />
                <Box marginTop={1.5} />
                <TextField value={mobile} size="small" variant="outlined" type='number' fullWidth label="Số điện thoại" required id="mobile"
                  onChange={(e) => setMobile(e.target.value)}
                />
                <Box marginTop={1.5} />

              </Box>
              <Box marginTop={2} />
              {!update &&
                <CustomButton size='small' type="submit" backgroundColor="yellow" variant="contained" className={classes.submitButton} disabled={loading}>Giao đến địa chỉ này</CustomButton>
              }

              {update &&
                <Box display='flex' width='300px' marginTop={1}>
                  <CustomButton size='small' type="submit" backgroundColor="yellow" variant="contained" className={classes.submitButton}>Cập nhật</CustomButton>
                  <Box marginLeft={1} />
                  <Button fullWidth variant="outlined" size="small" onClick={exitUpdate}>Hủy</Button>
                </Box>
              }
            </form>

          </Box>
        </Box>

      </Box>
      {loading && <Loading/>}
    </>
  )
}

ShipAddress.defaultProps = {
  balance: 10000000
}

export default ShipAddress