/**
 * Created by Administrator on 2018/4/6 0006.
 */

define(['nprogress','jquery','bootstrap'],function(NProgress,$){


// 配置禁用小圆环
NProgress.configure({showSpinner: false});
// ajaxStart 所有的 ajax 开始调用
$(document).ajaxStart(function () {
  NProgress.start();
});
// ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function () {
  // 模拟网络延迟
  setTimeout(function () {
    NProgress.done();
  }, 500)
})

//2.二级分类

$(function () {
  $(".category").on("click", function () {
    $(this).next().slideToggle()
  })

})


//3.顶部菜单动画效果
$(function () {
  $('.icon-meun').on("click", function () {
    $('.lt-aside').toggleClass("hidemeun")
    $(".lt-header").toggleClass("hidemeun")
    $(".lt-main").toggleClass("hidemeun")
  })
})



//模态框
$(function () {
  $(".icon-logout").on("click", function () {
    $("#modal").modal("show")
    $(".btn-logout").on("click", function () {
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function (info) {
          if (info.success == true) {
            location.href = "login.html"
          }
        }
      })
    })

  })
})


//登录拦截
if (location.href.indexOf('login.html') == -1) {
$.ajax({
  type:'get',
  url:'/employee/checkRootLogin',
  success:function(info){
    //console.log(info);
    if(info.error == 400){
      location.href ="login.html"
    }
  }
})
}
})