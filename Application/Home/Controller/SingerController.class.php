<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
/**
 * 前台专辑数据处理
 */
class SingerController extends HomeController {
    //获取音乐数据
    public function index(){
    	$title = '全部歌手';
		$list=$this->lists('Singer');
    	$this->assign('list', $list);
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
		$this->display();
    }
    
        //获取音乐数据
    public function type(){    	
    	$id = I('id');
    	$Singertype =  M('SingerType'); 
		//数据中查询指定的ID记录
		$type=$Singertype->where('id='.$id)->field('id,name')->find();
		//数据中查询指定的type ID的所有专辑记录
		$map['type_id']=$id;
    	$list=$this->lists('Singer',$map); 
    	$title = $type['name'];   	
    	$this->assign('type', $type);
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('list', $list);
		$this->display('index');
    }
    
    public function detail(){
    	$id = I('id');    	
    	$Singer =  M('Singer'); 
    	//数据中查询指定的ID记录
		$data=$Singer->where('id='.$id)->find();
		$Singer->where('id='.$id)->setInc('hits'); // 点击数加1
		//数据中查询指定的歌手 ID的所有歌曲记录
		$map['singer_id']=$id;
    	$list=$this->lists('Songs',$map);
    	$title = $data['name'];    	
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('data', $data);
    	$this->assign('list', $list);
		$this->display();
    }
}