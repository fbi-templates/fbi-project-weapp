var config = require('./config.js')
var message = require('../component/message/message')
var util = require('./util')

const ERROR_TIP = '网络异常'

function error(that, data) {
  // CODE == '0002'
  if (data && data.Code && (data.Code == "000002" || data.Code == "0002")) {
    wx.removeStorage({
      key: "token",
      success: function(res) {
        if (!wx.isForwarding) {
          wx.isForwarding = true;
          message.show.call(that, {
            content: "登录已经失效",
            icon: "null",
            duration: 3000
          });
          // 值运行一个跳转存在

          setTimeout(() => {
            wx.isForwarding = false;
            wx.navigateTo({
              url: "/pages/login/login"
            });
          }, 3000);
        }
      }
    });
  }
}

const api = {
  success: function(res, that, cb) {
    if (typeof cb == "function") {
      // 正确 返回
      if (
        res.statusCode == 200 &&
        res.data &&
        (!res.data.Code || res.data.Code == "000000")
      ) {
        cb({ result: true, data: res.data });
      } else {
        cb({ result: false });
        if (res.data) {
          message.show.call(that, {
            content: res.data.Message || res.data.Msg || ERROR_TIP,
            icon: "offline",
            duration: 3000
          });
          error(that, res.data || ERROR_TIP);
        }
      }
    }
  },
  fail: function(that, cb) {
    // 失败的回调
    typeof cb == "function" && cb({ result: false });
    message.show.call(that, {
      content: ERROR_TIP,
      icon: "offline",
      duration: 3000
    });
  }
};

// 登陆
function login(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: util.fetchOption(url, params),
    method: method,
    header: {
      "Content-Type": "application/json"
    },
    data: null,
    success: function(res) {
      if (typeof cb == "function") {
        // 正确 返回
        if (res.statusCode == 200 && res.data.Code == "000000") {
          cb({ result: true, data: res.data.Data });
        } else {
          cb({ result: false });
          message.show.call(that, {
            content: res.data.Message || res.data.Msg,
            icon: "offline",
            duration: 3000
          });
        }
      }
    },
    fail: function() {
      // 失败的回调
      typeof cb == "function" && cb({ result: false });
      message.show.call(that, {
        content: ERROR_TIP,
        icon: "offline",
        duration: 3000
      });
    }
  });
}

// 验证码
function checkCode(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: util.fetchOption(url, params),
    method: method,
    header: {
      "Content-Type": "application/json",
      "ctp-token-sign": wx.getStorageSync("token")
    },
    success: function(res) {
      api.success(res, that, cb);
    },
    fail: function(res) {
      api.fail(that, cb);
    }
  });
}

// 注册
function register(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: url,
    method: method,
    data: params,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      api.success(res, that, cb);
    },
    fail: function (res) {
      api.fail(that, cb);
    }
  });
}

// 获取客户信息
function getCustomer(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: util.fetchOption(url, params),
    method: method,
    header: {
      "Content-Type": "application/json",
      "ctp-token-sign": wx.getStorageSync("token")
    },
    success: function (res) {
      api.success(res, that, cb);
    },
    fail: function (res) {
      api.fail(that, cb);
    }
  });
}

function getEpss(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: util.fetchOption(url, params),
    method: method,
    header: {
      "Content-Type": "application/json",
      "ctp-token-sign": wx.getStorageSync("token")
    },
    success: function (res) {
      api.success(res, that, cb);
    },
    fail: function (res) {
      api.fail(that, cb);
    }
  });
}

function hasSocialCreditCode(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: util.fetchOption(url, params),
    method: method,
    header: {
      "Content-Type": "application/json",
      "ctp-token-sign": wx.getStorageSync("token")
    },
    success: function (res) {
      api.success(res, that, cb);
    },
    fail: function (res) {
      api.fail(that, cb);
    }
  });
}

function addCustomer(url, method, params, cb) {
  var that = this;
  message.hide.call(that);
  wx.request({
    url: url,
    method: method,
    data: params,
    header: {
      "Content-Type": "application/json",
      "ctp-token-sign": wx.getStorageSync("token")
    },
    success: function (res) {
      console.log(res);
      api.success(res, that, cb);
    },
    fail: function (res) {
      api.fail(that, cb);
    }
  });
}

module.exports = {
  login,
  checkCode,
  register,
  getCustomer,
  hasSocialCreditCode,
  addCustomer,
  getEpss
};