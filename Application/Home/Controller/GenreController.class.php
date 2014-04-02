<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;

/**
 * 前台专辑数据处理
 */
class GenreController extends HomeController {
    //获取音乐数据
    public function index(){
		$Genre =  M('Genre'); 
		$list=$this->lists('Songs');		
		$Genre = $Genre->getField('id,name');
		$title = '全部歌曲';	
		$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->title = $title;
    	$this->assign('list',$list);
    	$this->assign('genre',$Genre);   	
		$this->display();
    }
    
    public function type(){
		//数据中查询指定的ID记录
		$id = I('id'); 
		$Genre =  M('Genre'); 
		$map['genre_id']=$id;
		$list=$this->lists('Songs',$map);
		$Genre = $Genre->getField('id,name');	
		$title =  $Genre[$id];	
		$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->title = $title;
    	$this->assign('list',$list);
    	$this->assign('genre',$Genre);   	
		$this->display('index');
    }
  
}