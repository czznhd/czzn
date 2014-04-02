jQuery(window).load(function() {	
	jQuery(document).find('.loadingtt').fadeOut('normal', 'easeInOutExpo',function(){
		jQuery(document).find('.loadingtt').remove();
	});
});
jQuery(document).ready(function ($) {
	checkLogin();//检测登录
	jQuery.browser={};(function(){jQuery.browser.msie=false;
	jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
	jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	// $('body').append('<script type="text/javascript" src="customize/script.js"></script>');

	// Loading
	$('body.loading_page').prepend('<div class="loadingtt"><img src="'+JYMUSIC.PUBLIC+'/Home/images/loading.gif" /></div>');
	jQuery('.loadingtt img').css({
		top:'45%',
		opacity:1
	});
	// 超级类 
	if ($(".sf-menu")[0]) {
		$('.sf-menu').superfish({
			delay: 100,
			animation: {
				opacity: 'show', height: 'show'
			},
			speed: 300,
			autoArrows: true
		}).lavaLamp({
			fx: "easeOutExpo", 
			speed: 600,
			setOnClick: false,
			click: function(event, menuItem) {
				return true;
			}
		});
		$('a.sf-with-ul .sub').before('<span class="sf-sub-indicator"><i class="icon-angle-down"></i></span>');
	}

	// 漂亮的 滚动条控件
		$('body').prepend('<div id="div1"></div>');
		var nice = $("html").niceScroll({zindex:1000000,cursorborder:"0px solid #ccc",cursorborderradius:"2px",cursorcolor:"#ddd",cursoropacitymin:.1}); 
		$("#div1").html($("#div1").html());
		$('[class^="scroll-"], [class*=" scroll-"]').niceScroll({zindex:1000000,cursorborder:"",cursorborderradius:"2px",cursorcolor:"#121212",scrollspeed:100,cursoropacitymin:.4}); 

	// Tabs
	var tabs = jQuery('ul.tabs');
	tabs.each(function (i) {
		// 获得 tabs
		var tab = jQuery(this).find('> li > a');
		tab.click(function (e) {
			// 获得 tab's 位置
			var contentLocation = jQuery(this).attr('href');
			// 如果不是一个散列
			if (contentLocation.charAt(0) === "#") {
				e.preventDefault();
				// 增加类 active
				tab.removeClass('active');
				jQuery(this).addClass('active');
				// 显示选项卡内容 & 增加类 class
				jQuery(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');
			}
		});
	});
	// 手风琴
	jQuery("ul.tt-accordion li").each(function () {
		jQuery(this).children(".accordion-content").css('height', function () {
			return jQuery(this).height();
		});
		if (jQuery(this).index() > 0) {
			jQuery(this).children(".accordion-content").css('display', 'none');
		} else {
			jQuery(this).addClass('active').find(".accordion-head-sign").append("<i class='icon-angle-up'></i>");
			jQuery(this).siblings("li").find(".accordion-head-sign").append("<i class='icon-angle-down'></i>");
		}
		jQuery(this).children(".accordion-head").bind("click", function () {
			jQuery(this).parent().addClass(function () {
				if (jQuery(this).hasClass("active")) {
					return;
				} {
					return "active";
				}
			});
			jQuery(this).siblings(".accordion-content").slideDown();
			jQuery(this).parent().find(".accordion-head-sign i").addClass("icon-angle-up").removeClass("icon-angle-down");
			jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
			jQuery(this).parent().siblings("li").removeClass("active");
			jQuery(this).parent().siblings("li").find(".accordion-head-sign i").removeClass("icon-angle-up").addClass("icon-angle-down");
		});
	});
	// 切换
	jQuery("ul.tt-toggle li").each(function () {
		jQuery(this).children(".toggle-content").css('height', function () {
			return jQuery(this).height();
		});
		jQuery(this).children(".toggle-content").css('display', 'none');
		jQuery(this).find(".toggle-head-sign").html("&#43;");
		jQuery(this).children(".toggle-head").bind("click", function () {
			if (jQuery(this).parent().hasClass("active")) {
				jQuery(this).parent().removeClass("active");
			} else {
				jQuery(this).parent().addClass("active");
			}
			jQuery(this).find(".toggle-head-sign").html(function () {
				if (jQuery(this).parent().parent().hasClass("active")) {
					return "&minus;";
				} else {
					return "&#43;";
				}
			});
			jQuery(this).siblings(".toggle-content").slideToggle();
		});
	});
	jQuery("ul.tt-toggle").find(".toggle-content.active").siblings(".toggle-head").trigger('click');
	// 4Mob
	$(".headdown nav").before('<div id="mobilepro"><i class="icon-reorder icon-remove"></i></div>');
	$(".headdown .sf-menu li").addClass('xpopdrop');
	$('#mobilepro').click(function () {
		$('.headdown .sf-menu').slideToggle('slow', 'easeInOutExpo').toggleClass("xactive");
		$("#mobilepro i").toggleClass("icon-reorder");
	});
	$("body").click(function() {
		$('.headdown .xactive').slideUp('slow', 'easeInOutExpo').removeClass("xactive");
		$("#mobilepro i").addClass("icon-reorder");
	});
	$('#mobilepro, .sf-menu').click(function(e) {
		e.stopPropagation();
	});
	function checkWindowSize() {
		if ($(window).width() > 768) {
			$('.headdown .sf-menu').css('display', 'block').removeClass("xactive");
		} else {
			$('.headdown .sf-menu').css('display', 'none');
		}
	}
	$(window).load(checkWindowSize);
	$(window).resize(checkWindowSize);
	// 返回顶部
	jQuery('#toTop').click(function () {
		jQuery('body,html').animate({
			scrollTop: 0
		}, 800);
	});
	jQuery("#toTop").addClass("hidett");
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() < 600) {
			jQuery("#toTop").addClass("hidett").removeClass("showtt");
		} else {
			jQuery("#toTop").removeClass("hidett").addClass("showtt");
		}
	});
	// 通知
	$(".notification-close-info").click(function () {
		$(".notification-box-info").fadeOut("slow");
		return false;
	});
	$(".notification-close-success").click(function () {
		$(".notification-box-success").fadeOut("slow");
		return false;
	});
	$(".notification-close-warning").click(function () {
		$(".notification-box-warning").fadeOut("slow");
		return false;
	});
	$(".notification-close-error").click(function () {
		$(".notification-box-error").fadeOut("slow");
		return false;
	});
	if ($(".notification-box")[0]) {
		var $thisdivf = $('.notification-box .onebyone');
		$thisdivf.css('opacity', '0');
		var delay = 0;
		$thisdivf.each(function () {
			var $i = $(this);
			setTimeout(function () {
				$i.addClass('notif-anim').css('opacity', '1');
			}, delay += 300);
		});
		thisdivf_flag = true;
	}
	// 滚动条
	if ($(".mtracks")[0]) {
		$('.mtracks').nanoScroller();
	}
	// 收缩滑动条
	if ($(".postslider")[0]) {
		jQuery('.postslider').flexslider();
	}
	if ($(".videos")[0]) {
		jQuery('.videos').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			animationSpeed: 600,
			directionNav: true,
			controlNav: false,
			pauseOnHover: true,
			initDelay: 0,
			randomize: false,
			smoothHeight: true,
			keyboardNav: true
		});
	}
	// jCarousel
	if ($(".videos-carousel")[0]) {
		jQuery(".videos-carousel").jCarouselLite({
			btnNext: ".nexte",
			btnPrev: ".preve",
			easing: "easeInOutExpo",
			visible: 4,
			scroll: 1,
			hoverPause: true,
			auto: 2000,
			speed: 800
		});
	}
	if ($(".mp3-carousel")[0]) {
		jQuery(".mp3-carousel").jCarouselLite({
			btnNext: ".nexte",
			btnPrev: ".preve",
			easing: "easeInOutExpo",
			visible: 4,
			scroll: 1,
			hoverPause: true,
			auto: 2000,
			speed: 800
		});
	}
	// 曲折回旋的
	if ($(".roundabout")[0]) {
		$('.roundabout ul').roundabout({
			duration: 500,
			easing: 'easeOutBack',
			enableDrag: true
		});
		$(window).bind("resize", RoundLayout);
		function RoundLayout( e ) {
			var widthround = $('#layout').width();
			$('.roundabout').css('width', widthround + 'px');
		}
	}

	if ($(".progress-bar")[0]) {
		$(".progress-bar > span").each(function () {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1800);
		});
	}
	// 弹出登录
	var popupStatus = 0;
	$("#Login_PopUp_Link").click(function() {
		//调整登录框在中间
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $("#popupLogin").height();
		var popupWidth = $("#popupLogin").width();
		// 置于中心
		$("#popupLogin").css({
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});
		// 对齐 
		$("#LoginBackgroundPopup").css({"height": windowHeight});
	
		// 弹出div和Bg
		if (popupStatus == 0) {
			$("#LoginBackgroundPopup").css({"opacity": "0.7"});
			$("#LoginBackgroundPopup").fadeIn("slow");
			$("#popupLogin").addClass('zigmaIn').fadeIn("slow");
			popupStatus = 1;
		}
	});
	// 关闭弹出
	$("#popupLoginClose").click(function() {
		if (popupStatus == 1) {
			$("#LoginBackgroundPopup").fadeOut("slow");
			$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
			popupStatus = 0;
		}
	});
	$("body").click(function() {
		$("#LoginBackgroundPopup").fadeOut("slow");
		$("#popupLogin").removeClass('zigmaIn').fadeOut("slow");
		popupStatus = 0;
	});
	$('#popupLogin, #Login_PopUp_Link').click(function(e) {
		e.stopPropagation();
	});
	// Masonry
	if ($("#masonry-container")[0]) {
		var $masonrytt = $('#masonry-container');
		$masonrytt.imagesLoaded( function(){
			$masonrytt.masonry({
				itemSelector: '.mitem',
				isAnimated: true,
				columnWidth: 1
			});
		});
	}
	// 鼠标悬停效果
	if (!(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 6)) {
		jQuery('.hover-fx').each(function () {
			var overImg = jQuery(this).find('.overlay');
			jQuery(this).hover(function () {
				overImg.stop().fadeIn();
				$(this).removeClass('flipOutX');
			}, function () {
				overImg.stop().fadeOut('fast');
				$(this).addClass('flipOutX');
			});
		});
	}

	// quicksand
	if ($(".filter")[0]) {
		var $portfolioClone = $(".portfolio").clone();
		$(".filter a").click(function (e) {
			$(".filter li").removeClass("current");
			var $filterClass = $(this).parent().attr("class");
			if ($filterClass === "all") {
				var $filteredPortfolio = $portfolioClone.find("li");
			} else {
				var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
			}
			// Call quicksand
			$(".portfolio").quicksand($filteredPortfolio, {
				duration: 600,
				easing: 'easeOutExpo',
				adjustHeight: 'dynamic'
			}, function () {
				$(".portfolio a[data-gal^='photo']").prettyPhoto({
					theme: 'facebook',
					autoplay_slideshow: false,
					overlay_gallery: false,
					show_title: false
				});
				if (!(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 6)) {
					jQuery('.hover-fx').each(function () {
						var overImg = jQuery(this).find('.overlay');
						jQuery(this).hover(function () {
							overImg.stop().fadeIn();
							$(this).removeClass('flipOutX');
						}, function () {
							overImg.stop().fadeOut('fast');
							$(this).addClass('flipOutX');
						});
					});
				}
			});
			$(this).parent().addClass("current");
			e.preventDefault();
		});
	}
	// Tipsy
	$('.toptip').tipsy({
		fade: true,
		gravity: 's'
	});
	$('.bottomtip').tipsy({
		fade: true,
		gravity: 'n'
	});
	$('.righttip').tipsy({
		fade: true,
		gravity: 'w'
	});
	$('.lefttip').tipsy({
		fade: true,
		gravity: 'e'
	});
	// Theme20 Custom
	jQuery('.animt').each(function () {
		var $curr = jQuery(this);
		var $currOffset = $curr.attr('data-gen-offset');
		if ($currOffset === '' || $currOffset === 'undefined' || $currOffset === undefined) {
			$currOffset = 'bottom-in-view';
		}
		$curr.waypoint(function () {
			$curr.trigger('animt');
		}, {
			triggerOnce: true,
			offset: $currOffset
		});
	});
	jQuery('.animtt').each(function () {
		var $curr = jQuery(this);
		$curr.bind('animt', function () {
			$curr.css('opacity', '');
			$curr.addClass($curr.data('gen'));
		});
	});
	jQuery('.animtt').each(function () {
		var $curr = jQuery(this);
		var $currOffset = $curr.attr('data-gen-offset');
		if ($currOffset === '' || $currOffset === 'undefined' || $currOffset === undefined) {
			$currOffset = 'bottom-in-view';
		}
		$curr.waypoint(function () {
			$curr.trigger('animt');
		}, {
			triggerOnce: true,
			offset: $currOffset
		});
	});
	// Sticky
	if ($(".glue")[0]){
		$(window).scroll(function(){
			var wind_scr = $(window).scrollTop();
			var window_width = $(window).width();
			if (window_width > 768) {
				if(wind_scr < 200){
					if($('#header').data('sticky') === true){
						$('#header').data('sticky', false);
						$('#header').stop(true).animate({opacity : 0}, 150, function(){
							$(this).removeClass('sticky');
							$('#header').stop(true).animate({opacity : 1}, 300);
						});
					}
				} else {
					if($('#header').data('sticky') === false || typeof $('#header').data('sticky') === 'undefined'){
						$('#header').data('sticky', true);
						$('#header').stop(true).animate({opacity : 0},150,function(){
							$(this).addClass('sticky');
							$('#header.sticky').stop(true).animate({opacity : 1}, 300);
						});
					}
				}
			}
		});
		$(window).resize(function(){
			var window_width = $(window).width();
			if (window_width < 768) {
				if($('#header').hasClass('sticky')){
					$('#header').removeClass('sticky');
				}
			}
		});
	}

	//全选反选
	$( "#selAll").click(function () {   
            $(".ez-checkbox").toggleClass('ez-checked');   
            return false;        
     })
     
     //验证码切换
     var verifyimg = $(".verifyimg").attr("src");
     $(".reloadverify").click(function(){
     	if( verifyimg.indexOf('?')>0){
     		$(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
     	}else{
     		$(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
     	}
     });
     //表单提交
     $(".ajax-form").submit(function(){
    	var self = $(this);
    	$.post(self.attr("action"), self.serialize(), success, "json");
    	return false;

    	function success(data){
    		if(data.status){
    			window.location.href = data.url;
    		} else {
    			self.find(".submit-info").html('<strong style="color:#F00">'+data.info+'</strong>');
    			//刷新验证码
    			$(".reloadverify").click();
    		}
    	}
    });
    $('input[type="checkbox"]').ezMark(); //input美化
    //添加到连播列表
	$('#addPlayList').click(function () {	
		var ids = [];
		var url = $(this).attr('url');
		var input = $('.ez-checked input');
		if (input.size()){ //判断选中是否为空
			input.each(function(){
		  		ids.push($(this).val());		  		
			});
			setCookieList ('add',ids,url) ;
		} else {
			jyAlert(false,'请至少选中一个');
		}
		
		return false;
	})
	//批量播放所选
	$('#palySelect').click(function () {
		var ids = [];
		var url = $(this).attr('url');
		var input = $('.ez-checked input');
		if (input.size()){ //判断选中是否为空
			input.each(function(){
		  		ids.push($(this).val());
			});
			setCookieList ('play',ids,url) ;
		} else {
			jyAlert(false,'请至少选中一个');
		}
		
		return false;
	})
	
	//添加到收藏夹
	$('.fav').click(function () {
		var dataId = $(this).attr('data-id');
		addfav(dataId);
    	return false;
	})
	
});	
function checkLogin () {	
		$.post(JYMUSIC.APP+"?s=/Member/ajaxIslogin.html", 
		function (data){
    		if(data.status) {
    			jQuery('#Login_PopUp_Link').hide();
    			jQuery('#user-info').show().find('#user-name').prepend(data.username);    			 			
    		}
  		}, "json");   	   	
	}

