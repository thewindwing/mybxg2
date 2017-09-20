define(['jquery','template'],function($,template){
   $.ajax({
       type:'get',
       url:'/api/teacher',
       success:function(data){
           console.log(data);
           $('#teacherInfo').html(template('teacherTpl',data));
       }
   }) ;
});