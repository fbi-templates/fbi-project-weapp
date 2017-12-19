const config = require('../../scripts/config');

const LOGIN_URL = '/pages/login/login'

Page({
  data: {

  },
  onLoad: function() {
    // 如果 能拿到 token的数据。 则直接跳转到banner
    wx.getStorage({
      key: 'token',
      success: function(res) {
        if (res.data) {
          wx.switchTab({
            url: config.forward_url
          })
        } else {
          wx.redirectTo({
            url: LOGIN_URL
          })
        }
      },
      fail: function(res) {
        wx.redirectTo({
          url: LOGIN_URL
        })
      }
    })
  }
})