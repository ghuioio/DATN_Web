import axios from "axios";

export const axiosGet = async (url, params, isHeader = false) => {
  let result = await axios({
    method: 'get',
    url: url,
    params: params,
    headers: isHeader ? {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    } : null
  })
    .then(response => response.data)
    .catch(err => {
      console.log(err)
      return null
    })
  return result
}

export const axiosPost = async (url, params, isHeader = false) => {
  let result = await axios({
    method: 'post',
    url: url,
    data: params,
    headers: isHeader ? {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    } : null
  })
    .then(response => response.data)
    .catch(err => {
      console.log(err.response)
      return err.response.data
    })

  return result
}

export const axiosDelete = async (url, params, isHeader = false) => {
  let result = await axios({
    method: 'delete',
    url: url,
    params: params,
    headers: isHeader ? {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    } : null
  })
    .then(response => response.data)
    .catch(err => {
      console.log(err)
      return null
    })

  return result
}

export const axiosPatch = async (url, params, isHeader = false) => {
  let result = await axios({
    method: 'patch',
    url: url,
    params: params ? ({ ...params }) : null,
    headers: isHeader ? {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    } : null
  })
    .then(response => response.data)
    .catch(err => {
      console.log(err)
      return null
    })

  return result
}

export const axiosPut = async (url, params, isHeader = false) => {
  let result = await axios({
    method: 'put',
    url: url,
    data: params ? params : null,
    headers: isHeader ? {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    } : null
  })
    .then(response => response.data)
    .catch(err => {
      console.log(err)
      return null
    })

  return result
}