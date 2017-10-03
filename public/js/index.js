define(['jquery','util','echarts'],function($,util,echarts){
   util.getMenu('/main/index');
   // 指定图表的配置项和数据
   var option = {
      title: {
         text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
         data:['销量']
      },
      xAxis: {
         data: ["HTML","CSS","Mobile","Angular","vue","Nodejs"]
      },
      yAxis: {},
      series: [{
         name: '销量',
         type: 'bar',
         data: [5, 20, 36, 10, 10, 20]
      }]
   };

   var main=document.getElementById('main');
   var myChart=echarts.init(main);
   myChart.setOption(option);
});