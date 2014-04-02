<?php
// +-------------------------------------------------------------+
// | Author: 战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
namespace Admin\Controller;
use Think\Controller;
class SongsController extends AdminController {
    public function index($status = null,$title = null){
		$Songs =   D('Songs');
        /* 查询条件初始化 */
        //$map['uid'] = UID;
        if(isset($title)){
            $map['name']   =   array('like', '%'.$title.'%');
        }
        if(isset($status)){
            $map['status']  =   $status;
        }else{
            $map['status']  =   array('in', '0,1,2');
        }
        if ( isset($_GET['time-start']) ) {
            $map['update_time'][] = array('egt',strtotime(I('time-start')));
        }
        if ( isset($_GET['time-end']) ) {
            $map['update_time'][] = array('elt',24*60*60 + strtotime(I('time-end')));
        }
        $list = $this->lists($Songs	,$map,'id desc');
        int_to_string($list);
        // 记录当前列表页的cookie
        //Cookie('__forward__',$_SERVER['REQUEST_URI']);
        $this->assign('status', $status);
        $this->assign('list', $list);
        $this->meta_title = '歌曲管理';
        $this->display();
	}
	public function add(){
		if(IS_POST){
            $Songs = D('Songs');
            $data = $Songs->create();
            if($data){
                $id = $Songs->add();
                if($id){
                    $this->success('新增成功');
                } else {
                    $this->error('新增失败');
                }
            } else {
                $this->error($Songs->getError());
            }
        } else {
            $this->assign('info',array('pid'=>I('pid')));
			$this->meta_title = '添加歌曲';
			$this->display();
        }

	}
	
	public function mod($id = 0){
        if(IS_POST){
            $Songs = D('Songs');
            $data = $Songs->create();
            if($data){
                if($Songs->save()!== false){
                    $this->success('更新成功');
                } else {
                    $this->error('更新失败');
                }
            } else {
                $this->error($Songs->getError());
            }
        } else {
            $data = array();
            /* 获取数据 */
            $data = M('Songs')->field(true)->find($id);
            if(false === $data){
                $this->error('获取后台数据信息错误');
            }
            $this->assign('data', $data);
			$this->meta_title = '修改歌曲';
			$this->display('add');
        }
	}
	
	 /**
     * 删除
     */
    public function del(){
        $id = array_unique((array)I('id',0));

        if ( empty($id) ) {
            $this->error('请选择要操作的数据!');
        }
		//dump($id);
        $map = array('id' => array('in', $id) );
        if(M('Songs')->where($map)->delete()){
            //记录行为
            //action_log('update_channel', 'channel', $id, UID);
            $this->success('删除成功');
        } else {
            $this->error('删除失败！');
        }
    }
    
    /**
     * 批量处理歌曲
     */
    
   	public function batch () {
   		if (IS_AJAX){
   			$id=I('id');
   			$batch_id =I('batch_id');
   			$map['id']=array('exp','IN('.$id.')');
   			if ( '1' == $batch_id ){ // 1 批量推荐
   				$data = array('recommend'=>'1');
   			}elseif('2' == $batch_id){
   				$data = array('recommend'=>'0');
   			}elseif('3' == $batch_id){
   				$data = array('status'=>1);
   			}elseif('4' == $batch_id){
   				$data = array('status'=>0);
   			}
   			$arr = str2arr($id);
   			$len=count($arr);
   			for ($i = 0; $i < $len; $i++) {
   			 	 $map['id'] = $arr[$i];
   			 	 M('Songs')-> where($map)->setField($data); 
   			}
		 	$info['status']='1'; 	 	
			$this->ajaxReturn($info);
		 }else{
		 	$this->error('非法请求');
		 }
   		
    }
}