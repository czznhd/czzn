<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
/**
 * 前台音乐数据处理
 */
class PlayController extends HomeController {
    //获取音乐数据
    public function index(){
    	$id=I('id');		
		$Songs =  M('Songs'); 
		//数据中查询指定的ID记录
		$music=$Songs->where('id='.$id)->field('up_name,up_id,description,music_down',true)->find();
		$music['singer_url'] = U('Singer/'.$music['singer_id']);//设置所属歌手url
		$music['album_url'] = U('Album/'.$music['album_id']);//设置所属专辑url
		$music['genre_url'] = U('Genre/'.$music['genre_id']);//设置所属曲风url
		$music['down_url'] = U('Music/down?id='.$id); //设置下载地址
		$this->assign('m',$music);
		$title = $music['name'];
		$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
		$this->display();
    }
    
        //获取音乐数据
    public function box(){
		$title = '连播页面';
		$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
		$this->display();
    }
}