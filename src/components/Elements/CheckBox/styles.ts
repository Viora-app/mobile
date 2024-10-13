import {Themes} from '../../../context/presetsContext/types';
import {boxes, colors} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  container: {
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  rowNoWrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    height: 40,
    lineHeight: 40,
    color: colors[theme].neutralMighty,
  },
  box: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: boxes.radiusSmall,
    borderColor: colors[theme].neutralTender,
    borderWidth: 8,
  },
  selected: {
    backgroundColor: colors[theme].reassureStrong,
    borderColor: colors[theme].reassureStrong,
  },
});

export default styles;
