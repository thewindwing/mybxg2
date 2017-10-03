define(['jquery'],function($){
//    HTML在aside中 可以设置任意HTML文件内
    $(document).ajaxStart(function(){
        $('.overlay').show();//显示遮罩
    }).ajaxStop(function(){//等会再隐藏遮罩
        setTimeout(function(){
            $('.overlay').hide();
        },500)
    })
});