//设置列表
function setCookieList (type,ids,url) {
	var oldIds = $.cookie('old_list');//获取历史记录
	var window_Play=$.cookie('window_Play');
	if('0' == window_Play || !window_Play ){			
		list_Play = window.open(url);				
		list_Play.focus();
	}			
	if (!oldIds){
		$.cookie('old_list',ids,{expires: 7, path: '/'});							 			
	}else{		
		var oldarr = oldIds.split(',');	
		var newIds= [];
		for (i = 0; i < ids.length; i++) {//去除重复值
			 if (-1 == $.inArray(ids[i], oldarr)) newIds.push(ids[i]);
		}
		if (newIds.length == 0) {
			jyAlert(false,'已存在列表');  return false;
		}else{
			var strIds;
			if(newIds.length == 1){
				strIds = newIds['0'];
			}else{
				strIds = newIds.join(',');
			}			
			$.cookie('new_list',strIds,{ path: '/'});
			jyAlert(true,'添加成功！');
		}
	}
	
	if ('play' == type){
		$.cookie('list_type','play',{ path: '/'});
	}else if ('add' == type){
		$.cookie('list_type','add',{ path: '/'});
	}
}

function addfav(dataId) {
	$.post(JYMUSIC.APP+"/Music/addFav.html",{"id": dataId}, success, "json");   	
    function success(data){
    	if(data.status == -1){ 
    		$("#Login_PopUp_Link").click();
    		return false;
    	} else if(data.status == 1){
    		jyAlert(true,'收藏成功');
    	}
   	}   	    	  	
}

