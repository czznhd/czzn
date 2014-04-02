<?php
return array(
	 /* 模块相关配置 */
    'AUTOLOAD_NAMESPACE' => array('Addons' => ONETHINK_ADDON_PATH), //扩展模块列表
    'MODULE_DENY_LIST'   => array('Common'),
    //'MODULE_ALLOW_LIST'  => array('Home','Admin'),
    // 允许访问的模块列表
	'MODULE_ALLOW_LIST'    =>    array('Home','Admin','User'),
	'DEFAULT_MODULE'       =>    'Home',  // 默认模块

    /* 调试配置 */
    'SHOW_PAGE_TRACE' => true,
    'APP_FILE_CASE'   => true,   // 是否检查文件的大小写 对Windows平台有效
   	'URL_MODEL'             =>  1,       // URL访问模式,可选参数0、1、2、3,代表以下四种模式：// 0 (普通模式); 1 (PATHINFO 模式); 2 (REWRITE  模式); 3 (兼容模式)  默认为PATHINFO 模式
    //'URL_PATHINFO_DEPR'     =>  '/',    // PATHINFO模式下，各参数之间的分割符号
    
    /*URL路由*/	
    'URL_ROUTER_ON' =>true, //URL路由
	'URL_ROUTE_RULES'=> array(
		'play/:id\d'=> 'Play/index',
		//'blog/:id'=>'/blog/read/id/:1'
		'album/:id\d'=> 'Album/detail',
		'album/type/:id\d'=> 'Album/type',
		'singer/:id\d'=> 'Singer/detail',
		'singer/type/:id\d'=> 'Singer/type',
		'genre/type/:id\d'=> 'Genre/type'
	),
	

    /* 用户相关设置 */
    'USER_MAX_CACHE'     => 1000, //最大缓存用户数
    'USER_ADMINISTRATOR' => 1, //管理员用户ID

    /* URL配置 */
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    //'VAR_URL_PARAMS'       => '', // PATHINFO URL参数变量
    //'URL_PATHINFO_DEPR'    => '/', //PATHINFO URL分割符
 
    /* 全局过滤配置 */
    'DEFAULT_FILTER' => '', //全局过滤函数
    /*更改普遍模板的起始标签和结束标签*/
    'TMPL_L_DELIM'    =>    '<{',
	'TMPL_R_DELIM'    =>    '}>',

    /* 数据库配置 */
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '10.0.16.16', // 服务器地址
    'DB_NAME'   => '21161594-127366-mys-nNsWg4I2', // 数据库名
    'DB_USER'   => 'MPm4c98K', // 用户名
    'DB_PWD'    => 'xM8B7MWEj242',  // 密码
    'DB_PORT'   => '4066', // 端口
    'DB_PREFIX' => 'jy_', // 数据库表前缀

    /* 文档模型配置 (文档模型核心配置，请勿更改) */
    //'DOCUMENT_MODEL_TYPE' => array(2 => '主题', 1 => '目录', 3 => '段落'),
    
     /* SESSION 和 COOKIE 配置 */
    'SESSION_PREFIX' => 'jy_home', //session前缀
    'COOKIE_PREFIX'  => 'jy_home_', // Cookie前缀 避免冲突
    
    'DATA_CACHE_TYPE'   => 'File', // 数据缓存类型 
    
    // 预先加载的标签库
    'TAGLIB_PRE_LOAD'     =>    'JY\\TagLib\\Gq',
	/*开启sq解析缓存*/
	//'DB_SQL_BUILD_CACHE' => true,
	//'DB_SQL_BUILD_LENGTH' => 20 // SQL缓存的队列长度
);