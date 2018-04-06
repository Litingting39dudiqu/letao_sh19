/**
 * Created by Administrator on 2018/4/6 0006.
 */
$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能不为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          }
        }
      }
      ,
      password: {
        validators: {
          notEmpty: {
            message: '密码不能不为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          }
        }
      }
    }
  })
})
