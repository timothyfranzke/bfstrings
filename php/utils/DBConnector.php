<?php

/**

 * Created by PhpStorm.

 * User: Timothy

 * Date: 1/19/2015

 * Time: 9:49 AM

 */



class DBConnector {

    function AdminConnection()

    {

        $db = DBConnection();

        mysql_select_db("bfstrings");

        return $db;

    }

    function SessionConnection()

    {

        $db = DBConnection();

        mysql_select_db("session");

        return $db;

    }



    function CloseConnection($db)

    {

        mysql_close($db);

    }

}



function DBConnection()

{

    $server = '127.0.0.1';

//$dbusername = 'franzke_race';





    $dbusername = 'root';

    $dbpassword = '';



    $db = mysql_connect($server, $dbusername);



    if (!$db)

    {

        echo "{status:'unable to make connection'}";

        die;

    }



    return $db;

}

