export const BASE_API = 'https://books.monsters.vn/apis'
export const BASE_FILE = 'https://books.monsters.vn/files'
// export const HEROKU_API = "https://book-ecommerce-be.herokuapp.com/api"
export const HEROKU_API = "http://localhost:8080/api"
export const PDF_API = "http://localhost:5000"
export const VOICE_API = "https://tjervfsstu4zexu4hbabzqolq40zudgs.lambda-url.ap-southeast-1.on.aws"

export const PrevChooseAddress = {
  CHECK_OUT: 1,
  SHIP_DINH_GIA: 2
}
export const BUY_STATUS = [
  "unprocessed", 
  "processed", 
  "completed",
  "canceled"
]

export const BUY_STATUS_VN = {
  "unprocessed": "ĐANG XỬ LÝ", 
  "processed": "ĐANG SHIP", 
  "completed": "HOÀN THÀNH",
  "canceled": "ĐÃ HỦY"
}