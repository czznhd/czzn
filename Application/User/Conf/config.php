<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

/**
 * UCenter客户端配置文件
 * 注意：该配置文件请使用常量方式定义
 */

define('UC_APP_ID', 1); //应用ID
define('UC_API_TYPE', 'Model'); //可选值 Model / Service
define('UC_AUTH_KEY', 'ox(yL?U@E!K~]}*3_v=MCk`r0bsdV[T6j{mJ5F1a'); //加密KEY
define('UC_DB_DSN', 'mysql://MPm4c98K:xM8B7MWEj242@10.0.16.16:4066/21161594-127366-mys-nNsWg4I2'); // 数据库连接，使用Model方式调用API必须配置此项
define('UC_TABLE_PREFIX', 'jy_'); // 数据表前缀，使用Model方式调用API必须配置此项
return array(
	'URL_CASE_INSENSITIVE'  =>  true,   // 默认false 表示URL区分大小写 true则表示不区分大小写
    /* 主题设置 */
    'DEFAULT_THEME' =>  'default',  // 默认模板主题名称
    /* 数据缓存设置 */
    'DATA_CACHE_PREFIX' => 'jy_user_', // 缓存前缀 
    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
    	'__PUBLIC__' => __ROOT__ . '/Public',
        '__STATIC__' => __ROOT__ . '/Public/static',
        '__ADDONS__' => __ROOT__ . '/Public/' . MODULE_NAME . '/Addons',
        '__IMG__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/images',
        '__CSS__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/css',
        '__JS__'     => __ROOT__ . '/Public/' . MODULE_NAME . '/js',
    ),

);