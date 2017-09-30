define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
   util.getMenu('/course/add');
    var csId=util.qs('cs_id');
    var flag=util.qs('flag');

    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            // console.log(data);
            if(data.code==200) {
                if(flag){
                    data.result.operate='编辑课程';
                }else{
                    data.result.operate='添加课程';
                }
                var html = template('basicTpl', data.result);
                $('#basicInfo').html(html);
            //    渲染子级分类
                $("#top").change(function(){
                    var cgId=$(this).val();
                    $.ajax({
                        type:'get',
                        url:'/api/category/child',
                        dataType:'json',
                        data:{cg_id:cgId},
                        success:function(data){
                            // console.log(data);
                            var tpl='{{each result}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                           var html=template.render(tpl,data);
                            $('#child').html(html);
                        }
                    })
                });

            //    富文本
                CKEDITOR.replace('editor',{
                    toolbarGroups : [
                        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                        { name: 'colors', groups: [ 'colors' ] },
                        { name: 'about', groups: [ 'about' ] }]
                });

                //更新富文本内容，将iframe内容变成表单数据
                for(var instance in  CKEDITOR.instances){
                    CKEDITOR.instances[instance].updateElement();
                }

            //    保存
                $('#basicForm').validate({
                    sendForm:false,
                    valid:function() {
                        $(this).ajaxSubmit({
                          type:'post',
                            url:'/api/course/update/basic',
                            data:{cs_id:csId},
                            dataType:'json',
                            success:function(data){
                                // console.log(data);
                                if(data.code==200){
                                    location.href='/course/picture?cs_id='+csId;
                                }
                            }
                        })
                    }
                })
            }
        }
    })
});