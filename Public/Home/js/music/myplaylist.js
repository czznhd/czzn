	jQuery(document).ready(function ($) {
	$.ajax({ 
		type: "POST",
		url:JYMUSIC.APP+'?s=/Home/Music/getTopMusic.html',
		//data: {'id':songid},
		dataType:'json',
		success: function(data){
			var myPlaylist = [];
			if (data){
				for(var i=0; i<data.length; i++){
					if(data[i].singer_name == ''){data[i].singer_name="网络"}	
					var list = {
						mp3:data[i].music_url,
						title:data[i].name,
						artist:data[i].singer_name,
						rating:data[i].rater/2,
						buy:JYMUSIC.APP+'?s=/Music/down/id/'+data[i].id+'.html',
						price:'下载',
						cover:'http://media-cache-ec0.pinimg.com/originals/07/c0/f2/07c0f287ad143ce3dac6177b2fb76fcc.jpg'
					}
					myPlaylist.push(list);
				}			
				//alert(addlist);
				$('.music-player-list').ttwMusicPlayer(myPlaylist, {
					currencySymbol:'',
					buyText:'',
					tracksToShow:3,
					autoplay:true,
					ratingCallback:function(index, playlistItem, rating){
					//some logic to process the rating, perhaps through an ajax call
				},
					jPlayer:{
						swfPath:'http://www.jplayer.org/2.1.0/js'
					}
				});

				$.cookie('index_Play_status','play',{expires: 7, path: '/'});

			}	
		}
	});
	
	var checkPlay = setInterval(function(){
			var index_Play_status = $.cookie('index_Play_status');
			//alert(index_Play_status);
			if (index_Play_status == 'pause')	 $.jPlayer.pause();	
		}, 500);

});