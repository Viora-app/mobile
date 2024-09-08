import {boxes} from '../../config/stylesGuides';

const styles = () => ({
  wrapper: {
    width: boxes.avatarSize,
    height: boxes.avatarSize,
    borderRadius: boxes.radiusExtreme,
    overflow: 'hidden',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },
  editIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    bottom: 5,
    borderRadius: boxes.radiusMedium,
    overflow: 'hidden',
  },
});

export default styles;
