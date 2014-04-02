<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;

class IndexController extends HomeController {
    public function index(){
    	$this->meat_title = C('WEB_TITLE');		
		$this->display();
    }
}