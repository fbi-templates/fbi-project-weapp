var url = 'https://salesapi2.wlwulian.com' 

module.exports = {
  baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
  qqAK: '4RBBZ-S3KHW-BTCRA-OPKCY-ZX6QE-AHFZH',
  forward_url: '/pages/customer/customer',
  pageSize: 40,   // 页面的请求数量大小
  apiList: {
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/',
    login: url + '/api/Login', // 登陆
    register: url + '/api/passport', // 注册
    checkCode: url + '/api/passport', //验证码
    getCustomer: url + '/api/Customer', //获取客户信息
    addCustomer: url + '/api/Customer', // 添加客户备案
    hasSocialCreditCode: url + '/api/SocialCreditCode', // 检测客户备案id 是否存在
    getEpss: url + '/api/EPSStatistics', // 获取业绩或收益
    getToken: 'https://api.weixin.qq.com/cgi-bin/token',
  }
}