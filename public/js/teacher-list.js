define(['jquery','template','util','bootstrap'],function($,template,util){
    var path=location.pathname;
    util.getMenu(path);
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

       //    启用和注销讲师
           $('.eod').click(function(){
               var tcId=$(this).parent('td').data('tc-id');
               var tcStatus='';
               var that=$(this);
               if($(this).html()=='启用'){
                   tcStatus=1;
               }else{
                   tcStatus=0;
               }
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    data:{tc_id:tcId,tc_status:tcStatus},
                    dataType:'json',
                    success:function(data){
                        // console.log(data);
                        if(data.code==200){
                            if(data.result.tc_status==0){
                                that.html('注销');
                            }else{
                                that.html('启用');
                            }
                        }
                    }
                })
           });
       }
   }) ;
});