<?php
$dbhost = 'localhost'; 
$dbuser = 'root'; 
$dbpass = ''; 
$database = 'test'; 
$suggestions = array();
$matched = array();
$value = isset($_GET['k'])? $_GET['k'] : "";
$limit = isset($_GET['r'])? $_GET['r'] : 0;

$conn = mysql_connect($dbhost,$dbuser);
if (!$conn) die(mysql_error());
mysql_select_db($database, $conn) or die(mysql_error());

$sql = "SELECT name FROM guitarist WHERE name LIKE '%".$value ."%' LIMIT ".$limit;

$res = mysql_query($sql) or die(mysql_error());
if(mysql_num_rows($res)>0) {
	while($row = mysql_fetch_assoc($res)) {
	array_push($suggestions, $row['name']);
	}
}
mysql_free_result($res);
mysql_close($conn);

foreach ($suggestions as $k) {
	if (stripos($k, $value) !== FALSE) {
		$match = preg_replace('/' .$value. '/i',"<strong>$0</strong>", $k, 1);
		$matched[] = "<li>".$match."</li>";
	}
}
echo  (count($matched)!=0) ? "<ul>".join("", $matched)."</ul>" : "";
?>
