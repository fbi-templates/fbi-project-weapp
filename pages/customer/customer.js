const fetch = require('../../scripts/fetch');
const config = require('../../scripts/config');
const message = require('../../components/message/message');
const tip = require('../../components/tip/tip');
const app = getApp();

Page({
  data: {
    active: 0,
    pageIndex: 1,
    pageTotal: 1,
    info: {},
    disabled: false,
    fetching: true, // 是否在请求数据中.
    initing: false, // 是否是初次加载
    icpList: [],
    customerList:[]
  },

  onShow: function() {
    // 撤回到添加
    this.setData({
      active: 0
    })
  },

  onReachBottom: function() {
    // 当前的active
    if (this.data.active == 0 || this.data.fetching || this.data.pageIndex >= this.data.pageTotal) {
      return false
    } 

    this.fetchList(data => {  
      this.data.pageIndex++;
      this.data.pageTotal = data.PageCount

      if (this.data.active == 1) {
        this.data.icpList.concat(data.Data)
      } else {
        this.data.customerList.concat(data.Data)
      }

      this.setData({
        ...this.data
      })
    })
  },

  swicthnav: function(e) {
    const dataset = e.currentTarget.dataset
    this.setData({
      active: dataset.nav,
      pageTotal: 1,
      pageIndex: 1
    })

    if(this.data.active > 0) {
      this.setData({
        initing: true
      })
      // 请求
      this.fetchList()  
    }
  },

  inputChange: function(e) {
    let field = e.currentTarget.dataset.field
    let value = e.detail.value

    this.data.info[field] = value
    this.setData({
      ...this.data
    })
  },  

  fetchList: function (cb) {
    const params = {
      pageSize: config.pageSize,
      pageIndex: this.data.pageIndex,
      flag: this.data.active
    }

    // fetch 状态 更新
    this.setData({
      fetching: true
    })

    fetch.getCustomer.call(this, params, json => {
      if (json.result) {
        // 如果存在 cb 意为添加
        if (cb && 'function' == typeof cb) {
          cb(json.data)
        } else {
          if (this.data.active == 1) {
            this.data.icpList = json.data.Data
            this.data.pageTota = json.data.pageTotal
          } else {
            this.data.customerList = json.data.Data
            this.data.pageTota = json.data.pageTotal
          } 
          this.setData({
            ...this.data
          })
        }
      }

      this.setData({
        fetching: false,
        initing: false
      })
    })
  },

  // 添加备案信息
  addCustomer: function() {
    tip.hide.call(this)
    this.setData({
      disabled: true
    })
    // 异步添加客户
    this.asyncAddCustomer()
  },

  // socail 校验
  hasSocialCreditCode: function () {
    return new Promise((resolve, reject) => {
      fetch.hasSocialCreditCode.call(this, { SocialCreditCode: this.data.info.SocialCreditCode }, json => {
        if (json.result) {
          resolve()
        } else {
          this.setData({
            disabled: false
          })
          reject()
        }
      })
    })
  },

  // customer
  asyncAddCustomer: function () {
    let params = this.data.info
    // 等待校验成功
    this.hasSocialCreditCode().then(() => {
      // 添加客户
      fetch.addCustomer.call(this, params, json => {
        if (json.result) {
          message.show.call(this, {
            content: '提交成功',
            icon: 'success',
            duration: 2000
          })
          
          setTimeout(() => {
            this.setData({
              info: {}, // 清空当前的填写内容
              active: 1
            })
            this.fetchList()
          }, 1500)
        }
        this.setData({
          disabled: false
        })
      })
    }) 
  }
})