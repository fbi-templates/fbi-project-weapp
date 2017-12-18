import { getFetchOptions } from './resetful';

const config = require('./config.js')

// 登陆
function login(params, cb) {
  const url = config.apiList.login
  const method = 'POST'
  const opts = {
    header: params,
    body: null
  }
  getFetchOptions(url, method, opts, cb, false)
}

// 验证码
function checkCode(params, cb) {
  const url = config.apiList.checkCode
  const opts = {
    header: params,
    body: null
  }
  getFetchOptions(url, null, opts, cb, true)

}

// 注册
function register(params, cb) {
  const url = config.apiList.register
  const method = 'POST'
  const opts = {
    header: null,
    body: params
  }
  getFetchOptions(url, method, opts, cb, false)
}

// 获取客户信息
function getCustomer(params, cb) {
  const url = config.apiList.getCustomer
  const opts = {
    header: params,
    body: null
  }
  getFetchOptions(url, null, opts, cb, true)
}

function getEpss(params, cb) {
  const url = config.apiList.getEpss
  const opts = {
    header: params,
    body: null
  }
  getFetchOptions(url, null, opts, cb, true)
}

function hasSocialCreditCode(params, cb) {
  const url = config.apiList.hasSocialCreditCode
  const opts = {
    header: params,
    body: null
  }
  getFetchOptions(url, null, opts, cb, true)
}

function addCustomer(params, cb) {
  const url = config.apiList.addCustomer
  const method = 'POST'
  const opts = {
    header: null,
    body: params
  }
  getFetchOptions(url, method, opts, cb, false)
}

module.exports = {
  login,
  checkCode,
  register,
  getCustomer,
  hasSocialCreditCode,
  addCustomer,
  getEpss
};