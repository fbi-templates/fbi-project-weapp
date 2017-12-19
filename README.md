# fbi-project-weapp
小程序模板 

> 这是一个fbi项目模板。 如果还没有安装 [fbi](https://github.com/AlloyTeam/fbi) ，请使用以下命令安装：
>
> `$ npm i -g fbi` 或者 `yarn global add fbi`
## 环境要求
- `fbi v3.0+` (直接克隆本仓库则不需要依赖fbi)

## 使用方法

**创建小程序项目**

```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-weapp.git new-project  
```

或者

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-weapp.git
$ cd path/to/workspace
$ fbi init weapp new-project 
```

或者

```bash
$ git clone https://github.com/fbi-templates/fbi-project-weapp.git new-project
```

**简单说明**

在小程序中 ，通过`App()`来注册一个小程序 ，通过`Page()`来注册一个页面

1. 全局文件

* `app.js` 小程序逻辑 （常用来缓存某些页面的数据，在页面调用使用getApp()获取实例）
* `app.json` 小程序公共设置（pages属性：注册路由，小程序的首页为第一个注册的路由）[详细文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)
* `app.wxss` 小程序公共样式表

2. 页面组成

* `.js` 页面逻辑
* `.wxml` 页面结构 (带模板引擎的html)
* `.wxss` 页面样式表 (类似css) (可选)
* `.json` 页面配置 (可选)

3. 页面生命周期

* `onLoad` 监听页面加载
* `onReady` 监听页面初次渲染完成
* `onShow` 监听页面显示
* `onHide` 监听页面隐藏
* `onUnload` 监听页面卸载

**开发步骤**

1. [申请帐号](https://mp.weixin.qq.com/wxopen/waregister?action=step1)，并设置小程序信息。(需要提供个人或企业信息)
1. [下载并安装开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，选择自己操作系统对应的下载链接。
1. 编译预览
1. 版本发布


## 更多资源

- [微信小程序-入门](https://mp.weixin.qq.com/debug/wxadoc/dev/)
- [微信小程序-开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
- [微信小程序-组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
- [微信小程序-API](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
- [微信小程序-开发工具说明](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html)
- [fbi官方模板库](https://github.com/fbi-templates)
- [fbi文档](https://neikvon.gitbooks.io/fbi/content/)


## License

[MIT](https://opensource.org/licenses/MIT)

## Changelog

- **1.1.0** 优化项目 (2017.12.14)
  - 减少了`pages`页面对请求的调用参数，不再需要传入 url + method
  - 引入了 `Promise` 针对异步请求。（es7 async | await 小程序目前不支持）
- **1.0.3** 调整项目目录结构 (2017.12.14)
- **1.0.2** 添加tag (2017.12.14)


