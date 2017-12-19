const fetch = require('../../scripts/fetch');
const config = require('../../scripts/config');
const message = require('../../components/message/message');
const app = getApp();

Page({
  data: {
    code: 'info',
    info: {
      OldPassword: '',
      NewPassword: '',
      NewPasswordConfirm: ''
    },
    trailer: null,
    recommendImg: '',
    disabled: false,
    loading: false
  },

  onLoad: function(params) {
    // 跳转地址
    // code['info','car','evaluate','set']
    let that = this
    let title = '我的'
    switch (params.code) {
      case 'info':
        title = "个人信息";
        that.fetchTrailer();
        break;
      case 'recommend':
        title = '推荐给朋友'
      case 'set':
        title = "修改密码";
        break;
    }

    wx.setNavigationBarTitle({
      title: title
    })

    this.setData({
      code: params.code
    })
  },

  changeInfo: function(e) {
    let field = e.currentTarget.dataset.field
    this.data.info[field] = e.detail.value

    this.setData({
      info: this.data.info,
      disabled: !!this.data.info.OldPassword && !!this.data.info.NewPassword && (this.data.info.NewPassword == this.data.info.NewPasswordConfirm)
    })
  },

  submit: function(e) {
    // 成功后。跳转到 登录页面./
    this.setData({
      loading: true
    })
    fetch.updatePass.call(this, config.apiList.trailer, 'PUT', this.data.info, json => {
      wx.hideNavigationBarLoading();
      this.setData({
        loading: false
      })
      // 如果成功
      if (json.result) {
        message.show.call(this, {
          content: '密码修改成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },


  //获取 司机信息
  fetchTrailer: function(e) {
    wx.showNavigationBarLoading();
    fetch.trailer.call(this, config.apiList.trailer, 'GET', null, json => {
      wx.hideNavigationBarLoading();
      // 如果成功
      if (json.result && json.data) {
        let data = json.data
        // 时间转换 ，去掉时分秒, 并且加入是否在截至日期一个月之内的时间判断
        Object.keys(data).forEach(item => {
          if (!!data[item]) {
            if (!isNaN(new Date(data[item].toString().replace(/-/g, '/')).getTime())) {
              let dateStr = data[item].toString().split(" ")[0]
              json.data[item] = dateStr

              // 提醒日期时间戳 （s）
              let currentDate = new Date(dateStr)
              let endDate = new Date(currentDate.getFullYear(), currentDate.getMoth - 1, currentDate.getDate())
              // 今天 > 截至
              if (new Date().getTime() > currentDate.getTime()) {
                json.data[`${item}_end`] = '已过期'
              } else if (new Date().getTime() > endDate.getTime()) {
                json.data[`${item}_end`] = '即将过期'
              }
            }
          }
        })

        this.setData({
          trailer: json.data
        })
      }
    })
  }

})