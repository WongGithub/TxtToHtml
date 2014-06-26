/**
 * Created by Wong on 2014/6/23.
 */

(function (D, W,$) {
    var TK = W.Toolkit,

        api={
           list:'/list/',
           txt:'/txt/'
        },

        coreFn = {
            getTxt:function(api,argument){
                TK.DAL.getdata({
                    url:api.txt+'?n='+encodeURIComponent(argument),
                    timeout:30,
                    dataType:'text',
                    success:function(data){
                        if(data){
                            var data = data;
                            data = data.replace(/\s{2}/g,'<br>&nbsp&nbsp&nbsp&nbsp');
                            $('.txt').html(data);
                        }
                    },
                    error:function(error){
                        console.log(error)
                    }
                });
            },
            getList:function(api){
                TK.DAL.getdata({
                    url:api.list,
                    timeout:30,
                    success:function(data){
                        if(data){
                            for(var i= 0,len=data.list.length;i<len;i++){
                                $('.txtlist').append('<li style="padding: 10px; background:#333; display: inline-block; margin: 10px;color:#fff;" data-name="'+
                                    data.list[i].replace('.txt','') +'">'+
                                    data.list[i].replace('.txt','') +'</li>');
                            }
                            $('.txtlist li').on('click',function(e){
                                var $this = $(e.target);

                                coreFn.getTxt(api,$this.data('name'));
                            })
                        }

                    },
                    error:function(error){
                        console.log(error)
                    }
                });
            }
        };
    $('.showlist').on('click',function(){
        $(this).remove();
        coreFn.getList(api);
    })
})(document, window,$);