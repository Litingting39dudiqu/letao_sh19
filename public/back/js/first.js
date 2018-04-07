/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  //封装一个函数，渲染数据
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info);
        $(".table tbody").html(template("tmp", info))
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }

//点击添加按钮。让模态框显示
  $("#addBtn").on("click", function () {
    $("#firstModal").modal("show")
  })

  //表单校验
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空检验
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })
//给添加注册点击事件，
 $("#form").on("success.form.bv",function(){
   $.ajax({
     type:'post',
     url:'/category/addTopCategory',
     data:$('#form').serialize(),
     success:function(info){
       console.log(info);
       if(info.success){
         //模态框隐藏
         $("#firstModal").modal("hide")
           //重新渲染
         render()
         //让表单内容重置
         $("#form").data('bootstrapValidator').resetForm(true)
       }
     }
   })
 })
  //给取消注册点击事件，让表单内容重置
  $('.cancel').on("click",function(){
    $('#form').data('bootstrapValidator').resetForm(true)
  })
})