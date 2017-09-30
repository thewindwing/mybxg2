define(['jquery','template','util','datepicker','language','form','validate'],function($,template,util){
    util.getMenu('/teacher/list');
    var tcId=util.qs('tc_id');

    if(tcId){
        //编辑
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{tc_id:tcId},
            dataType:'json',
            success:function(data){
                console.log(data);
                data.result.operate='编辑讲师';
                if(data.code==200){
                    $('#teacherInfo').html(template('teacherTpl',data.result));
                    //保存修改的内容(不需要为submit按钮注册点击事件)
                    formSubmit('/api/teacher/update',{tc_id:tcId});
                }
            }
        })
    }else{//添加
        $('#teacherInfo').html(template('teacherTpl',{operate:'添加讲师',tc_gender:'0'}));
        //保存添加的内容
        formSubmit('/api/teacher/add');
    }


    function formSubmit(url,data){
        $("#teacherForm").validate({
            sendForm:false,
            description:{
                joinInfo:{
                    required:'不能为空'
                },
                nameInfo:{
                    required:'不能为空'
                }
            },
            valid:function(){
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    data:data,
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        if(data.code==200){
                            location.href='/teacher/list';
                        }
                    }
                })
            }
        })
    }
});