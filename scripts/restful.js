const util = require('./util')
const message = require('../components/message/message')

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
    success: res => {
      // correct
      let CORRECT = 
        res.statusCode == 200 &&
        res.data &&
        (res.data.Code == "000000" || !res.data.Code)

      let json = {
        result: false,
        data: null,
        msg: '服务出错'
      }

      if (CORRECT) {
        json.result = true
        json.data = res.data
        json.msg = '返回成功'

        cb(json)
      } else {
        cb(json)
        // 是否登录超时
        let loginError = 
          res.statusCode == 200 &&
          res.data &&
          res.data.Code == "000002"

        if (loginError) {
          API_ERROR_LIST.loginError.call(this, cb)
        } else {
          API_ERROR_LIST.catchError.call(this, cb)
        }
      }
    },
    fail: res => {
      API_ERROR_LIST.throwError.call(this, cb)
    }
  });
}


function loginError(data) {
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

function catchError(cb) {
  // 失败的回调
  typeof cb == "function" && cb({ result: false });
  message.show.call(this, {
    content: '服务出错',
    icon: "offline",
    duration: DURATION
  });
}

function throwError(cb) {
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

module.exports = getFetchOptions
