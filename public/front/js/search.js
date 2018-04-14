/**
 * Created by Administrator on 2018/4/11 0011.
 */

///<script src="lib/mui/js/mui.min.js"></script>
//<script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>

require(['mui','template','zepto','common'],function(mui,template){

  //1.封装获取本地数据
  function history() {
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(history)
    return arr;
  }

  //2.封装渲染函数
  function render() {
    var arr = history();
    $('.lt_history').html(template("tmp", {arr: arr}))
  }

  render()

  //3.给x注册委托事件，点击删除对应的项
  $('.lt_history').on("click", '.btn_delete', function () {
    var that = this
    mui.confirm("是否清空历史记录", '温馨提示', ["确认", "'取消'"], function (e) {
      //获取对应的index
      var index = $(that).data('index');
      //获取本地数据
      var arr = history();
      //删除数组里的数据
      arr.splice(index, 1);
      //重新设置本地数据永久化
      localStorage.setItem("search_list", JSON.stringify(arr))
      //重新渲染
      render()
    })

  })


  //4.给清空所有数据，注册委托事件，删除所有数据
  $('.lt_history').on("click", '.btn-empty', function () {
    mui.confirm("是否清空所有历史记录", '温馨提示', ["确认", "'取消'"], function (e) {
      console.log(e)
      if (e.index === 0) {
        localStorage.removeItem("search_list");
        render();
      }
    })
  })

  //5.搜索功能，把数据添加到搜索历史
  $(".lt_search button").click(function () {

    var key = $('.lt_search input').val().trim();
    //如果输入为空，则直接返回
    if(key == ''){
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = history();

    //如果历史数据有记录，则跳到最前面，删除之前的记录
    if(arr.indexOf(key) !== -1){
      var index = arr.indexOf(key);
      arr.splice( index, 1 );
    }
    arr.unshift(key);
    //如果大于10个，删除最后一个
    if(arr.length >=10){
      arr.pop();
    }
    // 持久化到本地存储中
    localStorage.setItem( "search_list", JSON.stringify( arr ) );
    // 重新渲染
    render();
    $('.lt_search input').val('');
    location.href="searchList.html?key"+key;
  })
})