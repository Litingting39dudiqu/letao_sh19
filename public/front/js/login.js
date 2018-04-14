/**
 * Created by Administrator on 2018/4/12 0012.
 */
//
//<script src="lib/mui/js/mui.min.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="js/common.js"></script>

require(['mui','zepto','common'],function(mui){
  $("#btnLogin").on("click",function(){
    var username = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    if(!username){
      mui.toast("请输入用户名");
      return
    }
   if(!password){
     mui.toast("请输入密码")
     return
   }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        console.log(info);
        if(info.error ){
          mui.toast("用户名或密码错误")
          return
        }
        if(info.success){
          if(location.href.indexOf("retUrl") != -1){
            location.href = location.search.replace('retUrl?=','');
          }else{
            location.href = "user.html"
          }
        }
      }

    })
  })

})