<?php

$to = "kevindoveton@me.com";

function reportError() {
	echo "something went wrong, please try again.";
}

if ($_POST) {
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$msg = 	"<h1>Contact Form:</h1>";
	$msg .=	"<h1>Name</h1><p>";
	$msg .=	$name;
	$msg .=	"</p><h2>Email</h2><p>";
	$msg .=	$email;
	$msg .=	"</p><h2>Message</h2><p>";
	$msg .=	$message;
	$msg .=	"</p>";

	// Email Headers
	$headers = "From: " . $email . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	// send the email
	$mail = mail($to, 'kdoveton.com', $msg, $headers, '-f'.$to);

	// check if sent
	if($mail) {
		echo 'success';
	}
	else {
		reportError();
	}
}
else {
	reportError();
}
?>
