<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Home\Controller;
use Think\Controller;
/**
 * 前台音乐数据处理
 */
class MusicController extends HomeController {
    //获取音乐数据
    public function getlistData(){
		$id=I("id");	//用户提交的i
    	if (IS_AJAX && $id) {
    		$Songs = M('Songs');
			if (strpos($id,',')) {
				$map['id']=array('exp','IN('.$id.')');
			}else {
				$map['id']=$id;						
			}
			$list=$Songs->field('up_name,up_id,description,music_down',true)->where($map)->select();	
			$Songs->where($map)->setInc('hits'); // 点击数加1	
			$this->ajaxReturn($list);
		}else{
			$this->show('页面出错');
		}
    }
    public function getData(){	
    	$id=I("id");	//用户提交的id			
    	if (IS_AJAX) {			
			if ($id) {
				$Songs = M('Songs');
				$map['id']=$id;				
				$list=$Songs->field('music_url')->where($map)->find();	
				$Songs->where($map)->setInc('hits'); // 点击数加1			
			}
			$this->ajaxReturn($list);
		}else{
			$this->show('页面出错');
		}
    }
    
    //获取音乐数据
    public function getTopMusic(){				
    	if (IS_AJAX) {
    		$map['recommend'] = '1';
			$list=M('Songs')->where($map)->cache('indexList',24*60*60)->field('id,name,singer_name,music_url,rater')->limit('20')->order('add_time desc')->select();
			$this->ajaxReturn($list);
		}else{
			$this->show('页面出错');
		}
    }
    
    //收藏音乐数据
    public function addFav(){
    	$id=I("id");	//用户提交的i	
    	if($id)	{
			// 获取当前用户ID
        	define('UID',is_login());
       	 	if( !UID ){// 还没登录 
            	$data['status']  = -1;
            	$this->ajaxReturn($data);
        	}        	
        	$fav = F('addFav');
        	$idFav = array();
        	if ($fav) {
        		$idFav =   $fav[UID]; 
        		//dump($idFav);
        		if ($idFav) {
        			if ( false === strripos($idFav,$id))  $fav[UID] =  $idFav.','.$id;        			
        		}else{
        			$fav[UID] = $id;
        		}            		
        		F('addFav',$fav);
        	}else{
        		$fav[UID] = $id;
        		F('addFav',$fav);
        	}
        	$data['status']  = 1;
            $this->ajaxReturn($data);
        	
    	}else{    		    		
    		$this->show('页面出错');
    	}
    }
    
    /*下载音乐*/   
    public function down () {
    	$id=I("id");	//用户提交的id
    	if($id)	{
    		$Songs = M('Songs');
			$map['id']=$id;				
			$list=$Songs->field('name,music_down')->where($map)->find();	
			$Songs->where($map)->setInc('download'); // 下载数加1
			$this->assign('m',$list);
			$this->meat_title = $list['name'].'下载 - '.C('WEB_TITLE');   	    
   			$this->display();
   		}else{
   			$this->error('出错啦！');   			
   		}
    }
    
}