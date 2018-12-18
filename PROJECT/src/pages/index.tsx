import PC from './pc/_layout';
import Mobile from './mobile/index';

export default function() {
  if (/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
    return <Mobile />;
  } else {
    return <PC />;
  }
}
