
const URL = 'xxxx' 

module.exports = {
  baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
  qqAK: '4RBBZ-S3KHW-BTCRA-OPKCY-ZX6QE-AHFZH',
  forward_url: '/pages/customer/customer',
  pageSize: 40,                                                 // 页面的请求数量大小
  timer_cutdown: 60,                                            // 验证码 倒计时
  apiList: {
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/',
    login: `${URL}/api/Login`,                                  // 登陆
    register: `${URL}/api/passport`,                            // 注册
    checkCode: `${URL}/api/passport`,                           //验证码
    getCustomer: `${URL}/api/Customer`,                         //获取客户信息
    addCustomer: `${URL}/api/Customer`,                         // 添加客户备案
    hasSocialCreditCode: `${URL}/api/SocialCreditCode`,         // 检测客户备案id 是否存在
    getEpss: `${URL}/api/EPSStatistics`,                        // 获取业绩或收益
    getToken: 'https://api.weixin.qq.com/cgi-bin/token',
  }
}
