<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <h1>普通输入框</h1>
    <view class="weui-cells ">
      <view class="weui-cell ">
        <view class="">
          <view class="weui-label">qq</view>
        </view>
        <view>
          <input class="weui-input" placeholder="请输入qq" />
        </view>
      </view>
    </view>

    <view class="blockerLine"></view>
    <h1>密码输入框</h1>
    <view class="weui-cells ">
      <view class="weui-cell ">
        <view class="">
          <view class="weui-label">请输入密码</view>
        </view>
        <view>
          <input class="weui-input" placeholder="请输入密码" type="password" />
        </view>
      </view>
    </view>

    <view class="blockerLine"></view>
    <h1>日期选择器</h1>
    <view class="weui-cells ">
      <view class="weui-cell">
        <view class="weui-label">日期</view>

        <picker mode="date" :value="today" :start="today" :end="tomorrow" :bindchange="dateChange">
          <!-- <view class="weui-input">{{today}}</view> -->
          <input class="weui-input" :value="today" />
        </picker>
      </view>
    </view>

    <view class="blockerLine"></view>
    <view class="weui-cells__title">带区号选择的电话号码输入</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_select">
        <view class="weui-cell__hd" style="width: 105px">
          <picker bindchange="bindCountryCodeChange" :value="dropListDatasIndex" :range="dropListDatas">
            <view class="weui-select">{{dropListDatas[dropListDatasIndex]}}</view>
          </picker>
        </view>
        <view class="weui-cell__bd weui-cell__bd_in-select-before">
          <input class="weui-input" placeholder="请输入电话号码" />
        </view>
      </view>
    </view>

  </div>
</template>

<script>
  import card from '@/components/card'

  const date = new Date()
  const date2 = new Date()
  date2.setDate(date.getDate() + 1)
  export default {
    data() {
      return {
        motto: 'Hello World',
        userInfo: {},
        today: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        tomorrow: `${date2.getFullYear()}-${date2.getMonth() +
          1}-${date2.getDate()}`,
        dropListDatas: ['0755', '010', '020', '021'],
        dropListDatasIndex: 0
      }
    },

    components: {
      card
    },

    methods: {
      bindViewTap() {
        const url = '../logs/main'
        wx.navigateTo({ url })
      },
      getUserInfo() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: res => {
                this.userInfo = res.userInfo
              }
            })
          }
        })
      },
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    },
    mounted() {
      console.log(this.today)
      console.log(this.tomorrow)
    },
    dateChange(val) {
      console.log(val)
    }
  }
</script>

<style scoped>
  .container {
    background-color: #fefefe;
  }
  .blockerLine {
    border-top: #bbb 1px solid;
    border-bottom: #fefefe 1px solid;
    height: 10px;
    width: 100%;
    margin: 20px 0px;
    background: #eee;
  }
</style>
