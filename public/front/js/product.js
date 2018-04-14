/**
 * Created by Administrator on 2018/4/11 0011.
 */
//
//<script src="lib/mui/js/mui.min.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>

  require(['mui','template','common','zepto'],function(mui,template,getSearch){

  var productId = getSearch('productId');
    console.log(productId)

  //ajax请求页面数据
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    success: function (info) {
      //console.log(info);
      $(".mui-scroll").html(template("tmp", info))
      // 初始化轮播图自动轮播
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化数字框
      mui('.mui-numbox').numbox().getValue()
    }
  })

  //尺码选择功能
  $('.lt_main').on("click", '.lt_size span', function () {
    $(this).addClass("current").siblings().removeClass('current');
  })


  // 加入购物车功能
  // 1. 给按钮注册点击事件
  // 2. 获取用户选择的尺码和数量, (产品id已有)
  // 3. 发送 ajax 请求, 加入购物车
  //    (1) 如果没登陆, 跳到登陆页面
  //    (2) 如果登陆了, 加入购物车成功, 弹出提示框
  $('.add_cart').on("click", function () {
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();

    if (!size) {
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        size: size,
        num: num
      },
      success: function (info) {
        console.log(info);
        if (info.error === 400) {
          location.href = 'login.html?retUrl=' + location.href
        }
        ;
        if (info.success) {
          mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
            if (e.index === 0) {
              location.href = 'cart.html'
            }
          })
        }
      }
    })
  })

})