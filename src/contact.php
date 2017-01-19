<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$msg = 	"<h1>Contact Form:</h1>";
$msg +=	"<h1>Name</h1><p>";
$msg +=	$name;
$msg +=	"</p><h2>Email</h2><p>";
$msg +=	$email;
$msg +=	"</p><h2>Message</h2><p>";
$msg +=	$message;
$msg +=	"</p>";

// mail($msg);

echo "failed";

?>
