<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace User\Controller;
use Think\Controller;
use User\Api\UserApi;

/**
 * 前台公共控制器
 * 为防止多分组Controller名称冲突，公共Controller名称统一使用分组名称
 */
class UserController extends Controller {

	/* 空操作，用于输出404页面 */
	public function _empty(){
		$this->redirect('Home/Index/index');
	}
	/**
     * 后台控制器初始化
     */
    protected function _initialize(){
    	$CONGIG=F('web/Config');
    	 /* 读取站点配置 */
        if(!$CONGIG['WEB_SWITCH']){
            $this->error($CONGIG['WEB_OFF_MSG']);
        }
        // 获取当前用户ID
        define('UID',is_login());
        if( !UID ){// 还没登录 跳转到登录页面
            $this->error('您还没有登录，请先登录！', U('Home/Member/login'));
        }

        // 是否是超级管理员
        define('IS_ROOT',   is_administrator());
        if(!IS_ROOT && C('ADMIN_ALLOW_IP')){
            // 检查IP地址访问
            if(!in_array(get_client_ip(),explode(',',C('ADMIN_ALLOW_IP')))){
                $this->error('403:禁止访问');
            }
        }
        //获取用户信息
        $userData = M('Member')->find(UID);
        $this->assign('data',$userData);
        $this->assign('config',$CONGIG);
    }

	/**
     * 前台音乐数据通用分页列表数据集获取方法
     * @return array|false
     * 返回数据集
     */
    protected function lists ($model,$where=array(), $order='',$field, $status = 1){
    	
        if(is_string($model)){
        	$model = ucfirst($model);
        	$CONGIG=F('web/Config');
        	//设置分页显示条数
        	if('Songs' == $model ){
            	$listRows = isset($CONGIG['SONGS_LIST_ROWS']) ? $CONGIG['SONGS_LIST_ROWS'] : 20;
            	$field = !is_null($field)?$field:'music_url,lrc_url,music_down,description';
            	$where['status']= $status; 
        	}elseif('Album' == $model){
            	$listRows = isset($CONGIG['ALBUM_LIST_ROWS']) ? $CONGIG['ALBUM_LIST_ROWS'] : 15;
            	$field = !is_null($field)?$field:'company,description,sort,pub_time';
        	}elseif('Singer' == $model){
        		$listRows = isset($CONGIG['SINGER_LIST_ROWS']) ? $CONGIG['SINGER_LIST_ROWS'] : 15;
        		$field = !is_null($field)?$field:'description,sort';
        	}        	
            $model  =   M($model);
        }
        $order = !is_null($order)?$order:'add_time DESC';//设置排序
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
