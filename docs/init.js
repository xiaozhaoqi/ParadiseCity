!(function (e) {
  'use strict'
  var a,
    u,
    f = SFAPI,
    g = SFLOG,
    l = 'business:init',
    d = SFConfig,
    h = SFCommon
  function initSDK (s, e) {
    var i = PORTAL_MAP,
      o = !SFCommon.isWeb(),
      r = !1,
      c = s.onStartAuth || function () {}
    function initECAgentAndStartAuth () {
      var t = (function checkAndInitECAgent () {
          return (
            g.info(l, 'start init ecagent'),
            new Promise(function (r, c) {
              g.debug(l, 'checkECAgent() enter'),
                is.WebClient
                  ? f.checkECAgent({
                      success: function () {
                        initECAgent(r, c)
                      },
                      error: function () {
                        var e = SF.setting.getGlobal(
                          KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA,
                          null
                        )
                        if (null !== e) {
                          var n = is.System().isMobile,
                            t = 1 !== e.unforceInstallClient && !n,
                            i = e.enableSecurityCheck && !n && !is.Linux
                          ;(!t && !i) || h.isFreeMode()
                            ? r()
                            : s.onMustInstallClient(
                                'config forceInstall or enableSecurityCheck when check ecagent failed'
                              )
                        } else {
                          var o = h.formatString(
                            'get getGlobal KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA fail'
                          )
                          c(o)
                        }
                      }
                    })
                  : ((d.isExistEC = !0), initECAgent(r, c))
            })
          )
        })(),
        i = (function initStartAuthDelay () {
          return new Promise(function (e, n) {
            setTimeout(function () {
              e()
            }, 1e3)
          })
        })()
      return (
        new Promise(function (e, n) {
          Promise.race([t, i])
            .then(setInitLang)
            .then(function () {
              g.debug(l, 'init first auth or ecagent OK'),
                is.WebClient && initStartAuth(),
                e()
            })
            ['catch'](function (e) {
              n(e)
            })
        }),
        t
      )
    }
    function setInitLang () {
      return (
        g.info(l, 'start set language'),
        new Promise(function (e, n) {
          f.setLang({
            lang: s.lang,
            success: function () {
              g.debug(l, 'set init lang success'), e()
            },
            error: function () {
              g.info(l, 'set init lang error'), e()
            }
          })
        })
      )
    }
    function initStartAuth () {
      !(function commonAuth () {
        g.info(l, 'start auth')
        var e,
          n,
          t = SF.vpnInfo.createInstance()
        if (
          ((n = t.getFirstAuth()),
          g.debug(l, 'startAuth() enter'),
          (e = (function getFirstAuth () {
            var e = SF.setting.getGlobal(
              KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA,
              null
            ).startAuth
            g.assert(void 0 !== e, 'server auth type is undefined')
            var n = i[e]
            return (
              is.Win() ||
                n !== PORTAL_MAP['auth/_key'] ||
                (n = PORTAL_MAP['auth/logincert']),
              n
            )
          })()),
          g.info('wechat:qrcode', 'get firstAuth:authType ' + n + ':' + e),
          r && is.Win())
        )
          return (e = i['auth/psw']), void c(e, !0)
        if (n && 'auth/wechat' === n) return (e = i[n]), void c(e, !0)
        o && n && i[n] && (e = i[n])
        c(e, !1)
      })()
    }
    function initECAgent (e, t) {
      f.initECAgent({
        success: function () {
          e()
        },
        error: function (e) {
          var n
          e.code === ERROR_INIT_ECAGENT_FAILED
            ? s.onMustInstallClient('init ecagent failed,need install client')
            : ((n = h.formatString(
                'init ecagent failed, code:{0}, msg:{1}',
                e.code,
                e.msg
              )),
              t(n))
        }
      })
    }
    function checkRelogin () {
      return (
        g.info(l, 'start check relogin'),
        new Promise(function (t, i) {
          var o = s.onReLogin,
            r = s.onOtherLogin
          g.debug(l, 'checkReLogin() enter'),
            f.checkReLogin({
              success: function (e) {
                var n = e.code
                1 === n
                  ? (g.info(l, ' current user login '), o && o())
                  : 2 === n || 3 === n || 4 === n
                  ? (g.info(l, ' other user login '), r && r())
                  : 0 === n
                  ? (g.debug(l, ' no user login '), t())
                  : (g.error(
                      l,
                      ' check relogin error ',
                      ' unknown status ,status is %',
                      n
                    ),
                    i('check reloin error , unknown status:' + n))
              },
              error: function (e) {
                var n = h.formatString(
                  'api init fail, code:{0}, msg:{1}',
                  e.code,
                  e.msg
                )
                i(n)
              }
            })
        })
      )
    }
    function checkProxy () {
      return (
        g.info(l, 'start check proxy'),
        new Promise(function (t, e) {
          f.checkProxy({
            success: function (e) {
              var n = is.fn(s.onErrorTip) ? s.onErrorTip : function () {}
              0 !== e.code
                ? (g.info(l, 'check proxy success.  No proxy. '), (u = !1), t())
                : (is.fn(s.onExistProxy) && s.onExistProxy(),
                  (u = !0),
                  a ? n(ERROR_EC_BOTH_MIDATTACK_AND_PROXY, t) : t())
            },
            error: function (e) {
              g.error(l, 'check proxy fail', 'error code is ' + e.code),
                s.onProxyError(e)
            }
          })
        })
      )
    }
    function testProxy () {
      return new Promise(function (n, e) {
        u
          ? (g.info(l, 'check proxy success.  Have proxy. '),
            f.testProxy({
              success: function (e) {
                g.info(l, 'test proxy success!'), n()
              },
              error: function (e) {
                g.error(l, 'test proxy fail', 'error code is ' + e.code),
                  s.onProxyError(e)
              }
            }))
          : n()
      })
    }
    function checkMidAttack () {
      return new Promise(function (n, t) {
        var i = is.fn(s.onErrorTip) ? s.onErrorTip : function () {}
        a
          ? (g.info(l, 'check midattack enabled'),
            is.Win() &&
              SFFilter.setFilterCallBack('checkMidAttack', function () {
                h.isFreeMode() ? n() : SFCommon.installClient()
              }),
            f.checkMidAttack({
              success: function (e) {
                g.info(l, 'check midattack success, data.code:' + e.code),
                  1 === e.code ? i(ERROR_EC_MIDATTACK, n) : n()
              },
              error: function () {
                var e = h.formatString('check middle attack failed')
                t(e)
              }
            }))
          : n()
      })
    }
    function checkIsUpdate () {
      return new Promise(function (n, e) {
        if (!d.isExistEC || !is.Win())
          return g.debug(l, 'EC not need check update in login page '), void n()
        f.checkIsUpdate({
          success: function (e) {
            e.code !== d.IS_UPDATE.NOT_UPDATE
              ? (g.debug(
                  l,
                  'currnet version need update,version data:',
                  JSON.stringify(e)
                ),
                is.fn(s.onUpdating) && s.onUpdating(e, n))
              : (g.debug(l, 'currnet version do not update'), n())
          },
          error: function (e) {
            g.info(
              l,
              'detect whether update failed, may be is not inistall, error code:%d',
              e.code
            ),
              e.code === ERROR_EC_NETWORK
                ? is.fn(s.onErrorTip) && s.onErrorTip(ERROR_EC_NETWORK)
                : s.onMustInstallClient('check update status failed')
          }
        })
      })
    }
    function checkUpdate () {
      return (
        g.info(l, 'start check update'),
        new Promise(function (n, e) {
          if (!is.WebClient && !is.WinClient)
            return (
              g.debug(l, 'EC not need check update in login page '), void n()
            )
          f.checkUpdate({
            preventOnError: !0,
            conCount: 5,
            success: function (e) {
              g.debug(l, 'checkUpdate success'), s.onCompleteUpdate(n)
            },
            error: function (e) {
              g.info(
                l,
                'check update error, may be is not inistall, error code:%d',
                e.code
              ),
                s.onMustInstallClient('query update status failed', {
                  process: 'update'
                })
            }
          })
        })
      )
    }
    function getMacAddress () {
      return (
        g.info(l, 'start get MacAddress'),
        new Promise(function (i, n) {
          SFConfig.isExistEC
            ? f.getHid({
                success: function (e) {
                  g.debug(l, 'get MacAddress success')
                  var n =
                      'undefined' == typeof e.data.macAddress
                        ? ''
                        : e.data.macAddress,
                    t =
                      'undefined' == typeof e.data.hostName
                        ? ''
                        : e.data.hostName
                  SFCommon.setCookie('SSL_REMOTE_MAC', n),
                    SFCommon.setCookie('SSL_REMOTE_HOST', t),
                    i()
                },
                error: function (e) {
                  g.info(l, 'get MacAddress error'), n()
                }
              })
            : (g.debug(l, 'get MacAddress failed, ECAgent not Exist'), i())
        })
      )
    }
    function checkSecurity () {
      return (
        g.info(l, 'start check security'),
        new Promise(function (n, e) {
          var t,
            i,
            o = SF.setting.getGlobal(KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA, null)
          if (
            (g.assert(null !== o), !o.enableSecurityCheck || is.Mac || is.Linux)
          )
            return g.info(l, 'enableSecurityCheck is false'), void n()
          ;(t = s.onCheckSecurityDeny || function () {}),
            (i = s.onCheckSecurityPass || function () {}),
            (function _checkSecurity () {
              f.checkSecurity({
                type: 'before',
                success: function (e) {
                  alert(11111)
                  i()
                  // h.checkObjAttrExits(e, 'data.strategies') &&
                  // !is.empty(e.data.strategies)
                  //   ? (g.info(l, 'check security failed before login'),
                  //     t(e.data.strategies, n))
                  //   : (g.info(l, 'check security success before login'),
                  //     i(),
                  //     n())
                },
                error: function () {
                  SFLOG.info(
                    l,
                    'check Security error',
                    'context or IP restrict'
                  )
                }
              })
            })()
        })
      )
    }
    function initDomainEnv () {
      return (
        g.info(l, 'init domain env'),
        new Promise(function (n, t) {
          SF.setting.getGlobal(KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA, null)
            .domainSSOEnable &&
          o &&
          is.Win()
            ? f.checkDomain({
                success: function (e) {
                  ;(r = 1 === e.data.inDomain), n()
                },
                error: function (e) {
                  var n = h.formatString(
                    'api init fail, code:{0}, msg:{1}',
                    e.code,
                    e.msg
                  )
                  t(n)
                }
              })
            : n()
        })
      )
    }
    is.fn(s.onMustInstallClient) && (h.installClient = s.onMustInstallClient),
      (function main () {
        ;(function init () {
          return new Promise(function (e, n) {
            ;(function initBase () {
              return new Promise(function (n, t) {
                var e,
                  i,
                  o,
                  r = s.url
                ;(i = window.name || ''),
                  (o = i.substr(0, 10)),
                  SFLOG.debug(l, 'init() enter'),
                  'sf_ssl_ms_' === o &&
                    ((e = decodeURIComponent(i.substr(10))),
                    (window.name = '')),
                  f.init({
                    url: r,
                    from: e,
                    success: function () {
                      f.getInitConfig({
                        preventOnError: s.preventOnError,
                        success: function (e) {
                          g.assert(
                            'undefined' != typeof e.data,
                            'getInitConfig api error, result.data is not object, is undefined'
                          ),
                            (a = 1 === e.data.enableMidAtkCheck),
                            is.fn(s.onGetInitConfig) &&
                              s.onGetInitConfig(e.data),
                            n()
                        },
                        error: function (e) {
                          t(e.msg)
                        }
                      })
                    },
                    error: function (e) {
                      var n = h.formatString('init failed,exist error params')
                      t(n)
                    }
                  })
              })
            })()
              .then(function () {
                is.WebClient || initStartAuth()
              })
              .then(initECAgentAndStartAuth)
              .then(checkRelogin)
              .then(initDomainEnv)
              .then(checkProxy)
              .then(testProxy)
              .then(checkMidAttack)
              .then(checkIsUpdate)
              .then(checkUpdate)
              .then(getMacAddress)
              .then(checkSecurity)
              .then(function () {
                e()
              })
              ['catch'](function (e) {
                n(e)
              })
          })
        })()
          .then(function () {
            s.success && s.success()
          })
          ['catch'](function (e) {
            e &&
              (e.stack
                ? g.error(l, 'init on error', 'data:%s %s', e.message, e.stack)
                : g.error(
                    l,
                    'init on error',
                    'data:%s',
                    (is.object(e) && e.msg) || e
                  ),
              s.error && s.error(e))
          })
      })()
  }
  function getManifest (t, i) {
    g.debug(l, 'getManifest() enter'),
      SFRequest.createRequest({
        type: 'Server',
        path: './theme/manifest.json?_r=' + Math.random(),
        success: function (e) {
          var n
          e
            ? ((n = JSON.parse(e)), t.success(n))
            : (t.error(),
              g.error(
                l,
                'request success. but data is empty ',
                'manifest file is empty!'
              )),
            i()
        },
        error: function () {
          g.error(l, 'request error', 'Get manifest error!'), t.error(), i()
        }
      })
  }
  function getLanguageFile (e, n) {
    var t,
      i = e.lang
    ;(t = SFConfig.LANGUAGE_LIST[i]),
      is.empty(t)
        ? ((window.LANG = {}), e.success())
        : require([
            '/portal/i18n/' + t + '?cache=' + new Date().getTime()
          ], function () {
            e.success()
          })
  }
  function getLang (n, t) {
    var i,
      o = h.getResult(1)
    if (((i = h.checkLang(window.language)), is.WebClient)) {
      var e = SF.setting.getGlobal(KEY_GLOBAL_LANG, '')
      if (d.LANGUAGE_LIST.hasOwnProperty(e))
        return (
          g.info(l, 'get lang from local cache,lang:' + e),
          (o.data = e),
          void n.success(o)
        )
      if (((e = h.getCookie('language')), d.LANGUAGE_LIST.hasOwnProperty(e)))
        return (
          g.info(l, 'get lang from cookie,lang:' + e),
          (o.data = e),
          void n.success(o)
        )
      g.info(l, 'get lang from default,lang:' + i),
        (o.data = i),
        n.success(o),
        t()
    } else
      SF.ecConfig.read(SF.ecConfig.key.LANG, '', function (e) {
        if (d.LANGUAGE_LIST.hasOwnProperty(e))
          return (
            g.info(l, 'get lang from container,lang:' + e),
            (o.data = e),
            void n.success(o)
          )
        g.info(l, 'get lang from default,lang:' + i),
          (o.data = i),
          n.success(o),
          t()
      })
  }
  function setLangToEC (n, t) {
    f.setLang({
      lang: n.lang,
      success: function () {
        g.info(l, 'set lang ot ecagent is success'), n.success(), t()
      },
      error: function (e) {
        g.info(
          l,
          'set lang to ecagent is fail, error message is ' + JSON.stringify(e)
        ),
          n.error(),
          t()
      }
    })
  }
  function setLang (e, n) {
    is.WebClient
      ? (h.setCookie('language', e.lang),
        SF.setting.setGlobal({ key: KEY_GLOBAL_LANG, value: e.lang }, 1),
        d.isExistEC && e.switchLang && setLangToEC(e, n))
      : (h.setCookie('language', e.lang),
        SF.setting.setGlobal({ key: KEY_GLOBAL_LANG, value: e.lang }, 1),
        SF.ecConfig.write(
          { key: SF.ecConfig.key.LANG, value: e.lang },
          function () {
            is.fn(e.onSetedECLang) &&
              (g.info(
                l,
                'set language to container success,language : ' + e.lang
              ),
              e.onSetedECLang())
          }
        ),
        setLangToEC(e, n))
  }
  ;(e.init = {}),
    (e.init.initSDK = function (e, n) {
      new SFCommon.BaseAPI(e, n, initSDK).invoke()
    }),
    (e.init.getManifest = function (e, n) {
      new SFCommon.BaseAPI(e, n, getManifest).invoke()
    }),
    (e.init.getLanguageFile = function (e, n) {
      new SFCommon.BaseAPI(e, n, getLanguageFile).invoke()
    }),
    (e.init.getLang = function (e, n) {
      new SFCommon.BaseAPI(e, n, getLang).invoke()
    }),
    (e.init.setLang = function (e, n) {
      new SFCommon.BaseAPI(e, n, setLang).invoke()
    })
})(SF)
