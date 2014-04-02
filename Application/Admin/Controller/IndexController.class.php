<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Admin\Controller;
use Think\Controller;
class IndexController extends AdminController {
    public function index(){
    	$count=array();
    	$count['songs']  =  M('Songs')->count();//获取歌曲总数
    	$count['album']  =  M('Album')->count();//获取专辑总数
    	$count['singer'] = M('Singer')->count();//获取歌手总数
    	$count['genre']  =  M('Genre')->count();//获取曲风总数
    	$count['user']  =  M('Member')->count();//获取曲风总数
		$this->assign('count',$count);
		$this->display();
	}
}