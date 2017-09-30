define(['jquery','util'],function($,util){
    util.getMenu('/course/add');
    $('#addBtn').click(function(){
        var that=$(this);
        $.ajax({
            type:'post',
            url:'/api/course/create',
            data:$('#addForm').serialize(),
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id;

                }
            }
        })
    });

});