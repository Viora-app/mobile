import {
  colors,
  boxes,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';
import {Themes} from '../../context/presetsContext/types';

const styles = (theme: Themes) => ({
  wrapper: {
    height: '100%',
    flexFlow: 'row noWrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h4,
    color: colors[theme].primaryStrong,
  },
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  actionBar: {
    width: 200,
  },
});

export default styles;
