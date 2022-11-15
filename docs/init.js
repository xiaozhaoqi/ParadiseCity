!(function (a) {
  'use strict'
  var i = SFCommon,
    u = SFConfig,
    E = SFLOG,
    d = 'api:init',
    n = 500,
    g = SFDTO,
    l = SF.ecConfig
  function queryResult (n, r) {
    var o,
      e = i.getECCommand('Q_UPDATE'),
      c = u.UPDATE_STATE
    ;(r = r || function () {}),
      SFRequest.createRequest({
        type: 'ECAgent',
        path: 'DoQueryService',
        method: 'get',
        data: [e],
        conCount: n.conCount,
        compat: !0,
        preventOnError: n.preventOnError,
        success: function (e) {
          var t = parseInt(e.result, 10)
          switch (
            ((o = i.handleData(e)),
            n.count++,
            n.count > n.queryMax && (n.error(o), r()),
            t)
          ) {
            case c.INPROCESS:
              queryResultLater(n), r()
              break
            case c.GETCONFFAILD:
            case c.UPDATE_REQTIMOUT:
            case c.SETUPSUCESS:
            case c.ISUPTODATE:
              ;(o.code = c.SETUPSUCESS), n.success(o), r()
              break
            default:
              E.info(d, 'ECAgent: check update failed,status is ' + t),
                n.error(o),
                r()
          }
        },
        error: function (e) {
          E.info(d, 'request querying status api for updating failed'),
            n.isReDetectEC
              ? (function handleECRestart (t, e) {
                  E.info(
                    d,
                    'update failed, maybe ecagent switch local port, atemp to re-detect ecagent '
                  ),
                    a.checkECAgent({
                      success: function () {
                        var e = SF.setting.getGlobal(
                          KEY_GLOBAL_EC_PORT,
                          u.DEFAULT_PORT
                        )
                        E.info(
                          d,
                          're-detect ecagent success,current port:' +
                            e +
                            ',continue querying update status'
                        ),
                          (t.count = 0),
                          queryResultLater(t)
                      },
                      error: function () {
                        E.info(d, 're-detect ecagent failed '), t.error(e)
                      }
                    })
                })(n, e)
              : n.error(e),
            r()
        }
      })
  }
  function queryResultLater (e, t) {
    setTimeout(function () {
      queryResult(e, t)
    }, n)
  }
  ;(a.init = function init (e, t) {
    new SFCommon.BaseAPI(e, t, function excuting (e, t) {
      var n,
        r = i.getResult(),
        o = SF.vpnInfo.createInstance()
      ;(e.url = e.url || location.href),
        (n = i.URLParse(e.url))
          ? ((r.code = u.SUCCESS_CODE),
            SF.setting.setGlobal(
              [
                { key: KEY_GLOBAL_VPN_PORT, value: n.port },
                { key: KEY_GLOBAL_VPN_URL, value: n.origin },
                { key: KEY_GLOBAL_VPN_IP, value: n.hostname },
                { key: KEY_GLOBAL_VPN_PROTOCOL, value: n.protocol }
              ],
              0
            ),
            (function handleFromURL () {
              e.from
                ? SF.setting.setGlobal(
                    { key: KEY_GLOBAL_FROM_URL, value: e.from },
                    0
                  )
                : i.isWeb()
                ? SF.setting.setGlobal(
                    { key: KEY_GLOBAL_FROM_URL, value: n.origin },
                    0
                  )
                : SF.setting.setGlobal(
                    { key: KEY_GLOBAL_FROM_URL, value: o.getLastVPNURL() },
                    0
                  ),
                e.success(r)
            })())
          : ((r.code = ERROR_ADDR_INVALID), e.error(r))
    }).invoke()
  }),
    (a.initECAgent = function initECAgent (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (n, r) {
          var e,
            t,
            o = SF.setting.getGlobal(KEY_GLOBAL_VPN_IP, ''),
            c = SF.setting.getGlobal(KEY_GLOBAL_VPN_PORT, 0),
            a = [o + ' ' + c]
          o ||
            ((t = n.url || location.href),
            (e = i.URLParse(t)),
            (a = [e.hostname + ' ' + e.port])),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'InitEcAgent',
              data: a,
              method: 'get',
              compat: !0,
              success: function (e) {
                var t = i.handleData(e)
                1 === t.code
                  ? n.success(t)
                  : ((t.code =
                      -1 === t.code || -2 === t.code
                        ? ERROR_INIT_ECAGENT_FAILED
                        : t.code),
                    n.error(t)),
                  r()
              },
              error: function (e) {
                n.error(e), r()
              }
            })
        },
        'initECAgent'
      ).invoke()
    }),
    (a.checkReLogin = function checkReLogin (e, t) {
      new i.BaseAPI(
        e,
        t,
        function excuting (n, r) {
          var e = SF.setting.getGlobal(KEY_GLOBAL_TWFID, '')
          SFAPI.getEncryptKey({
            preventOnError: n.preventOnError,
            success: function () {
              !(function createRequest (e) {
                SFRequest.createRequest({
                  type: 'ECAgent',
                  path: 'CheckReLogin',
                  data: [e],
                  method: 'get',
                  compat: !0,
                  preventOnError: n.preventOnError,
                  success: function (e) {
                    var t = i.handleData(e)
                    ;-1 === t.code
                      ? (t.code = 1)
                      : 0 === t.code
                      ? (t.code = 2)
                      : 3 === t.code
                      ? (t.code = 3)
                      : 4 === t.code
                      ? (t.code = 4)
                      : (t.code = 0),
                      SF.setting.setGlobal(
                        { key: KEY_GLOBAL_RELOGIN_STATUS, value: t.code },
                        !1
                      ),
                      n.success(t),
                      r()
                  },
                  error: function (e) {
                    n.error(e), r()
                  }
                })
              })(i.encryptID({ id: e }, 0))
            },
            error: function (e) {
              E.error(d, ' get encrypt key error ', ' error is  %s', e.msg),
                n.error(e)
            }
          })
        },
        'checkReLogin'
      ).invoke()
    }),
    (a.setLang = function setLang (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (t, e) {
          var n,
            r = t.lang || 'zh_CN'
          ;(n = i.getECCommand('S_LANG', { lang: r })),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'DoConfigure',
              data: [n],
              compat: !0,
              success: function (e) {
                '1' === e.result
                  ? (E.debug(d, 'set lang success'), t.success())
                  : (E.debug(d, 'set lang error'), t.error())
              },
              error: function () {
                E.debug(d, 'set lang error'), t.error()
              }
            })
        },
        'setLang'
      ).invoke()
    }),
    (a.getLang = function getLang (e, t) {
      function getEnvLang (e, t) {
        var n = String(
          window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage
        ).toLowerCase()
        E.debug(d, 'get lang from env '),
          (e.lang = n),
          SF.setting.setGlobal({ key: KEY_GLOBAL_LANG, value: n }, 1),
          t(e)
      }
      new SFCommon.BaseAPI(e, t, function excuting (t, n) {
        var e = i.getECCommand('Q_LANG'),
          r = i.getResult(1)
        SFRequest.createRequest({
          type: 'ECAgent',
          path: 'DoQueryService',
          data: [e],
          success: function (e) {
            e.result
              ? (E.debug(d, 'get lang from ECAgent'),
                (r.data.lang = e.data),
                t.success(r),
                n())
              : getEnvLang(r, t.success)
          },
          error: function () {
            getEnvLang(r, t.success)
          }
        })
      }).invoke()
    }),
    (a.checkECAgent = function checkECAgent (e, t) {
      new SFCommon.BaseAPI(e, t, function excuting (n, e) {
        var r,
          o,
          c = !1,
          t = is.System().isMobile,
          a = 0,
          s = {
            ALL_START_TIME: 500,
            ALL_FOREACH_TIMEOUT: 1e3,
            ALL_TIMEOUT: 1e3
          }
        function checkECAgentByHttp () {
          var t = i.getResult(ERROR_CHECK_ENV_FAILED)
          r = setTimeout(function () {
            var e = u.USEABLE_PORTS
            E.debug(
              d,
              'detect EC ,enter timer time span :' +
                new Date().getTime() +
                ',times:' +
                a
            ),
              (o = setTimeout(function () {
                c ||
                  (E.info(d, 'EcAgent request Failed On All Port!'),
                  (u.isExistEC = !1),
                  n.error(t))
              }, s.ALL_TIMEOUT)),
              E.info(d, 'EcAgent request Failed on last port: timeout!'),
              e.forEach(function (e) {
                E.info(d, 'this request port is ' + e),
                  checkECRequest(e, s.ALL_FOREACH_TIMEOUT)
              })
          }, s.ALL_START_TIME)
        }
        function checkECRequest (t, e) {
          a++,
            E.debug(
              d,
              'detect EC ,request time span :' +
                new Date().getTime() +
                ',times:' +
                a
            ),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'DetectECAgent',
              compat: !0,
              port: t,
              timeout: e,
              conCount: -1,
              preventOnError: !0,
              resultFilter: function (e) {
                return !!e.hasOwnProperty('result')
              },
              success: function (e) {
                r && clearTimeout(r),
                  o && clearTimeout(o),
                  c ||
                    ((u.isExistEC = !0),
                    (c = !0),
                    (u.cache.ecPort = t),
                    SF.setting.setGlobal(
                      { key: KEY_GLOBAL_EC_PORT, value: t },
                      1
                    ),
                    E.info(d, 'Ecagent connect OK. port is' + u.cache.ecPort),
                    n.success(e))
              },
              error: function () {
                E.info(d, 'request error on port:' + t)
              }
            })
        }
        n.longTimeout &&
          (s = {
            ALL_START_TIME: 1e3,
            ALL_FOREACH_TIMEOUT: 3e4,
            ALL_TIMEOUT: 4e4
          }),
          t || (is.Linux && i.isWeb()) || i.isFreeMode()
            ? (E.debug(d, 'Mobile is not support Ecagent'), n.error())
            : i.isWeb() || n.ifOnlyHttp
            ? (checkECRequest(u.DEFAULT_PORT, s.ALL_START_TIME + s.ALL_TIMEOUT),
              checkECAgentByHttp())
            : l.read(l.key.EC_PORT, '', function (e) {
                ;(e = parseInt(e, 10)),
                  (u.isExistEC = !0),
                  is.numeric(e) || 0 === e
                    ? (SF.setting.setGlobal(
                        { key: KEY_GLOBAL_EC_PORT, value: e },
                        1
                      ),
                      E.info(d, 'Ecagent connect OK by container. port is' + e),
                      n.success())
                    : (checkECRequest(
                        u.DEFAULT_PORT,
                        s.ALL_START_TIME + s.ALL_TIMEOUT
                      ),
                      checkECAgentByHttp())
              })
      }).invoke()
    }),
    (a.checkMidAttack = function checkMidAttack (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (n, r) {
          SFRequest.createRequest({
            type: 'ECAgent',
            path: 'CheckMITMAttack',
            method: 'get',
            compat: !0,
            success: function (e) {
              var t = i.handleData(e)
              n.success(t), r()
            },
            error: function (e) {
              n.error(e), r()
            }
          })
        },
        'checkMidAttack'
      ).invoke()
    }),
    (a.selectLines = function selectLines (e, t) {
      new SFCommon.BaseAPI(e, t, function excuting (n, r) {
        var e
        n.url || E.warn(d, 'param error', 'url is empty on selecting lines'),
          (e = [n.url]),
          SFRequest.createRequest({
            type: 'ECAgent',
            path: 'SelectLines',
            data: e,
            conCount: n.conCount || -1,
            timeout: n.timeout || 3e4,
            method: 'get',
            success: function (e) {
              var t = i.handleData(e)
              1 === t.code ? n.success(t) : n.error(t), r()
            },
            error: function (e) {
              n.error(e), r()
            }
          })
      }).invoke()
    }),
    (a.getInitConfig = function getInitConfig (e, t) {
      var n = new i.BaseAPI(e, t, function excuting (a, s) {
          var e = a.isRefreshLogin,
            t = '/por/login_auth.csp'
          e && (t += '?newauth=1'),
            SFRequest.createRequest({
              type: 'Server',
              path: t,
              method: 'get',
              preventOnError: a.preventOnError,
              success: function (e) {
                var t,
                  n = e || {},
                  r = xmlToJSON.parseString(n),
                  o = r.Auth || r,
                  c = {}
                ;(c.code = parseInt(o.ErrorCode, 10)),
                  (t = g.getInitConfigDTO(o)),
                  (c.data = t || {}),
                  SF.setting.setGlobal(
                    {
                      key: KEY_GLOBAL_CLIENT_RUN_MODE,
                      value: c.data.clientRunMode
                    },
                    !1
                  ),
                  SF.setting.setGlobal(
                    {
                      key: KEY_GLOBAL_ENCRYPT_EXP,
                      value: c.data.rsaEncryptExp
                    },
                    !1
                  ),
                  SF.setting.setGlobal(
                    {
                      key: KEY_GLOBAL_ENCRYPT_KEY,
                      value: c.data.rsaEncrtptKey
                    },
                    !1
                  ),
                  SF.setting.setGlobal(
                    {
                      key: KEY_GLOBAL_CSRF_RAND_CODE,
                      value: c.data.csrfRandCode
                    },
                    !1
                  ),
                  u.setGUID(c.data.multClientguid),
                  u.setTWFID(c.data.twfID),
                  1 === c.code
                    ? (SF.setting.setGlobal({
                        key: KEY_GLOBAL_INIT_GET_INIT_CONFIG_DATA,
                        value: c.data
                      }),
                      a.success(c))
                    : a.error(c),
                  s()
              },
              error: function (e) {
                a.error(e), s()
              }
            })
        }),
        u = SF.session.createInstance()
      n.invoke()
    }),
    (a.checkUpdate = function checkUpdate (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (t, n) {
          var e, r
          ;(t.count = 0),
            (t.queryMax = t.queryMax || 360),
            (t.preventOnError =
              !!is.bool(t.preventOnError) && t.preventOnError),
            (t.isReDetectEC = !is.bool(t.isReDetectEC) || t.isReDetectEC),
            (e = ['BEFORELOGIN']),
            u.container && is.Win() && (e[1] = 'ECLOGIN'),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'UpdateControls',
              data: e,
              conCount: t.conCount,
              preventOnError: t.preventOnError,
              method: 'get',
              compat: !0,
              success: function (e) {
                '1' === e.result
                  ? queryResultLater(t, n)
                  : (E.error(
                      d,
                      'request update command failed',
                      'data:' + JSON.stringify(e)
                    ),
                    (r = i.handleData(e)),
                    t.error(r),
                    n())
              },
              error: function (e) {
                E.error(
                  d,
                  'check update failed',
                  'send command(UpdateControls) failed'
                ),
                  t.error(e),
                  n()
              }
            })
        },
        'checkUpdate'
      ).invoke()
    }),
    (a.checkIsUpdate = function checkIsUpdate (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (t, n) {
          var r,
            e = i.getECCommand('Q_ISUPDATE')
          u.UPDATE_STATE,
            (n = n || new Function()),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'DoQueryService',
              method: 'get',
              data: [e],
              compat: !0,
              success: function (e) {
                if (
                  (parseInt(e.result, 10),
                  (r = i.handleData(e)).code === ERROR_EC_NETWORK)
                )
                  return (
                    E.error(
                      d,
                      ' detect whether update failed ',
                      'ecagent request server error,code:' + ERROR_EC_NETWORK
                    ),
                    void t.error(r)
                  )
                is.object(r.data) && i.checkObjAttrExits(r.data, 'local')
                  ? ((r.data.local = r.data.local ? r.data.local : ''),
                    (r.data.remote = r.data.remote ? r.data.remote : ''),
                    (r.code = i.checkVersion(r.data)),
                    E.info(d, 'check version state' + r.code))
                  : ((r.data = {}),
                    (r.code = u.IS_UPDATE.NEED_UPDATE),
                    E.info(d, 'current version is old , need update' + r.code)),
                  t.success(r)
              },
              error: function (e) {
                e.code !== ERROR_SERVER_DATA_FORMAT_INVALID
                  ? (t.error(e), n())
                  : (E.info(d, 'get error format data from checkIsUpdate'),
                    (e.code = u.IS_UPDATE.NEED_UPDATE),
                    (e.data = { local: '', remote: '' }),
                    (e.msg = ''),
                    t.success(e))
              }
            })
        },
        'checkIsUpdate'
      ).invoke()
    }),
    (a.checkSecurity = function checkSecurity (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (n, r) {
          var e,
            t = 'after' === n.type ? 'Q_AFTER_SEC' : 'Q_BEFORE_SEC'
          ;(e = i.getECCommand(t)),
            SFRequest.createRequest({
              type: 'ECAgent',
              path: 'DoQueryService',
              data: [e],
              method: 'get',
              success: function (e) {
                alert(2222)
                n.success(t)
                // var t = i.handleData(e)
                // 1 === t.code ? n.success(t) : n.error(t), r()
              },
              error: function (e) {
                E.error(d, 'check security error,', e.msg), n.error(e), r()
              }
            })
        },
        'checkSecurity'
      ).invoke()
    }),
    (a.checkProxy = function checkProxy (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (r, o) {
          SFRequest.createRequest({
            type: 'ECAgent',
            path: 'CheckProxySetting',
            method: 'get',
            compat: !0,
            success: function (e) {
              var t = i.handleData(e),
                n = [
                  null,
                  ERROR_EC_TPS_AGRUMENTS_ERR,
                  ERROR_EC_IEOPTION_USE_AUTO_DETECT,
                  ERROR_EC_IEOPTION_USE_AUTO_CONFIG,
                  ERROR_EC_IEOPTION_NO_SPECIFY_PROXY,
                  ERROR_EC_IEOPTION_IN_PASSBY,
                  ERROR_EC_IEOPTION_DIFFERENT_PROXY
                ]
              ;(t.code = parseInt(t.code, 10)),
                0 < t.code && t.code === [null, 1, 2, 3, 4, 5, 6][t.code]
                  ? r.error({ code: n[t.code] || 0, data: t.data })
                  : (-1 !== t.code &&
                      0 !== t.code &&
                      E.debug(
                        d,
                        'params error',
                        'code not -1(no proxy) and not 0(have proxy),result:' +
                          t.code
                      ),
                    (t.code = 0 === t.code ? 0 : 1),
                    r.success(t),
                    o())
            },
            error: function (e) {
              r.error(e), o()
            }
          })
        },
        'checkProxy'
      ).invoke()
    }),
    (a.testProxy = function testProxy (e, t) {
      new SFCommon.BaseAPI(
        e,
        t,
        function excuting (n, r) {
          SFRequest.createRequest({
            type: 'ECAgent',
            path: 'TestProxyServer',
            method: 'get',
            compat: !0,
            success: function (e) {
              var t = i.handleData(e)
              1 === t.code
                ? n.success(t)
                : n.error({ code: t.code, data: t.data }),
                r()
            },
            error: function (e) {
              n.error(e), r()
            }
          })
        },
        'testProxy'
      ).invoke()
    }),
    (a.getMidAttackResult = function getMidAttackResult (e, t) {
      new SFCommon.BaseAPI(e, t, function excuting (n, r) {
        var e = [n.userName, n.password, n.randCode]
        ;(n.userName && n.password && n.randCode) ||
          E.warn(
            d,
            'param error',
            'get middle attack result interface parameter is not full'
          ),
          SFRequest.createRequest({
            type: 'ECAgent',
            path: 'GetMITEMAttackResult',
            data: e,
            method: 'get',
            success: function (e) {
              var t = i.getResult()
              '1' === e.result
                ? ((t.data.key = e.data), n.success(t))
                : n.error(t),
                r()
            },
            error: function (e) {
              n.error(e), r()
            }
          })
      }).invoke()
    })
})(SFAPI)
