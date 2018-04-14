/**
 * Created by Administrator on 2018/4/11 0011.
 */

//<script src="lib/mui/js/mui.min.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>
require(['mui','template','common','zepto'],function(mui,template ,getSearch){


  // 获取地址栏参数中传递过来 搜索关键字
  //赋值给input框
  var key = getSearch('key')
  $('.lt_search input').val(key);

  //封装ajax,根据key,渲染数据
  var currentPage = 1;
  var pageSize = 4;

  function render(callback) {
    var obj = {};
    obj.proName = $('.lt_search input').val();
    obj.page = currentPage;
    obj.pageSize = pageSize;
    var $current = $('.lt_sort .current');
    if ($current.length > 0) {
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1
      obj[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: obj,
        success: function (info) {
          callback(info)
        }
      })
    }, 500)
  }
  //下拉刷新,上拉加载功能
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识
      down: {
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback: function () {
          currentPage = 1
          render(function (info) {
            $('.product ul').html(template("tmp", info))
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
          });
        }
      },
      up: {
        callback: function () {
          currentPage++;
          render(function (info) {
            console.log(info)
            if (info.data.length > 0) {
              $('.product ul').append(template("tmp", info))
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            } else {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }
          });
        }
      }
    }
  });


  //  1.点击搜索按钮,实现搜索功能
  $('.lt_search button').click(function () {
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    var key = $('.lt_search input').val();
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(history);
    var index = arr.indexOf(key);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list", JSON.stringify(arr))

  })

  //2.点击排序按钮。进行排序
  $(".lt_sort a[data-type]").on("tap", function () {
    console.log("hh")
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass("fa-angle-up").toggleClass("fa-angle-down")
    } else {
      $(this).addClass("current").siblings().removeClass("current")
      $('.lt_sort a i').removeClass('fa-angle-up').addClass('fa-angle-down')
    }
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })


})