# fbi-project-weapp
小程序模板 

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`
## Requirements
- `fbi v3.0+`

## Usage

**创建小程序项目**

```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-weapp.git new-project  
```

or

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-weapp.git
$ cd path/to/workspace
$ fbi init fbi-project-weapp new-project 
```

**开发小程序**

在小程序中 ，通过App()来注册一个小程序 ，通过Page()来注册一个页面

1. 全局文件

* app.js是小程序逻辑 （常用来缓存某些页面的数据，在页面调用使用getApp()获取实例）
* app.json是小程序公共设置（pages属性：注册路由，小程序的首页为第一个注册的路由）
* app.wxss是小程序公共样式表

2. pages介绍

* onLoad 生命周期函数--监听页面加载
* onReady 生命周期函数--监听页面初次渲染完成
* onShow 生命周期函数--监听页面显示
* onHide 生命周期函数--监听页面隐藏
* onUnload 生命周期函数--监听页面卸载

- [小程序开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
- [小程序开发教程](https://mp.weixin.qq.com/debug/wxadoc/dev/)


## More

- [Official templates](https://github.com/fbi-templates)
- [`fbi` documentation](https://neikvon.gitbooks.io/fbi/content/)
- [`微信小程序开发文档` documentation](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)

## License

[MIT](https://opensource.org/licenses/MIT)

## Changelog

- **1.0.1** 修改readme.md (2017.12.14)
- **1.0.2** 添加tags (2017.12.14)
- **1.0.3** 调整项目目录结构 (2017.12.14)
