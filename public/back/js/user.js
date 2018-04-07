/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  //封装渲染函数
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },

      //成功就渲染，
      success: function (info) {
        $(".table tbody").html(template("tmp", info))
        //分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          //关联当前页
          currentPage: currentPage,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //点击当前页，重新渲染
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })

        //给按钮注册委托点击事件
        $(".table tbody").on("click",".btn",function(){
          //模态框显示
         $("#userModal").modal("show")
          //获取按钮的id
          var id = $(this).parent().data('id');
          //判断按钮的颜色，有就禁用，没有启用
          var isDelete = $(this).hasClass('btn-success')?1:0;
          $(".submitBtn").off("click").on("click",function(){
            //发送ajax请求，关闭模态框，重新渲染页面
            $.ajax({
              type:'post',
              url:'/user/updateUser',
              data:{
                id:id,
                isDelete:isDelete
              },
              dataType:'json',
              success:function(info){
                console.log(info);
                if(info.success){
                  $("#userModal").modal("hide");
                  render();
                }
              }
            })
          })
        })
      }
    })
  }
})