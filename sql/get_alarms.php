<?php

include 'conn.php';

$rs = '';
$ids = '';
$result = array();

if (isset($_REQUEST['region_id'])) {
	$ids = $_REQUEST['region_id'];	
}

if (strlen($ids) == 0) {
	$rs = mysql_query("SELECT * FROM gmap.vw_get_alarms");
} else {
	$rs = mysql_query("SELECT * FROM gmap.vw_get_alarms WHERE region_id IN ($ids)");
}
	

while ($row = mysql_fetch_object($rs)) {
	array_push($result, $row);
}

echo json_encode($result);

?>