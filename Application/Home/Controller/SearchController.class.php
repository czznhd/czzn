<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
class SearchController extends HomeController {
    public function index(){	   	    		   	
    	$key      =   trim(I('get.key'));    	
    	if ($key){
    		$map['name'] = array('like',"%{$key}%");
    		$list=$this->lists('Songs',$map);
    		$this->assign('list', $list);
    	}   	
    	$title = '搜索:'.$key;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->title = $title;
    	$this->assign('key',$key);
    	$this->display();
    }
}