//弹出消息
function jyAlert (type,info) {
	if ( false == type){
		var obj = $('.notification-box-error');
		var html = '<i class="icon-remove-sign"></i>'+info;
		obj.find('p').html(html);
		obj.removeClass('hidden').fadeIn("slow");
		setTimeout(function(){
		obj.fadeOut("slow");	
		},1500);
	}else if (true == type){
		var obj = $('.notification-box-success');
		var html = '<i class="icon-ok"></i>'+info;
		obj.find('p').html(html);
		obj.removeClass('hidden').fadeIn("slow");
		setTimeout(function(){
		obj.fadeOut("slow");	
		},1500);	
	}	
}
/* jQuery Waypoints - Copyright (c) 2011-2013 Caleb Troughton - https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt */
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
/*设置cookie的键值对  $.cookie(’name’, ‘value’);设置cookie的键值对，有效期，路径，域，安全；$.cookie(’name,‘value’,{expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});读取cookie的值  var account= $.cookie(’name’); 删除一个cookie  $.cookie(’name’, null); **/
(function($,document,undefined){var pluses=/\+/g;function raw(s){return s;}function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}$.cookie=function(key,value,options){if(value!==undefined&&!/Object/.test(Object.prototype.toString.call(value))){options=$.extend({},$.cookie.defaults,options);if(value===null){options.expires=-1;}if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}options=value||$.cookie.defaults||{};var decode=options.raw?raw:decoded;var cookies=document.cookie.split('; ');for(var i=0,parts;(parts=cookies[i]&&cookies[i].split('='));i++){if(decode(parts.shift())===key){return decode(parts.join('='));}}return null;};$.cookie.defaults={};$.removeCookie=function(key,options){if($.cookie(key,options)!==null){$.cookie(key,null,options);return true;}return false;};})(jQuery,document); 
/* ezMark - A Simple Checkbox and Radio button Styling plugin.  @author Abdullah Rubiyath @version 1.0 @date June 27, 2010*/
(function($){$.fn.ezMark=function(options){options=options||{};var defaultOpt={checkboxCls:options.checkboxCls||'ez-checkbox',radioCls:options.radioCls||'ez-radio',checkedCls:options.checkedCls||'ez-checked',selectedCls:options.selectedCls||'ez-selected',hideCls:'ez-hide'};return this.each(function(){var $this=$(this);var wrapTag=$this.attr('type')=='checkbox'?'<div class="'+defaultOpt.checkboxCls+'">':'<div class="'+defaultOpt.radioCls+'">';if($this.attr('type')=='checkbox'){$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function(){if($(this).is(':checked')){$(this).parent().addClass(defaultOpt.checkedCls);}
else{$(this).parent().removeClass(defaultOpt.checkedCls);}});if($this.is(':checked')){$this.parent().addClass(defaultOpt.checkedCls);}}
else if($this.attr('type')=='radio'){$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function(){$('input[name="'+$(this).attr('name')+'"]').each(function(){if($(this).is(':checked')){$(this).parent().addClass(defaultOpt.selectedCls);}else{$(this).parent().removeClass(defaultOpt.selectedCls);}});});if($this.is(':checked')){$this.parent().addClass(defaultOpt.selectedCls);}}});}})(jQuery);
