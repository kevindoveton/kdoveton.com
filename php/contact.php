<?php
require 'PHPMailer/PHPMailerAutoload.php';

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

	$mail = new PHPMailer;
	// $mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'mail.kdoveton.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = $_ENV['SMTP_USER'];                 // SMTP username
	$mail->Password = $_ENV['SMTP_PASS'];                           // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom($_ENV['SMTP_USER'], 'Mailer');
	// $mail->addAddress('kevindoveton@me.com', 'Kevin Doveton');     // Add a recipient
	$mail->addAddress('kevindoveton@me.com', 'Kevin Doveton');               // Name is optional
	$mail->addReplyTo($email, $name);
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Contact Form - KDoveton.com';
	$mail->Body    = $msg;
	$mail->AltBody = $msg;

	if(!$mail->send()) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    echo 'success';
	}
}
else {
	reportError();
}
?>
