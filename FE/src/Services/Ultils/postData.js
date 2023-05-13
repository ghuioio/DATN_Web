async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  })
  return await response.json()
}

export default postData

export async function postData2(url, data) {
  let result = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return null
    })
  return result
}
