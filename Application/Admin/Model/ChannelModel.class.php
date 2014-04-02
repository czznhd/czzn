<?php
// +-------------------------------------------------------------+
// |战神~~巴蒂 <378020023@qq.com> <http://www.jyuu.cn>  |
// +-------------------------------------------------------------+
// | 代码提取至 oneThink
// +--------------------------------------------------------------

namespace Admin\Model;
use Think\Model;

/**
 * 导航模型
 */

class ChannelModel extends Model {
    protected $_validate = array(
        array('name', 'require', '标题不能为空', self::MUST_VALIDATE , 'regex', self::MODEL_BOTH),
        array('url', 'require', 'URL不能为空', self::MUST_VALIDATE , 'regex', self::MODEL_BOTH),
    );

    protected $_auto = array(
        array('create_time', NOW_TIME, self::MODEL_INSERT),
        array('update_time', NOW_TIME, self::MODEL_BOTH),
        array('status', '1', self::MODEL_BOTH),
    );

}
