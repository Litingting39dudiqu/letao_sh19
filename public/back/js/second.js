/**
 * Created by Administrator on 2018/4/7 0007.
 */
//<script src="lib/jquery/jquery.min.js"></script>
//  <script src="lib/bootstrap/js/bootstrap.min.js"></script>
//  <script src="lib/bootstrap-validator/js/bootstrapValidator.min.js"></script>
//  <script src="lib/nprogress/nprogress.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="lib/bootstrap-paginator/bootstrap-paginator.min.js"></script>
//  <script src="lib/jquery-fileupload/jquery.ui.widget.js"></script>
//  <script src="lib/jquery-fileupload/jquery.fileupload.js"></script>
//  <script src="js/common.js"></script>
require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common','jqueryFileupload'],function($,template){

  var currentPage = 1;
  var pageSize = 5;
  render();
  //1.封装函数渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('.table tbody').html(template('tmp', info))

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

  //2.添加点击事件，请求ajax,渲染一级菜单
  $("#addBtn").on("click", function () {
    $("#secondtModal").modal("show")
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template("tmp-down", info))
      }
    })
  })

  //3.给一级菜单注册委托事件,获取里面的值和id
  $('.dropdown-menu').on("click", 'a', function () {
    var txt = $(this).text();
    var id = $(this).data("id");
    $('#dropdownText').text(txt);
    $('[name="categoryId"]').val(id)
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })

  //4.配置图片上传
  $("#fileupload").fileupload({
    dataType: 'json',
    done: function (e, data) {
      var picAddr = data.result.picAddr
      $('#imgBox').attr('src', picAddr);
      $('[name="brandLogo"]').val(picAddr)
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })

  //5.配置表单校验
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称',
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类名称',
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片',
          }
        }
      }
    }
  })
  //6.验证成功，请求ajax,重置表单
  $('#form').on("success.form.bv",function(){
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      success:function(info){
        //console.log(info)
        if(info.success){
          $("#secondtModal").modal("hide");
          currentPage=1;
          $('#form').data("bootstrapValidator").resetForm(true)
          render();
          $('#dropdownText').text("请选择一个一级菜单");
          $('#imgBox').attr('src','images/none.png');

        }
      }
    })
  })
})