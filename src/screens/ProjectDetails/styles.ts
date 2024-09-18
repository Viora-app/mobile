import {colors, fonts, boxes} from '../../config/stylesGuides';
import {Themes} from '../../context/presetsContext/types';

const styles = (theme: Themes) => ({
  screenContainer: {
    height: '100%',
    width: '100%',
  },
  projectsScreen: {
    backgroundColor: colors[theme].secondaryStrong,
  },
  pageTitle: {
    ...fonts.h2,
    paddingTop: boxes.paddingMedium,
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
  },
});

export default styles;
