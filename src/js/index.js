$(function () {
  var list = $('.list')
  var menu = $('.menu')
  console.log('document ready', list)
  list.on('tap', 'li', function () {
    $(this).slideUp(200)
    console.log(this)
  })
  list.on('tap', function () {
    console.log('click')
  })
  menu.on('tap', 'li', function () {
    var index = $(this).index()
    console.log('tap')
    $(list.children()[index]).slideToggle(200)
  })
})

