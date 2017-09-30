define(['jquery','template','util'],function($,template,util){
    util.getMenu('/course/list');
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template('listTpl',{list:data.result});
                $('#courseList').html(html);
            }
        }
    })
});