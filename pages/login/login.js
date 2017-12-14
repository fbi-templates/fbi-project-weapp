var fetch = require('../../script/fetch')
var config = require('../../script/config')
var message = require('../../component/message/message');
var tip = require('../../component/tip/tip');
var app = getApp();

let FORWARD_URL = '/pages/recievedOrder/recievedOrder'
let TIMER_COUNTDOWN = 60  // 验证码
let timer = null

Page({
  data: {
    mode: 'login', // 模式： login, register
    login: {
      info:{
        userCode: '',
        password: '',
      },
      rememberPass: true, // 是否需要储存数据
      submiting: false, // 是否是提交中
      disabled: true // 不可提交
    },
    register: {
      info: {
        UserCode: '',
        Password: '',
        CheckCode: '',
      },
      readProtocol: false, // 是否阅读了协议
      submiting: false, // 是否是提交中
      isReceiving: false, // 是否正在接受code
      canReceive: false, // 是否能接收
      disabled: true, // 不可提交
      second: TIMER_COUNTDOWN
    },
  },

  onShow: function() {
    let register = this.data.register
    register.readProtocol = app.globalData.login.readProtocol
    register.disabled = 
      register.info.UserCode.length == 0 || 
      register.info.Password.length == 0 || 
      register.info.CheckCode.length == 0 || 
      !register.readProtocol
    this.setData({
      register
    }) 
  },

  onReady: function() {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        if (res.data) {
          that.setData({
            info: res.data,
            disabled: res.data.userCode.length == 0 && res.data.password.length == 0
          })
        }
      }
    })
  },

  formSubmit: function() {
    this.data.mode === 'login' ? this.login() : this.register()
  },

  login: function(){
    const login = this.data.login
    login.disabled = true
    login.submiting = true
    this.setData({ 
      login
    })

    // 校验数据的完整度
    fetch.login.call(this, config.apiList.login, 'POST', this.data.login.info, json => {
      // 如果成功
      if (json.result) {
        if (this.data.login.rememberPass) {
          //调用接口
          wx.setStorage({
            key: "userInfo",
            data: this.data.login.info
          })
        } else {
          wx.removeStorageSync('userInfo')
        }
        // 存储token
        wx.setStorageSync("token", json.data.Token)

        wx.reLaunch({
          url: config.forward_url
        })
      } 

      login.disabled = false
      login.submiting = false

      this.setData({ 
        login 
      })
    })
  },

  register: function(){
    const register = this.data.register
    register.disabled = true
    register.submiting = true
    this.setData({ 
      register
    })

    if (!this._checkPhone(register.info.UserCode)) {
      tip.show.call(this, {
        content: '请输入正确的手机号码！',
        icon: 'success',
        duration: 200000
      })

      register.disabled = false
      register.submiting = false
      this.setData({ 
        register
      })

      return false
    }

    tip.hide.call(this)

    // 校验数据的完整度
    fetch.register.call(this, config.apiList.register, 'POST', this.data.register.info, json => {
      // 如果成功
      if (json.result) {
        message.show.call(this, {
          content: '注册成功',
          icon: 'success',
          duration: 2000
        })

        setTimeout(() => {
          message.hide.call(this)
          // 清空上次的记录
          this.clearInfo()
          this.setData({
            mode: 'login'
          })
        }, 1500)
      } 

      register.disabled = false
      register.submiting = false

      this.setData({ 
        register 
      })
    })
  },

  inputChange: function(e) {
    const value = e.detail.value
    const property = e.currentTarget.dataset.name
    const mode = this.data.mode
  
    if (mode === 'login') {
      let login = this.data.login

      login.info[property] = value
      login.disabled = login.info.userCode.length == 0 || login.info.password.length == 0

      this.setData({
        login
      })
    } else {
      let register = this.data.register
      register.info[property] = value
      register.disabled = 
        register.info.UserCode.length == 0 || 
        register.info.Password.length == 0 || 
        register.info.CheckCode.length == 0 || 
        !register.readProtocol

      if (property === 'UserCode') {
        register.canReceive = this._checkPhone(value)

        if (register.canReceive) {
          tip.hide.call(this)
        }
      }
      this.setData({
        register
      })
    }
  },

  rememberPass: function(e) {
    this.setData({
      rememberPass: !this.data.rememberPass
    })
  },

  switchMode: function(e) {
    const mode = e.currentTarget.dataset.mode
    tip.hide.call(this)

    // 清空上次的记录
    this.clearInfo()

    this.setData({
      mode: mode === 'login' ? 'register' : 'login'
    })

  },

  clearInfo() {
    let login = this.data.login
    let register = this.data.register

    login.info = {
      userCode: '',
      password: '',
    }

    register.info = {
      UserCode: '',
      Password: '',
      CheckCode: '',
    }

    this.setData({
      login,
      register
    })
  },

  readProtocol: function(e) {
    wx.navigateTo({
      url: '../protocol/protocol'
    })
  },

  checkProtocol: function(e) {
    let register = this.data.register;
    register.readProtocol = !register.readProtocol
    register.disabled = 
      register.info.UserCode.length == 0 || 
      register.info.Password.length == 0 || 
      register.info.CheckCode.length == 0 || 
      !register.readProtocol
    this.setData({
      register
    })
  },

  requestCode: function(e) {
    let register = this.data.register
    clearInterval(timer)

    // 发送验证码
    fetch.checkCode.call(this, config.apiList.checkCode, 'GET', {
      mobilePhone: register.info.UserCode,
      messageType: '3'  // 找回密码传 4
    })

    register.isReceiving = true
    register.second = TIMER_COUNTDOWN
    this.setData({
      register
    })

    timer = setInterval(() => {
      let register = this.data.register
      register.second--;
      if (register.second > 0)　{
        register.isReceiving = true
      } else {
        register.isReceiving = false
        register.second = TIMER_COUNTDOWN
        clearInterval(timer)
      }
      this.setData({
        register
      })
    }, 1000)
  },

  _checkPhone: function(value){ 
    return /^1[34578]\d{9}$/.test(value)
  }

})