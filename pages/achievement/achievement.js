const fetch = require('../../scripts/fetch');
const config = require('../../scripts/config');
const util = require('../../scripts/util')
const app = getApp();

Page({
  data: {
    date: '2017-10',
    flag: '1',
    fetching: false,  // fetch 状态
    list: []
  },

  onShow: function(params) {
    // 初始化时间
    let date = util.getYearAndMonth()
    this.setData({
      date
    })

    this.fetchList()
  },

  bindDateChange:function(e) {
    this.setData({
      date: e.detail.value
    })

    if (!this.fetching) {
      this.fetchList()
    }
  },

  fetchList: function() {
    const dateArr = this.data.date.split('-')
    const params = {
      year: dateArr[0],
      month: dateArr[1],
      flag: this.data.flag
    }

    //更新fetch 状态
    this.setData({
      fetching: true
    })

    fetch.getEpss.call(this, params, json => {
      if (json.result) {
        this.setData({
          list: json.data,
        })
      }

      this.setData({
        fetching: false
      })
    })
  }


})