<?php
/**
 * 前台配置文件
 * 所有除开系统级别的前台配置
 */
return array(  
	'LOAD_EXT_CONFIG' => 'cache_config',       
    /* 主题设置 */
    'DEFAULT_THEME' =>  'default',  // 默认模板主题名称
    /* 数据缓存设置 */
    'DATA_CACHE_PREFIX' => 'jy_', // 缓存前缀
    'DATA_CACHE_TYPE'   => 'File', // 数据缓存类型  

    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
    	'__PUBLIC__' => __ROOT__ . '/Public',
        '__STATIC__' => __ROOT__ . '/Public/static',
        '__ADDONS__' => __ROOT__ . '/Public/' . MODULE_NAME . '/Addons',
        '__IMG__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/images',
        '__CSS__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/css',
        '__JS__'     => __ROOT__ . '/Public/' . MODULE_NAME . '/js',
    ),
   	'HTML_CACHE_RULES'  => array(  // 定义静态缓存规则  		
    	'Index:'=>array('index'),
    	'Album:index'=>array('Album/index'),
    	'Album:type'=>array('Album/type/{id}'),
    	'Singer:index'=>array('Singer/index'),
    	'Singer:type'=>array('Singer/type/{id}'),
    	'Genre:index'=>array('Genre/index'),
    	'Genre:type'=>array('Genre/type/{id}'),
    	'Ranks:'=>array('ranks/{:action}/{p}')
     )

);