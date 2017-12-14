module.exports = {
  show: function(cfg) {
    var that = this
    that.setData({
      tip: {
        content: cfg.content,
        type: cfg.type,
        icon: cfg.icon,
        btn_text: cfg.btn_text,
        btn_func: cfg.btn_func,
        visiable: true
      }
    })
    if (typeof cfg.duration !== 'undefined') {
      setTimeout(function() {
        that.setData({
          tip: {
            visiable: false
          }
        })
      }, cfg.duration)
    }
  },
  hide: function() {
    var that = this
    that.setData({
      tip: {
        visiable: false
      }
    })
  }
}