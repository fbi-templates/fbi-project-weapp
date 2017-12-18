const util = require('./util')
const message = require('../component/message/message')

const DURATION = 3000
const LOGIN_REDIRECT = "/pages/login/login"
/**
 * [小程序请求]
 * @param {string} url                  [请求地址]
 * @param {object} method               [GET | POST]
 * @param {object} opts                 [携带参数]
 * @param {function} cb                 [处理函数]
 * @param {boolean} hasToken            [携带token]
 */
function getFetchOptions(url, method = 'GET', opts = { header: null, body: null }, cb, hasToken = true) {
  // 关闭上次的窗口
  message.hide.call(this);
  // 接口地址 + header 携带参数
  const endPoint = util.fetchOption(url, opts.header)
  // 编码方式
  let header = {
    "Content-Type": "application/json"
  }

  if (hasToken) {
    header = Object.assign({}, header, {
      "ctp-token-sign": wx.getStorageSync("token")
    })
  }

  wx.request({
    url: endPoint,
    method: method,
    data: opts.body,
    header: header,
    success: function (res) {
      // correct
      let CORRECT = 
        res.statusCode == 200 &&
        res.data &&
        res.data.Code == "000000"

      let json = {
        result: false,
        data: null,
        msg: '服务出错'
      }

      if (CORRECT) {

        json.result = true
        json.data = res.data.Data
        json.msg = '返回成功'

        cb(json)
      } else {
        cb(json)
        API_ERROR_LIST.catchError(cb)
      }
    },
    fail: function (res) {
      API_ERROR_LIST.throwError(cb)
    }
  });
}


const loginError = data => {
  if (data && data.Code && (data.Code == "000002" || data.Code == "0002")) {
    wx.removeStorage({
      key: "token",
      success: res => {
        if (!wx.isForwarding) {
          wx.isForwarding = true;
          message.show.call(this, {
            content: "登录已经失效",
            icon: "null",
            duration: DURATION
          });
          // 值运行一个跳转存在

          setTimeout(() => {
            wx.isForwarding = false;
            wx.navigateTo({
              url: LOGIN_REDIRECT
            });
          }, DURATION);
        }
      }
    });
  }
}

const catchError = cb => {
  // 失败的回调
  typeof cb == "function" && cb({ result: false });
  message.show.call(this, {
    content: '服务出错',
    icon: "offline",
    duration: DURATION
  });
}

const throwError = cb => {
  // 失败的回调
  typeof cb == "function" && cb({ result: false });
  message.show.call(this, {
    content: '网络异常',
    icon: "offline",
    duration: DURATION
  });
}

const API_ERROR_LIST = {
  loginError,      // 登录失效
  throwError,      // 服务端未响应
  catchError,      // 有捕获的异常
}

export {
  getFetchOptions,
  API_ERROR_LIST
}