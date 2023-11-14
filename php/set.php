<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$path = "/var/www/html/data/data.txt";
echo file_put_contents($path, $_POST["data"]);
