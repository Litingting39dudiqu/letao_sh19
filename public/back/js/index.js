/**
 * Created by Administrator on 2018/4/6 0006.
 */
//
//<script src="lib/jquery/jquery.min.js"></script>
//  <script src="lib/bootstrap/js/bootstrap.min.js"></script>
//  <script src="lib/bootstrap-validator/js/bootstrapValidator.min.js"></script>
//  <script src="lib/nprogress/nprogress.js"></script>
//  <script src="lib/echarts/echarts.min.js"></script>
//  <script src="js/common.js"></script>
//  <script src="js/index.js"></script>

require(['jquery','echarts','common'], function($,echarts){


  var echarts_1= echarts.init(document.querySelector(".echarts_1"));
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 2000, 1050, 1200, 2500, 2000]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option);
  var echarts_2= echarts.init(document.querySelector(".echarts_2"));
  option = {
    title : {
      text: '热门品牌排行',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  echarts_2.setOption(option);
})