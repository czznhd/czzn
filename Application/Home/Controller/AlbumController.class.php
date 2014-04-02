<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
/**
 * 前台专辑数据处理
 */
class AlbumController extends HomeController {
    //获取音乐数据
    public function index(){
    	$title= '全部专辑';
		//数据中查询记录
		$list=$this->lists('Album');
		//dump($list);	
    	$this->assign('list', $list);    	
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
		$this->display();
    }
    
        //获取音乐数据
    public function type(){
    	$id = I('id');
    	$Albumtype =  M('AlbumType'); 
		//数据中查询指定的ID记录
		$type=$Albumtype->where('id='.$id)->field('id,name')->find();
		//数据中查询指定的type ID的所有专辑记录
		$map['type_id'] =  $id;
    	$list=$this->lists('Album',$map);
    	$title = $type['name'];
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('type', $type);
    	$this->assign('list', $list);
		$this->display('index');
    }
    
    public function detail(){
    	$id = I('id');
    	$Album =  M('Album'); 
    	//数据中查询指定的ID记录
		$data=$Album->where('id='.$id)->find();
		$Album->where('id='.$id)->setInc('hits'); // 点击数加1
		//数据中查询指定的专辑 ID的所有歌曲记录
    	$map['album_id'] =  $id;
    	$list=$this->lists('Songs',$map);    	
    	$title = $data['name'];
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('data', $data);
    	$this->assign('list', $list);
		$this->display();
    }
}