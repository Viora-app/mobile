import {Themes} from '../../context/presetsContext/types';
import {boxes, fonts, colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  screenContainer: {
    height: '100%',
    width: '100%',
  },
  unclaimedBadge: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pageTitle: {
    ...fonts.h2,
    paddingTop: boxes.paddingMedium,
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
  },
  profileScreen: {
    backgroundColor: colors[theme].secondaryStrong,
  },
  sectionHeader: {
    paddingHorizontal: boxes.paddingMedium,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: boxes.paddingMedium,
    marginBottom: boxes.paddingSmall,
  },
  label: {
    paddingTop: boxes.paddingSmall,
    color: colors[theme].neutralMild,
  },
  name: {
    fontFamily: fonts.body,
  },
  username: {
    width: 230,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default styles;
