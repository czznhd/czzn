<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
/**
 * 前台公共控制器
 * 为防止多分组Controller名称冲突，公共Controller名称统一使用分组名称
 */
class HomeController extends Controller {
	/* 空操作，用于输出404页面 */
	public function _empty(){
		$this->redirect('Index/index');
	}


    protected function _initialize(){   	
    	/* 读取数据库中的配置 */
        $config =   S('DB_CONFIG_DATA');        
        if(!$config){
            $config =   api('Config/lists');
        }
        C($config); //添加配置 
        /* 读取站点配置 */
        if(!C('WEB_SWITCH')){
            $this->error(C('WEB_OFF_MSG'));
        }
        
        //dump(C('HTML_CACHE_ON'));
        // 是否是超级管理员
        define('IS_ROOT',   is_administrator());
        if(!IS_ROOT && C('HOME_ALLOW_IP')){
            // 检查IP地址访问
            if(!in_array(get_client_ip(),explode(',',C('HOME_ALLOW_IP')))){
                $this->error('403:禁止访问');
            }
        }              
                   
    }
        

	/* 用户登录检测 */
	protected function login(){
		/* 用户登录检测 */
		is_login() || $this->error('您还没有登录，请先登录！', U('User/login'));
	}
	
		/**
     * 前台音乐数据通用分页列表数据集获取方法
     * @return array|false
     * 返回数据集
     */
    protected function lists ($model,$where=array(), $order="",$field="", $status = 1){
    	//dump();
        if(is_string($model)){
        	$model = ucfirst($model);
        	//设置分页显示条数
        	$songsList=C('SONGS_LIST_ROWS');
        	$albumList=C('ALBUM_LIST_ROWS');
        	$singerList=C('SINGER_LIST_ROWS');
        	if('Songs' == $model ){
            	$listRows = isset($songsList) ? $songsList : 20;
            	$field = is_null($field)? $field:'music_url,lrc_url,music_down,description,status,index_status,order_id';
            	$where['status']= $status; 
        	}elseif('Album' == $model){
            	$listRows = isset($albumList) ? $albumList : 15;
            	$field = is_null($field)? $field:'company,description,sort,pub_time';
        	}elseif('Singer' == $model){
        		$listRows = isset($singerList) ? $singerList : 15;
        		$field = is_null($field)? $field:'description,sort';
        	}        	
            $model  =   M($model);
        }
        $order = is_null($order)? $order:'add_time DESC';//设置排序
        $total        =   $model->where($where)->count();//获取总数
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
        return $model->where($where)->field($field,true)->limit($limit)->order($order)->select();
    	
    }
	
}
