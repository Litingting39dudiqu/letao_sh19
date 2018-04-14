/**
 * Created by Administrator on 2018/4/8 0008.
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
require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','jqueryFileupload','common'],function($,template){


  var currentPage =1;
  var pageSize =2;
  var picArr = []; // 专门用来保存图片对象
  render();

  //1.封装渲染页面函数
  function  render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $('.table tbody').html(template("tmp",info))

        //分页插件显示中文。和文本提示效果
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage :info.page,
          totalPages :Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
              render()
          },
          size:"large",
          itemTexts:function(type,page, current ){
            switch (type){
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
              case 'prev':
                return "上一页";
              case 'next':
                return "下一页";
              case 'page':
                return page;
            }
          },
          tooltipTitles:function (type,page, current){
            switch (type){
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
              case 'prev':
                return "上一页";
              case 'next':
                return "下一页";
              case 'page':
                return "前往第" +page+ "页";
            }
        },
          useBootstrapTooltip:true,
        })
      }
    })
  }

  //2.点击添加按钮显示模态框，
  $('#addBtn').on("click",function(){
    $('#proModal').modal("show")
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      success:function(info){
        console.log(info);
        $('.dropdown-menu').html(template("tmp-add",info))

      }
    })
  })
  //3 给a委托事件,点击发送ajax请求。渲染二级菜单数据
  $(".dropdown-menu").on("click","a",function(){
    //渲染二级菜单文本
    var txt = $(this).text();
     $("#dropText").text(txt);
    //获取隐藏域id
    var id = $(this).data('id');
    $('[name="brandId"]').val(id)
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
  })


  //4。配置图片上传
   $("#fileupload").fileupload({
     dataType:'json',
     done: function( e, data ) {
       console.log( data );
       // 获取图片地址对象
       var picObj = data.result;
       // 获取图片地址
       var picAddr = picObj.picAddr;

       // 新得到的图片对象, 应该推到数组的最前面    push pop shift unshift
       picArr.unshift( picObj );
       // 新的图片, 应该添加到 imgBox 最前面去
       $('#imgBox').prepend('<img src="'+ picAddr +'" width="100">');

       // 如果上传的图片个数大于 3个, 需要将最旧的那个(最后面的哪项), 要删除
       if( picArr.length > 3 ) {
         // 删除数组的最后一项
         picArr.pop();
         // 除了删除数组的最后一项, 还需要将页面中渲染的最后一张图片删除掉
         // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
         $("#imgBox img:last-of-type").remove();
       }


       // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
       // 需要将表单 picStatus 的校验状态, 置成 VALID
       if ( picArr.length === 3 ) {
         $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
       }

     }
   })

  // 5. 配置表单校验
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段
    fields: {
      // 二级分类id, 归属品牌
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品库存
      // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
      // 数字: \d
      // + 表示一个或多个
      // * 表示零个或多个
      // ? 表示零个或1个
      // {n} 表示出现 n 次
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  // 6. 注册校验成功事件
  $("#form").on("success.form.bv", function( e ) {
    $('#proModal').modal("hide")
    // 阻止默认的提交
    e.preventDefault();

    // 表单提交得到的参数字符串
    var params = $('#form').serialize();

    console.log(picArr);

    // 需要在参数的基础上拼接上这些参数
    // &picName1=xx&picAddr1=xx
    // &picName2=xx&picAddr2=xx
    // &picName3=xx&picAddr3=xx
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    console.log(params);

    // 通过 ajax 进行添加请求
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: params,
      success: function( info ) {
        console.log( info )
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重置校验状态和文本内容
          $('#form').data("bootstrapValidator").resetForm(true);
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 手动重置, 下拉菜单
          $('#dropdownText').text("请选择二级分类")

          // 删除结构中的所有图片
          $('#imgBox img').remove();
          // 重置数组 picArr
          picArr = [];

        }
      }
    })
  })

})