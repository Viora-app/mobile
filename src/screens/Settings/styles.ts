import {Themes} from '../../context/presetsContext/types';
import {colors, boxes} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  screenContainer: {
    height: '100%',
    width: '100%',
  },
  settingsScreen: {
    backgroundColor: colors[theme].secondaryStrong,
  },
  sectionHeader: {
    paddingHorizontal: boxes.paddingMedium,
  },
});

export default styles;
