<?php
// +-------------------------------------------------------------+
// |战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
// | 代码提取至 oneThink
// +--------------------------------------------------------------

namespace Admin\Controller;

/**
 * 后台导航管理控制器
 */
class ChannelController extends AdminController {

    /**
     * 导航管理列表
     */
    public function index(){
    	$Channel=M('Channel');
    	$list=$Channel->field('digest',true)->order('id desc')->select();
        $this->meta_title = '导航管理';
        $this->assign('list', $list);
        $this->display();
    }

    /* 新增导航 */
	public function add(){
		if(IS_POST){
            $Channel	= D('Channel');
            $data = $Channel->create();
            if($data){
                $id = $Channel->add();
                if($id){
                    $this->success('新增成功');
                } else {
                    $this->error('新增失败');
                }
            } else {
                $this->error($Channel->getError());
            }
        } else {
            $this->assign('info',array('pid'=>I('pid')));
			$this->meta_title = '添加专辑类型';
			$this->display();
        }

	}
	/* 修改导航 */
	public function mod($id = 0){
        if(IS_POST){
            $Channel	= D('Channel');
            $data = $Channel->create();
            if($data){
                if($Channel->save()!== false){
                    $this->success('更新成功');
                } else {
                    $this->error('更新失败');
                }
            } else {
                $this->error($Channel->getError());
            }
        } else {
            $data = array();
            /* 获取数据 */
            $data = M('Channel')->field(true)->find($id);
            if(false === $info){
                $this->error('获取后台数据信息错误');
            }
            $this->assign('data', $data);
			$this->meta_title = '修改导航';
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

        $map = array('id' => array('in', $id) );
        if(M('Channel')->where($map)->delete()){
            //记录行为
            //action_log('update_channel', 'channel', $id, UID);
            $this->success('删除成功');
        } else {
            $this->error('删除失败！');
        }
    }


}
