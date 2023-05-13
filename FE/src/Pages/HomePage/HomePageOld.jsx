import { Box, makeStyles } from "@material-ui/core";
import { Fragment, useEffect, useRef, useState } from "react";
import { BASE_API, BASE_FILE } from "../../Services/Constants";
import { axiosGet } from "../../Services/Ultils/axiosUtils";
import BoxList from "./BoxList/BoxList";
import ItemSlider from "./Slider/ItemSlider";
import SlideShow from "./SlideShow/SlideShow";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    // backgroundColor: theme.palette.grey[100],
    backgroundColor: '#EAEDED',
    width: '100%',
    height: 'fit-content',
    position: 'relative',
    alignItems: 'center'
  },
  slideShow: {
    position: 'absolute',
    top: 0
  }
}))



const HomePage = (props) => {
  const classes = useStyles()
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await axiosGet(`${BASE_API}/pages/home/blocks`, { offset: 0, limit: 10 })
      console.log(response.data)
      let allblocks = response.data
      let result = []
      let blockRow = new Block14Row()
      allblocks.map((block) => {
        if (block.btype === 'SBLOCK_1SUB' || block.btype === "SBLOCK_4SUB") {
          if (blockRow.isFull()) {
            result.push(blockRow.getObject())
            blockRow = new Block14Row()
          }

          let block14 = new Block14(block.label, block.link)
          block.items.map(item => {
            let block14item = new Block14Item(
              item.itype,
              item.img_url,
              item.link,
              item.oprice,
              item.sprice,
              item.sale_end,
              item.sale_start,
              item.label
            )
            block14.addItem(block14item.getObject())
          })
          blockRow.addBlock(block14.getObject())

        }
        else if (block.btype === 'LINE_BLOCK') {
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
              item.label
            )
            lineRow.addItem(lineitem.getObject())
          })
          result.push(lineRow.getObject())
        }
      })
      result.push(blockRow.getObject())
      console.log(result)
      setData(result)
    }

    getData()
  }, [])

  return (
    <div className={classes.root}>
      <SlideShow className={classes.slideShow} />
      <Box marginTop={30} />

      {data.map((row, index) => {
        if (row.type === "BLOCK_ROW") {
          return <BoxList key={index} boxItems={row.blocks14} />
        } else if (row.type === "LINE_ROW") {
          return (
            <Fragment key={index}>
              <Box marginTop={2} />
              < ItemSlider
                key={index}
                items={row.items}
                label={row.label}
                link={row.link}
              />
            </Fragment>
          )
        }
      })}

      {/* <BoxList
        boxItems={box_items}
      />
      <ItemSlider
        listname='Trending deals'
        items={slider_items}
      />
      <ItemSlider
        listname='Trending deals'
        items={slider_items}
      /> */}
      {/* <ItemSlider
        listname='Trending deals'
        items={slider_items}
      /> */}
    </div>
  )

}

export default HomePage

class Block14Row {
  blocks14 = []

  isFull() {
    return this.blocks14.length === 4
  }

  addBlock(block) {
    this.blocks14.push(block)
  }

  getObject() {
    return {
      header: '',
      type: 'BLOCK_ROW',
      blocks14: this.blocks14
    }
  }
}

class Block14 {
  label = ''
  link = ''
  items = []

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
      link: this.link,
      items: this.items,
    }
  }
}

class Block14Item {
  type = ''
  img_url = ''
  link = ''
  old_price = ''
  sale_price = ''
  sale_end = ''
  sale_start = ''
  label = ''
  constructor(type, src, link, old_price, sale_price, sale_end, sale_start, label) {
    this.type = type
    this.img_url = `${BASE_FILE}/${src}`
    this.link = link
    this.old_price = old_price
    this.sale_price = sale_price
    this.sale_end = sale_end
    this.sale_start = sale_start
    this.label = label
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
      label: this.label
    }
  }
}

class LineRow {
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

class LineItem {
  type = ''
  img_url = ''
  link = ''
  old_price = ''
  sale_price = ''
  sale_end = ''
  sale_start = ''
  label = ''
  constructor(type, src, link, old_price, sale_price, sale_end, sale_start, label) {
    this.type = type
    this.img_url = src
    this.link = link
    this.old_price = old_price
    this.sale_price = sale_price
    this.sale_end = sale_end
    this.sale_start = sale_start
    this.label = label
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
      label: this.label
    }
  }
}

// let slider_item = {
//   newprice: '$10.00',
//   oldprice: '$12.00',
//   src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//   details: [
//     '10 days left'
//   ]
// }

// let slider_items = new Array(10).fill(slider_item)

// let box_item_1 = {
//   header: 'Books for everyone 1',
//   items: [
//     {
//       src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//     }
//   ],
//   footer: 'Shop fiction books'
// }

// let box_item_2 = {
//   header: 'Books for everyone 2',
//   items: [
//     {
//       src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//       title: 'Wizard'
//     },
//     {
//       src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//       title: 'Wizard'
//     },
//     {
//       src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//       title: 'Wizard'
//     },
//     {
//       src: 'https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg',
//       title: 'Wizard'
//     }
//   ],
//   footer: 'Shop fiction books'
// }

// let box_items = [
//   box_item_1, box_item_1, box_item_2, box_item_1
// ]
