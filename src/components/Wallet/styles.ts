import {Themes} from '../../context/presetsContext/types';
import {boxes, colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    width: '100%',
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
    alignItems: 'center',
    marginTop: boxes.paddingMedium,
  },
  info: {
    flex: 1,
    width: '100%',
    backgroundColor: colors[theme].neutralZero,
    borderRadius: boxes.radiusLarge,
  },
  copied: {
    position: 'absolute',
    top: boxes.paddingMedium - 1,
    right: boxes.paddingMedium,
    color: colors[theme].primaryStrong,
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  label: {
    color: colors[theme].neutralMild,
    paddingBottom: boxes.paddingSmall,
    textAlign: 'center',
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: boxes.paddingMedium,
    paddingBottom: boxes.paddingExtreme,
  },
  address: {
    color: colors[theme].primaryStrong,
    letterSpacing: 1,
    textAlign: 'center',
  },
  balanceContainer: {
    marginTop: boxes.paddingExtreme,
    paddingBottom: boxes.paddingSmall,
  },
  balance: {
    color: colors[theme].primaryStrong,
    textAlign: 'center',
  },
});

export default styles;
