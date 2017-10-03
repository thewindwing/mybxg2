define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
    util.getMenu('/course/add');
    var csId=util.qs('cs_id');
    //确保裁切实例（区域）的唯一性
    var nowCrop=null;

    $.ajax({
        type:'get',
        url:'/api/course/picture',
        dataType:'json',
        data:{cs_id:csId},
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template('pictureTpl',data.result);
                $('#pictureInfo').html(html);
            //    图片上传插件实现  //图片上传按钮的id
                $('#myFile').uploadify({                   swf:'/public/assets/uploadify/uploadify.swf',
                    uploader:'/api/uploader/cover',//图片上传给谁（后台接口）
                    fileObjName:'cs_cover_original',//图片以什么名字上传给后台
                    formData:{cs_id:csId},//传给后台的额外数据
                    buttonText:'上传图片',//上传按钮的文本内容
                    width:80,//图片上传按钮的宽度
                    height:'auto',//图片上传按钮的高度，auto后文字上下居中显示
                    buttonClass:'btn btn-success btn-sm',//图片上传按钮的样式
                    itemTemplate:'<span></span>',//图片上传进度条不显示
                    onUploadSuccess:function(a,b,c){//图片上传成功执行，用第二个参数b,一共三个参数
                        var obj=JSON.parse(b);
                        console.log(obj);
                        if(obj.code==200){
                            $('.preview img').attr('src',obj.result.path);
                        }
                    }
                })
            //   图片裁切插件实现

                    $('#cropBtn').click(function(){
                        var flagCrop=$(this).attr('data-flag');
                        if(flagCrop){//第二次点击保存图片
                        $('#cropForm').ajaxSubmit({
                            type:'post',
                            url:'/api/course/update/picture',
                            data:{cs_id:csId},
                            success:function(data){
                                console.log(data);
                                if(data.code==200){
                                    location.href='/course/lesson?cs_id='+data.result.cs_id;
                                }
                            }
                        });
                        }else{//第一次点击裁切图片
                            $(this).text('保存图片').attr('data-flag',true);
                            cropImage();
                        }
                    });



                    function cropImage(){
                        $('.thumb').html('');
                        $('.preview img').Jcrop({
                            aspectRatio:2,//选区的比例2:1
                            bgOpacity:0.3,//阴影的透明度
                            boxWidth:400//设置裁切时原图片的大小固定
                        },function(){//回调函数，启用缩略图预览效果
                            //销毁当前实例
                            nowCrop&&nowCrop.destroy();
                            nowCrop=this;
                            this.initComponent('Thumbnailer',{width:240,height:120,mythumb:'.thumb'});
                            //缩略图的大小，及显示缩略图的盒子类名为thumb
                            //原始图片的宽高
                            var width=this.ui.stage.width;
                            var height=this.ui.stage.height;
                            var w=width;
                            var h=height/2;
                            var x=0;
                            var y=(height-h)/2;
                            //根据图片宽高，确定选区的默认大小
                            this.newSelection();
                            this.setSelect([x,y,w,h]);
                            //    监控选区变化
                            $('.preview img').parent().on('cropstart cropmove cropend',function(e,s,c){
                                console.log(c);
                                //   用第三个参数，获取选区的坐标及大小，存储到隐藏表单域，并传到后台
                                var input=$('#cropForm input');
                                input.eq(0).val(c.x);
                                input.eq(1).val(c.y);
                                input.eq(2).val(c.w);
                                input.eq(3).val(c.h);
                                
                            })
                        })
                    }
            }
        }
    })
});