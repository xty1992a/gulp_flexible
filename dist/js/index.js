/**
 * Created by rule on 2017/8/8.
 */
;(function ($) {
  $.extend($.fn, {
    slideDown: function (ms) {
      ms = ms || 200
      $(this).css({
        display: 'block',
        height: 0
        // transform: 'translate3d(0,-100%,0)'
      }).animate({
        height: '0.8rem'
        // transform: 'translate3d(0,0,0)'
      }, ms)
      return this
    },
    slideUp: function (ms) {
      ms = ms || 200
      $(this).animate({
        height: 0
        // transform: 'translate3d(0,-100%,0)'
      }, ms, function () {
        $(this).hide()
        return this
      })
    },
    slideToggle: function (speed, callback) {
      return this.each(function () {
        var el = $(this)
        console.log(el.css('height') == 0, el.css('display') == 'none')
        el[(el.css('height') == 0 || el.css('display') == 'none') ? 'slideDown' : 'slideUp'
            ](speed, callback)
      })
    }
  })
})(Zepto)

$(function () {
  var list = $('.list')
  var menu = $('.menu')
  console.log('document ready', list)
  list.on('click', 'li', function () {
    $(this).slideUp(200)
    console.log(this)
  })
  list.on('click', function () {
    console.log('click')
  })
  menu.on('click', 'li', function () {
    var index = $(this).index()
    console.log('tap')

    $(list.children()[index]).slideToggle(200)
  })
})
