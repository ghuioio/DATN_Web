import { Grid, makeStyles } from "@material-ui/core";
import BoxItem from "./BoxItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: theme.spacing(2),
    height: 'fit-content',
    marginLeft: 0,
    marginRight: 0
  }
}))

const BoxList = (props) => {
  const classes = useStyles()
  return (
    <Grid container direction="row" className={classes.root} justifyContent="center" spacing={2} style={{maxWidth: '1480px'}}>
      {props.boxItems.map((boxitem, index) => (
        <BoxItem
          key={index}
          label={boxitem.label}
          items={boxitem.items}
          link={boxitem.link}
          // footer={boxitem.footer}
        />
      ))}
    </Grid>
  )
}

BoxList.defaultProps = {
  boxItems: []
}

export default BoxList