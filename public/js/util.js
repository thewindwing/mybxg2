define(['jquery'],function($){
   return {
       qs:function(url){},
       getMenu:function(path){
           $('.navs li a[href="'+path+'"]').addClass('active').closest('ul').show();
       }
   }
});