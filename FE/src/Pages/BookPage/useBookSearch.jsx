import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BASE_API, BASE_FILE } from "../../Services/Constants"
import { useParams, useSearchParams } from "react-router-dom"
export default function useBookSearch(offset) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [lineData, setLineData] = useState([])
  const [gridData, setGridData] = useState([])
  const [gridLabel, setGridLabel] = useState('')

  let { cateIdV2 } = useParams()
  let [searchParams] = useSearchParams()
  let cateIdV3 = searchParams.get('cateIdV3')
  let cateId = cateIdV3 || cateIdV2

  useEffect(() => {
    setLineData([])
    setGridData([])
  }, [cateId])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel

    axios({
      method: 'GET',
      url: `${BASE_API}/pages/category/${cateId}/blocks`,
      params: { offset: offset, limit: 1 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      let allblocks = response.data.data
      console.log('get books', allblocks)
      let lineResult = []
      let gridResult = []

      allblocks.blocks.map(block => {
        if (offset === 0 && block.btype === 'LINE_BLOCK') {
          let lineRow = convertBlockToLineRow(block)
          lineResult.push(lineRow.getObject())
        } else if (block.btype === 'PAGE_BLOCK') {
          setGridLabel(block.label)
          block.items.map(item => {
            let gridItem = new GridItem(
              item.id,
              item.link,
              item.label,
              item.sprice,
              item.oprice,
              item.img_url,
              item.author,
              item.rating,
              item.votes,
              item.sale_start,
              item.sale_end,
            )

            gridResult.push(gridItem.getObject())
          })
        }
      })
      // console.log(offset)
      if (offset === 0) setLineData(lineResult)
      setGridData(prev => [...prev, ...gridResult])
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })

    return () => cancel()

  }, [cateId, offset])

  return { loading, error, lineData, gridData, hasMore, gridLabel }
}


export class LineRow {
  label = ''
  items = []
  link = ''
  constructor(label, link) {
    this.label = label
    this.link = link
  }

  addItem(item) {
    this.items.push(item)
  }

  getObject() {
    return {
      label: this.label,
      type: 'LINE_ROW',
      items: this.items,
      link: this.link
    }
  }
}

export class LineItem {
  type = ''
  img_url = ''
  link = ''
  old_price = ''
  sale_price = ''
  sale_end = ''
  sale_start = ''
  label = ''
  rating = 0
  constructor(type, src, link, old_price, sale_price, sale_end, sale_start, label, rating) {
    this.type = type
    this.img_url = `${src}`
    this.link = link
    this.old_price = old_price
    this.sale_price = sale_price
    this.sale_end = sale_end
    this.sale_start = sale_start
    this.label = label
    this.rating = rating
  }

  getObject() {
    return {
      type: this.type,
      img_url: this.img_url,
      link: this.link,
      old_price: this.old_price,
      sale_price: this.sale_price,
      sale_end: this.sale_end,
      sale_start: this.sale_start,
      label: this.label,
      rating: this.rating
    }
  }
}

export class GridItem {
  id
  link
  label
  sale_price
  old_price
  img_url
  author
  rating
  votes
  sale_start
  sale_end

  constructor(id, link, label, sale_price, old_price, img_url, author, rating, votes, sale_start, sale_end) {
    this.id = id
    this.link = link
    this.label = label
    this.sale_price = sale_price
    this.old_price = old_price
    this.img_url = `${img_url}`
    this.author = author
    this.rating = rating
    this.votes = votes
    this.sale_start = sale_start
    this.sale_end = sale_end
  }

  getObject() {
    return {
      id: this.id,
      link: this.link,
      label: this.label,
      sale_price: this.sale_price,
      old_price: this.old_price,
      img_url: this.img_url,
      author: this.author,
      rating: this.rating,
      votes: this.votes,
      sale_start: this.sale_start,
      sale_end: this.sale_end,
    }
  }
}

export function convertBlockToLineRow(block) {
  let lineRow = new LineRow(block.label, block.link)
  block.items.map(item => {
    let lineitem = new LineItem(
      item.itype,
      item.img_url,
      item.link,
      item.oprice,
      item.sprice,
      item.sale_end,
      item.sale_start,
      item.label,
      item.rating
    )
    lineRow.addItem(lineitem.getObject())
  })
  return lineRow
}