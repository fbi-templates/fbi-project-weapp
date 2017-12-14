var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var config = require('./config');

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = this,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};


function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function getDate() {
  var time = new Date()
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var day = time.getDate()
  day = day < 10 ? '0' + day : day
  return [year, month, day].join('-')
}

function getYearAndMonth() {
  var time = new Date()
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  return [year, month].join('-')
}

// 获取本月一日和当前日
function getStartEnd(year, month) {
  year = year || new Date().getFullYear()
  month = month || new Date().getMonth() + 1
  month = month < 10 ? '0' + month : month

  var firstdate = year + '-' + month + '-01';
  var day = new Date(year, month, 0).getDate();
  //var today = new Date().getDate();
  day = day < 10 ? '0' + day : day

  var lastdate = year + '-' + month + '-' + day; //获取当月最后一天日期
  //给文本控件赋值。同下
  return {
    start: firstdate,
    end: lastdate
  };
}

function getTime() {
  var time = new Date()
  var hours = time.getHours()
  hours = hours < 10 ? '0' + hours : hours
  var minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = time.getSeconds()
  second = second < 10 ? '0' + second : second
  return [hours, minute, second].join(':')
}

function fetchOption(url, params) {
  let _params = urlencode(params)
  return encodeURI(`${url}?${_params}`)
}

function urlencode(data) {
  var _result = [];
  for (var key in data) {
    var value = data[key];
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