import PC from './pc/_layout';
import Mobile from './mobile/index';
import router from 'umi/router';
export default function() {
  if (/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
    router.push('/mobile');
    return <Mobile />;
  } else {
    router.push('/pc');
    return <PC />;
  }
}
