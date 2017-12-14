var config = require('../../script/config');

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
            url: '/pages/login/login'
          })
        }
      },
      fail: function(res) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    })
  }
})