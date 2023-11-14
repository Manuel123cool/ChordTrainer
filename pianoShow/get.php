<?php
$path = "/var/www/html/pianoShow/data/data.txt";
$data = file_get_contents($path);
echo $data;
