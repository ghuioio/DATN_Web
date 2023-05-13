import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const COLOR = {
  black: '#000',
  white: '#fff'
}

const BACKGROUND_COLOR = {
  yellow: '#FAD84C',
  orange: '#F3A741'
}

const BORDER_RADIUS = {
  normal: '4px',
  amazon: '8px',
  round: '30px'
}
 

export const CustomButton = styled(Button)(({ backgroundColor, color, borderRadius, width }) => ({
  backgroundColor: BACKGROUND_COLOR[backgroundColor] || backgroundColor,
  '&:hover': {
    backgroundColor: BACKGROUND_COLOR[backgroundColor] || backgroundColor
  },
  color: COLOR[color] || color,
  borderRadius: BORDER_RADIUS[borderRadius] || borderRadius,
  width: width
}))



