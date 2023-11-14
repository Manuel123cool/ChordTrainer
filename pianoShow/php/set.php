<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$path = "/var/www/html/pianoShow/data/data.txt";
file_put_contents($path, $_POST["data"]);

exec('python3 /var/www/html/pianoShow/python/createBitmap.py 2>&1', $output, $code);
//exec('/home/manuel/python/createBitmap.py 2>&1', $output, $code);
var_dump($output);
