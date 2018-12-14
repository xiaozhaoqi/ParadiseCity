import router from 'umi/router';
export default function() {
  if(/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(
    navigator.userAgent
  )){
    router.push('/mobile');
  }else{
    router.push('/pc');
  }
}
