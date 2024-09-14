import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  spacerMini: {
    marginBottom: boxes.paddingSmall,
  },
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  tender: {
    color: colors[theme].neutralTender,
  },
  strong: {
    color: colors[theme].neutralStrong,
  },
  mild: {
    color: colors[theme].neutralMild,
  },
  reassureMild: {
    color: colors[theme].reassureMild,
  },
  reassureStrong: {
    color: colors[theme].reassureStrong,
  },
  zero: {
    color: colors[theme].neutralZero,
  },
  small: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.small,
  },
  base: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.base,
    color: colors[theme].primaryStrong,
  },
  medium: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h4,
    color: colors[theme].primaryStrong,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  semi: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h3,
    color: colors[theme].primaryStrong,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  large: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h2,
    color: colors[theme].primaryStrong,
  },
  largest: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h1,
    color: colors[theme].primaryStrong,
  },
  contributions: {
    width: '100%',
    padding: boxes.paddingSemi,
  },
  link: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  contributionsThumbnail: {
    width: 60,
    height: 60,
    borderRadius: boxes.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contributionsInfo: {
    paddingLeft: boxes.paddingSmall,
    paddingVertical: 3,
    flex: 1,
  },
});

export default styles;
