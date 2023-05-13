import { Button, styled } from "@material-ui/core";

export const OrangeButton = styled(Button)(({ width }) => ({
  backgroundColor: '#E4573D',
  color: 'white',
  '&:hover': {
    backgroundColor: 'black'
  },
  borderRadius: 0,
  width: width
}))