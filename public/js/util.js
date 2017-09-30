define(['jquery'],function($){
   return {
       qs:function(key){
           var search=location.search;
           var arr= search.substring(1).split('&');           
           var temp={};
           $.each(arr,function(i,item){
               var obj=item.split("=");
               if(obj[0]==key){
                   temp[obj[0]]=obj[1];
                   return false;
               }
           });
           return temp[key];
       },
       getMenu:function(path){
           $('.navs li a[href="'+path+'"]').addClass('active').closest('ul').show();
       }
   }
});