/**
 * Created by Administrator on 2018/4/12 0012.
 */
require(['mui','template','zepto','common'],function(mui,template){
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function(info){
      //console.log(info);
      if(info.error){
        location.href = "login.html";
        return;
      }
      $(".mui-media").html(template("tmp",info))
    }
  })

  $('.mui-btn-block').on("click",function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";

        }
      }
    })
  })
})