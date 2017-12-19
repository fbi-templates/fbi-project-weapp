const QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
const config = require('./config');

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "";
  thousand = thousand || ",";
  decimal = decimal || ".";
  let number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};


function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  let hour = parseInt(time / 3600)
  time = time % 3600
  let minute = parseInt(time / 60)
  time = time % 60
  let second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function getDate() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = time.getDate()
  day = day < 10 ? '0' + day : day
  return [year, month, day].join('-')
}

function getYearAndMonth() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  return [year, month].join('-')
}

// 获取本月一日和当前日
function getStartEnd(year, month) {
  year = year || new Date().getFullYear()
  month = month || new Date().getMonth() + 1
  month = month < 10 ? '0' + month : month

  let firstdate = year + '-' + month + '-01';
  let day = new Date(year, month, 0).getDate();
  //let today = new Date().getDate();
  day = day < 10 ? '0' + day : day

  let lastdate = year + '-' + month + '-' + day; //获取当月最后一天日期
  //给文本控件赋值。同下
  return {
    start: firstdate,
    end: lastdate
  };
}

function getTime() {
  let time = new Date()
  let hours = time.getHours()
  hours = hours < 10 ? '0' + hours : hours
  let minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second = time.getSeconds()
  second = second < 10 ? '0' + second : second
  return [hours, minute, second].join(':')
}

function fetchOption(url, params) {
  let _params = urlencode(params)
  return encodeURI(`${url}?${_params}`)
}

function urlencode(data) {
  let _result = [];
  for (let key in data) {
    let value = data[key];
    if (value.constructor == Array) {
      value.forEach(function(_value) {
        _result.push(key + "=" + _value);
      });
    } else {
      _result.push(key + '=' + value);
    }
  }
  return _result.join('&');
}

function location(address) {
  new QQMapWX({
    key: config.qqAK
  }).geocoder({
    address: address || '',
    success: function(res) {
      let address = res.result.location
      wx.openLocation({
        latitude: address.lat,
        longitude: address.lng,
        scale: 28
      })
    },
    fail: function(res) {
      console.log(res);
    },
    complete: function(res) {
      console.log(res);
    }
  });
}

module.exports = {
  getYearAndMonth,
  formatTime,
  getDate,
  getTime,
  fetchOption,
  getStartEnd,
  location
}