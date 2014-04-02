<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Page;
/**
 * 前台排行数据处理
 */
class RanksController extends HomeController {
    //默认页面 试听排行
    public function index(){
    	$title = '试听排行榜';	
		//数据中查询指定的ID记录
		$order = 'hits desc';
		$list=$this->ranksLists($order);		
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->title = $title;
    	$this->assign('list',$list);
    	$this->assign('index',0);//仅仅只是为了css样式
		$this->display();
    }
  
  	//评分
    public function rater(){
    	$title = '评分排行榜';	
		//数据中查询指定的ID记录
		$order='rater desc';
		$list=$this->ranksLists($order);		
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('list',$list);
    	$this->assign('index',1);//仅仅只是为了css样式
		$this->display('index');
    }
    
    
    public function down(){
    	$title = '下载排行榜';	
		//数据中查询指定的ID记录
		$order='download desc';		
		$list=$this->ranksLists($order);
    	$this->title = $title;
    	$this->meat_title = $title.' - '.C('WEB_TITLE');
    	$this->assign('list',$list);
    	$this->assign('index',2);//仅仅只是为了css样式
		$this->display('index');
    }
    
    public function ranksLists( $order, $map=array() ,$field="" ){
		$model = M('Songs');
		$field = !is_null($field)? $field :'id,name,add_time,recommend';
		$map['status'] =1; 
		$count =  $model->where($map)->count();//获取总数
		$ranksTotal=C('RANKS_SONGS_TOTAL');
       	$somngsList=C('RANKS_SONGS_LIST_ROWS');
		$total = isset($ranksTotal) ? $ranksTotal : 100;
		$total =  $total>$count ?  $count:$total ;
		$listRows = isset($somngsList) ? $somngsList : 20;
		$page = new \Think\Page($total, $listRows);
        if($total>$listRows){
            $page->setConfig('theme','%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END% %HEADER%');
            $page->setConfig('prev', '上页');
        	$page->setConfig('next', '下页');
        }
        $p =$page->show();
        $this->assign('_page', $p? $p: '');
        $this->assign('_total',$total);
        $limit = $page->firstRow.','.$page->listRows;
		return $model->field($field)->where($map)->order($order)->limit($limit)->select();
	}
}