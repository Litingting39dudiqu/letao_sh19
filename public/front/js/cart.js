/**
 * Created by Administrator on 2018/4/12 0012.
 */

//<script src="lib/mui/js/mui.min.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>
require(['mui','template','zepto','common'],function(mui,template){



  //1。封装渲染函数
  function render() {
    $('.total-price').text('00.00')
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        success: function (info) {
          console.log(info);
          $('.mui-table-view').html(template("tmp", {list: info}))
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    }, 500)

  }




  //2.配置下拉加载更多功能
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          render();
        }
      },

    }
  });

  // 3.删除功能
  // 1. 给删除按钮, 注册点击事件(事件委托)
  // 2. 根据购物车id, 发送删除 ajax 请求
  // 3. 重新渲染, 调用下拉刷新

  $(".lt_main ul").on("tap", '.btn_delete', function () {
    var id = $(this).data("id");
    mui.confirm('你是否要删除该商品', '温馨提示', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: [id]
          },
          success: function (info) {
            if (info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })

  })


  // 4.修改功能
  // 1. 给修改按钮, 注册点击事件(事件委托)
  $(".lt_main ul").on("tap", '.btn_edit', function () {
    var id = this.dataset.id
    var htmlStr = template('tmp-edit', this.dataset)
    var htmlStr = htmlStr.replace(/\n/g, '')
    mui.confirm(htmlStr, '编辑商品', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        var size = $('.lt-size span.current').text();
        var num = $('.lt-num .mui-numbox-input').val();
        console.log(size);
        console.log(num);
        $.ajax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (info) {
            console.log(info);
            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
          }
        })
      }
    })
    mui('.mui-numbox').numbox()

  })


  $("body").on("tap", ".lt-size span", function () {
    $(this).addClass('current').siblings().removeClass('current')
  })
  // 5.计算价格功能
  // 1. 肯定要将 价格 和 数量, 存在 checkbox 中
  // 2. 注册 checkbox 点击事件(事件委托), 获取到所有被选中的 checkbox


  $('.lt_main ul').on('change', '#ck', function () {
    var total = 0
    $('#ck:checked').each(function(e,i){
      var price = $(this).data('price');
      var num = $(this).data("num");
     total += price * num
    })
    $('.total-price').text(total.toFixed(2))
  })

})