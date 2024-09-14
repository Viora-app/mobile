import {Themes} from '../../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  key: {
    fontSize: fontSizes.h4,
    fontFamily: fontFamilies.poppinsRegular,
    fontWeight: 500,
    color: colors[theme].neutralMild,
  },
  value: {
    fontSize: fontSizes.h3,
    fontFamily: fontFamilies.poppinsRegular,
    fontWeight: 500,
    color: colors[theme].neutralMighty,
    paddingBottom: boxes.paddingMedium,
  },
});

export default styles;
