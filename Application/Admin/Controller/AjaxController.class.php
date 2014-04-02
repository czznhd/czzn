<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Admin\Controller;
use Think\Controller;
class AjaxController extends AdminController {
    public function index(){
		$this-show('非法操作');
	}
	
	public function findData(){
		 if (IS_AJAX){
		 	$table = $_POST['table'];
		 	$map['sort'] = $_POST['sort'];		 	
		 	if($table && $map['sort']){
		 		$data = M($table)->field('id,name')->where($map)->select();
				$this->ajaxReturn($data);
			}
		 }else{
		 	$this->error('非法请求');
		 }
		
	}

}