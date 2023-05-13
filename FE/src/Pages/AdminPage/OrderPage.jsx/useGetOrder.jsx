import { useEffect, useState } from "react"
import axios from "axios"
import { useRef } from "react"

export default function useGetOrder(url, status, offset) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [carts, setCarts] = useState([])
  const prevGetTime = useRef()

  useEffect(()=>{
    console.log(status, offset)
  }, [status, offset])

  useEffect(() => {
    setCarts([])
    setError(false)
    setLoading(true)
    setHasMore(true)
    let cancel
    axios({
      method: 'GET',
      url: url,
      params: { status: status, offset: 0, limit: 5 },
      cancelToken: new axios.CancelToken(c => cancel = c),
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(response => {
      
      if (!response.data.success) {
        setError(true)
        return
      }
      const data = response.data.data
      setLoading(false)
      setCarts(data)
      setHasMore(data.length !== 0)
      prevGetTime.current = new Date()
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })

    return () => {
      cancel()
    }

  }, [url, status])

  useEffect(() => {
    if (!hasMore || offset === 0) return
    // if (new Date().getTime() - prevGetTime.current.getTime() < 500) return
    prevGetTime.current = new Date()
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: 'GET',
      url: url,
      params: { status: status, offset: offset, limit: 5 },
      cancelToken: new axios.CancelToken(c => cancel = c),
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(response => {
      console.log(response)
      let data = response.data.data
      setLoading(false)
      setHasMore(data.length !== 0)
      setCarts(prev => [...prev, ...data])
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })

    return () => cancel()
  }, [offset])

  return { loading, error, hasMore, carts }
}