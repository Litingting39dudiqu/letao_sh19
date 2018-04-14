/**
 * Created by Administrator on 2018/4/11 0011.
 */

//<script src="lib/mui/js/mui.min.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>
require(['mui','template','zepto','common'],function(mui,template){


  //一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info)
      $(".cate-wrap").html(template('tmp',info))
      renderId(info.rows[0].id)
    }
  })

//  二级分类渲染
  function  renderId(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $('.wrap-sec').html(template('tmp-sec',info))
      }
    })
  }

//  给a注册委托事件
  $(".cate-wrap").on("click",'a',function(){
    var id = $(this).data("id");
    renderId(id);
    $(this).addClass("current").parent().siblings().find('a').removeClass('current')

  })

})