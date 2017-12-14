var app = getApp();
Page({
  data: {
    mode: 'edit'
  },
  onLoad: function(params) {
    this.setData({
      mode: params.mode
    })
  },
  accept: function(e) {
    app.setGlobalData('login', {
      readProtocol: true
    })
    wx.navigateBack()
  },

  refuse: function(e) {
    app.setGlobalData('login', {
      readProtocol: false 
    })
    wx.navigateBack()
  }
})