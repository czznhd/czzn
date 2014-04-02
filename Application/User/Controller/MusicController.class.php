<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace User\Controller;
class MusicController extends UserController {
    public function index(){
    	$fav = F('addFav');
    	$map['id']=array('exp','IN('.$fav[UID].')');
    	$list = M('Songs')->field('id,name')->where($map)->select(); 
    	$this->assign('title', '我的音乐');	
    	$this->assign('list',$list);
		$this->display();
    }
    /**
     * 用户上传音乐
     */
    public function addmusic(){
		$this->assign('type',1);
		$this->display('index');
    }
    
     /**
     * 用户添加专辑
     */
    public function addalbum(){
		$this->assign('type',2);
		$this->display('index');
    }
    
    
    /**
     * 下载过的音乐
     */
    public function down(){
		$this->assign('type',3);
		$this->display('index');
    }
    /**
     * 删除收藏
     */
     
     public function delFav(){
     	$id=I("id");	//用户提交的i	
    	if($id)	{    	
        	$fav = F('addFav');
        	if ($fav) {
        		$idFav = $fav[UID]; 
        		$idFav = explode(",",$idFav);//字符串转数组
        		unset($idFav[array_search("$id",$idFav)]);  //删除指定id      			
           		$idFav = implode(",",$idFav);//数组转字符串
           		$fav[UID] = $idFav;
        		F('addFav',$fav);
        	}
        	$data['status']  = 1;
        	$data['info'] = "成功删除！";
            $this->ajaxReturn($data);
        	
    	}else{    		    		
    		$data['status']  = 0;
        	$data['info'] = "删除失败！";
    		$this->ajaxReturn($data);
		}
			
    }
}