/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function(){
  var currentPage =1;
  var pageSize =5;
  render();

  function  render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('.table tbody').html(template('tmp',info))
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,page){
            currentPage=page;
            render()
          }
        })
      }
    })
  }

  //添加点击事件
  $("#addBtn").on("click",function(){
    $("#secondtModal").modal("show")
  })
})