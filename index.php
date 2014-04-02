<?php
// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');
define ( 'APP_DEBUG',1 );
define ( 'APP_PATH', './Application/' );
define ( 'HTML_PATH', '' );
/*if(!is_file(APP_PATH . 'User/Conf/config.php')){
	header('Location: ./install.php');
	exit;
}*/
define ( 'RUNTIME_PATH', './Runtime/' );
require './Frame/ThinkPHP.php';