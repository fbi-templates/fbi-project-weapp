module.exports = {
  show: function(cfg) {
    let that = this
    that.setData({
      message: {
        content: cfg.content,
        icon: cfg.icon,
        visiable: true
      }
    })
    if (typeof cfg.duration !== 'undefined') {
      setTimeout(function() {
        that.setData({
          message: {
            visiable: false
          }
        })
      }, cfg.duration)
    }
  },
  hide: function() {
    let that = this
    that.setData({
      message: {
        visiable: false
      }
    })
  }
}