import { Box, makeStyles, Typography } from "@material-ui/core";
import { AspectRatio, Business, CompareOutlined, DateRangeOutlined, GTranslate, ImportContacts, LibraryBooksOutlined, PublicOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({

}))

const icons = {
  publisher: <CompareOutlined />,
  publication_date: <DateRangeOutlined />,
  dimensions: <AspectRatio/>,
  book_cover: <ImportContacts/>,
  translator: <GTranslate/>,
  number_of_page: <LibraryBooksOutlined />,
  manufacturer: <Business/>,

}

const InfoIcon = ({ name, code, value }) => {
  const classes = useStyles()
  return (
    <Box
      width='fit-content'
      height='120px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-evenly'
    >
      <Typography variant='caption'>{name}</Typography>
      {icons[code]}
      <Typography variant='caption' style={{ fontWeight: 500 }}>{value}</Typography>
    </Box>
  )
}

InfoIcon.defaultProps = {
  title: '',
  icon: '',
  info: ''
}

export default InfoIcon