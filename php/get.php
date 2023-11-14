<?php
$path = "/var/www/html/data/data.txt";
$data = file_get_contents($path);
echo $data;
