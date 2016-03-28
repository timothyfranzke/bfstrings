<?php
	require_once __DIR__ . '/fbSDK/src/Facebook/autoload.php';
    $uid = 201596300553922503;
    $url = https://graph.facebook.com/v2.5/133733546979890?access_token=1030518733661195|F40ohoyUvi2TYGTUm4KW35mjcUQ;
  $config = array(
    'appId' => '1030518733661195',
    'secret' => '3674537faa96a91088f7ad3b9e319ac4',
  );

  $facebook = new Facebook/Facebook($config);
  $user_id = $facebook->getUser();
?>