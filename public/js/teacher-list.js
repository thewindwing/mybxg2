define(['jquery','template','util','bootstrap'],function($,template,util){
    var path=location.pathname;
    util.getMenu(path);

    console.log(path)

   $.ajax({
       type:'get',
       url:'/api/teacher',
       success:function(data){
           console.log(data);
           $('#teacherInfo').html(template('teacherTpl',data));
           
       //    查看讲师信息
           $('.preview').click(function(){
               var tcId=$(this).parent('td').data('tc-id');
               $.ajax({
                    type:'get',
                   data:{tc_id:tcId},
                   url:'/api/teacher/view',
                   dataType:'json',
                   success:function(data){
                       // console.log(data);
                       if(data.code==200){
                           $('#modalInfo').html(template('modalTpl',data.result));
                           $('#teacherModal').modal();
                       }
                       
                   }
               })
           });
       }
   }) ;
});