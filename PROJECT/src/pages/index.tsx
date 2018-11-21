export default function () {
    window.location.pathname = /Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent) ? "/mobile" : "/pc";
}