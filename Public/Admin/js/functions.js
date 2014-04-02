$(document).ready(function(){	
	$('tbody tr:even').addClass("alt-row"); //隔行换色

	//全选的实现
	$(".check-all").click(function(){
		$(".ids").prop("checked", this.checked);
	});
	$(".ids").click(function(){
		var option = $(".ids");
		option.each(function(i){
			if(!this.checked){
				$(".check-all").prop("checked", false);
				return false;
			}else{
				$(".check-all").prop("checked", true);
			}
		});
	});
	//全选的实现
	$(".check-all").click(function(){
		$(".ids").prop("checked", this.checked);
	});
	$(".ids").click(function(){
		var option = $(".ids");
		option.each(function(i){
			if(!this.checked){
				$(".check-all").prop("checked", false);
				return false;
			}else{
				$(".check-all").prop("checked", true);
			}
		});
	});


	/* 头部管理员菜单 */
	$(".user-nav").mouseenter(function(){
    	var userMenu = $(this).children(".dropdown-menu ");
    	userMenu.removeClass("hidden");
    	clearTimeout(userMenu.data("timeout"));
	}).mouseleave(function(){
    	var userMenu = $(this).children(".dropdown-menu");
    	userMenu.data("timeout") && clearTimeout(userMenu.data("timeout"));
    	userMenu.data("timeout", setTimeout(function(){userMenu.addClass("hidden")}, 100));
	});

	/*tab切换*/
	$(".tabbable ul li").click(function () {
		var self = $(this), index =$(this).index();
		self.addClass("active").siblings(".active").removeClass("active");
		$(".tab-content").find(".active").removeClass("active");
		$(".tab-pane").eq(index).addClass("active");
	})

	$(".sub-menu").find('a:first').click(function () {
		var icon = $(this).find("i");
		var mainMenu = $(this).next(".subMenu");
		$(this).toggleClass("active");
		icon.toggleClass("open");
		mainMenu.toggle();
	})

	/*ajax查询歌手,专辑*/

	/**
	+-----------------------
	* 歌手，专辑查询
	+------------------------
	**/

	$('#find-singer , #find-album').click(function () {
		$(this).next().show().html(makeSort(''));
	});


	$('.sort').change(function () {
		var sel=$(this);
		var str = sel.attr('reg');//获取查询那个数据。singer，Album
		var val = sel.val();
		sel.nextAll('.find-load').show();
		$.ajax({
			type:"post",
			url:findUrl,
			data:"sort="+val+"&table="+str,
			dataType: "json",			
			success:function (data) {
					if (data != null){ 
						var con ="<option>请选择</option>";
						$.each(data,function(i){
							con+='<option  value="'+data[i]["id"]+'">'+data[i]["name"]+'</option>';
						});
					} else {
							con="<option>暂无数据</option>";
					}
					sel.nextAll('.find-load').hide();
					sel.next().html(con).show();
			},
			error: function(){
					//showMsg('请求失败！','error',2);	
				}
		});
	});
	//查询到的歌手数据动态添加到表单
	$('#singer-list').change(function () {
		var sname = $(this).find('option:selected').html();
		var val = $(this).val();
		$("input[name='singer_name']").val(sname);
		$("input[name='singer_id']").val(val);
	});

	//查询到的专辑数据动态添加到表单
	$('#album-list').change(function () {
		var sname = $(this).find('option:selected').html();
		var val = $(this).val();
		$("input[name='album_name']").val(sname);
		$("input[name='album_id']").val(val);
	});


    //ajax get请求
    $('.ajax-get').click(function(){
        var target;
        var that = this;
        if ( $(this).hasClass('confirm') ) {
            if(!confirm('确认要执行该操作吗?')){
                return false;
            }
        }
        if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
            $.get(target).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        topAlert(data.info + ' 页面即将自动跳转~','alert-success');
                    }else{
                        topAlert(data.info,'alert-success');
                    }
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    topAlert(data.info);
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                        }
                    },1500);
                }
            });

        }
        return false;
    });

    //ajax post submit请求
    $('.ajax-post').click(function(){
        var target,query,form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm=false;
        if( ($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
            form = $('.'+target_form);

            if ($(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能
            	form = $('.hide-data');
            	query = form.serialize();
            }else if (form.get(0)==undefined){
            	return false;
            }else if ( form.get(0).nodeName=='FORM' ){
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                if($(this).attr('url') !== undefined){
                	target = $(this).attr('url');
                }else{
                	target = form.get(0).action;
                }
                query = form.serialize();
                
            }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {
             	if(!form.is(':checked')){            		
					topAlert('请选择你要操作的数据！');
					return false;
             	} else if(form.is(':checked') ){ 
                    nead_confirm = true;                                             
            	}
                if ( nead_confirm && $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.serialize();
            }else{
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
            $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
            $.post(target,query).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        topAlert(data.info + ' 页面即将自动跳转~','alert-success');
                    }else{
                        topAlert(data.info ,'alert-success');
                    }
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    topAlert(data.info);
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        }
                    },1500);
                }
            });
        }
        return false;
    });


/**顶部警告栏*/
	var content = $('#main');
	var top_alert = $('#info-alert');
	top_alert.find('.close').on('click', function () {
		top_alert.removeClass('block').slideUp(200);
		// content.animate({paddingTop:'-=55'},200);
	});
	var closeAlert;
    window.topAlert = function (text,c) {
		clearInterval(closeAlert);
		text = text||'default';
		c = c||false;
		if ( text!='default' ) {
            top_alert.find('.alert-content').text(text);
			if (top_alert.hasClass('block')) {
			} else {
				top_alert.addClass('block').slideDown(200);
				// content.animate({paddingTop:'+=55'},200);
			}
		} else {
			if (top_alert.hasClass('block')) {
				top_alert.removeClass('block').slideUp(200);
				// content.animate({paddingTop:'-=55'},200);
			}
		}
		if ( c!=false ) {
            top_alert.removeClass('alert-error alert-warn alert-info alert-success').addClass(c);
		}

		closeAlert = setInterval(function (){top_alert.removeClass('block').slideUp(200)}, 1500);
	};
		
	/*添加表单值*/
	$('select').change(function () {
		var sel = $(this);
		var val = $.trim(sel.find("option:selected").html());
		sel.prev('input').val(val);
	});
	
	/*开关切换*/
	$(".switch-enable").click(function(){
   		var parent = $(this).parent('.switch-wrapper');
       	$('.switch-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        parent.prev('input').val('1');   
   	});
	$(".switch-disable").click(function(){
        var parent = $(this).parents('.switch-wrapper');
        $('.switch-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        parent.prev('input').val('0'); 
 	});		
});


//设置对应表单的字母下拉列表
function makeSort () {
	var letters ='<option>索引字母</option>';
	for(var i=0;i<26;i++){
		var sort= String.fromCharCode((65+i));
		letters+= "<option value="+sort+">"+sort+"</option>";
		}
	return letters;
}

/*查看图片*/
function showImg(objId){
	var src = $(objId).val();
	TINY.box.show({image:src,boxid:'frameless',autohide:3,animate:true})
	
}

