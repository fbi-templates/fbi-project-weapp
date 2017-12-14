var config = require('../../script/config');
var app = getApp();

const GRID_LIST = [
  [{
    name: '个人信息',
    icon: 'info',
    url: '../myDetail/myDetail',
  }, {
    name: '用户协议',
    icon: 'protocol',
    url: '../protocol/protocol?mode=read',
  }, {
    name: '推荐给朋友',
    icon: 'recommend',
    url: '',
  }],
  [{
    name: '密码修改',
    icon: 'set',
    url: "../myDetail/myDetail"
  }],
  [{
    name: '退出',
    icon: 'cancel',
    url: "../login/login"
  }]
]

Page({
  data: {
    gridList: GRID_LIST,
  },

  onLoad: function(cb) {

    var that = this
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },

  handleViewGrid: (e) => {
    let url = e.currentTarget.dataset.url
    let code = e.currentTarget.dataset.code
    console.log()
    // 清除缓存
    if (code == 'cancel') {
      wx.removeStorageSync('token')
      wx.removeStorageSync('userInfo')
    } else if (code == 'recommend') {
      wx.showShareMenu({
        withShareTicket: true
      })
    } else {
      url = `${url}?code=${code}`
    }

    url && wx.navigateTo({
      url: url
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '物链科技业务端',
      path: '/pages/login/login',
      imageUrl: '/images/app.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})