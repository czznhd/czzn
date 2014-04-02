/*
	For Edit This File Please Read Documentation
*/

jQuery(document).ready(function ($) {	
	$.cookie('window_Play','1',{ path: '/'}); //标示播放窗口已开启
	var web_tiele=$('.player h4').text();
	/*歌曲连播处理*/	
	var loop_index = null, listenCookie;	
	var cssSelector = { jPlayer: "#jplayer", cssSelectorAncestor: "#play-box" };	
    var options = { 
    	playlistOptions: {
			autoPlay: true,
			enableRemoveControls:true
		},		
    	swfPath:"__JS__", 
    	supplied: "mp3" ,
		keyEnabled: true,
		ended: function () {if (loop_index != null) myPlaylist.play(loop_index) },
		loadstart:function (e) {//开始加载时调用函数
			var media =e.jPlayer.status.media;
			$('.play-title').text(media.title);	
			document.title=media.title+'-'+web_tiele;			
		},
		pause:function () {
			$.cookie('index_Play_status','play',{ path:'/'});	
		},
		play:function () {
			$.cookie('index_Play_status','pause',{ path:'/'});	
		}
	};
	var myPlaylist = new jPlayerPlaylist(cssSelector, Array, options);//实例化jplayerlist
	var oldIds = $.cookie('old_list');	
	if (oldIds) setPlayList (oldIds,'Initialize');
	function setPlayList (oldIds,type,index) {		
		$.post(JYMUSIC.APP+"/Music/getlistData.html", {"id": oldIds},function(data){;
			if(data){
				//alert(data);
				for(var i=0; i<data.length; i++){
					if(data[i].singer_name == ''){data[i].singer_name="网络"}	
					var list = {
						title:data[i].name,
						artist:data[i].singer_name,
						id:data[i].id,
						mp3:data[i].music_url,							
					}				
					myPlaylist.add(list);					
				}				
			}
			//列表处理类型		
			if ('Initialize'  == type){
				myPlaylist.play(0);
			}else if('play' == type){
				myPlaylist.play(-index);
			}
   		}, "json");  		
   	}
   	
   	function cookie_list(){
		var newIds = $.cookie('new_list');
			oldIds = $.cookie('old_list');	
		var list_type = $.cookie('list_type');
		if (newIds && list_type){
			if (!oldIds){
				$.cookie('old_list',newIds,{expires: 30, path: '/'});	
			}else{
				$.cookie('old_list',newIds+','+oldIds,{expires: 30, path: '/'});	
			}					
						
			if ('add' == list_type){
				setPlayList (newIds,'add');
			}else if ('play' == list_type){
				var index = newIds.split(',').length;
				setPlayList (newIds,'play',index);				
			}	
			$.cookie('new_list',null,{ path: '/'});		
		}	
	}
	
	setInterval(function () {cookie_list()}, 500);//列表变化处理
	/*事件委派*/
	//选取事件
   	$(document).on('click', ".ez-checkbox",function () {
		$(this).toggleClass("ez-checked");
	});
	//删除事件
	$(document).on('click','.jyplay-del',function () {
	 	var self = $(this);
	 	 	index = self.parent().parent().index(),
	 		id = self.siblings('.ez-checkbox').attr('sid'),
	 		arr = $.cookie('old_list').split(',');
	 		arr = arr.remove(id);
	 	$.cookie('old_list',arr,{expires: 7, path: '/'});
	 	myPlaylist.remove(index);
	})
	//下载事件
	$(document).on('click','.jyplay-down',function () {

	 	
	})

	/*音乐控制*/
	//列表重复
	$('.jy-repeat-one').click(function () {
		$(this).hide();
		$('.repeat-one-off').show();
		loop_index = null;
	});
	
	//单曲重复
	$('.repeat-one-off').click(function () {
		$(this).hide();
		$('.jy-repeat-one').show();
		loop_index = myPlaylist.current;
		
	});	
});

Array.prototype.remove = function(val) {
	var index = $.inArray(val,this);
	if (index > -1) {
		this.splice(index, 1);
	}
	return this;
};

