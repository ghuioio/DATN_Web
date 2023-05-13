import { Button, styled } from "@material-ui/core";

export const WhiteButton = styled(Button)(({ width }) => ({
  backgroundColor: 'transparent',
  color: 'black',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white'
  },
  borderRadius: 0,
  border: '1px solid black',
  width: width

}))