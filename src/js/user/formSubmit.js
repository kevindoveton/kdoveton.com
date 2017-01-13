function formSubmit {
	var d = $("form").serialize();
	$.post("/contact.php", d, function(data) {
		if (data === "success") {
			console.log('success');
		}
		else {
			console.log('failed to submit');
		}
	};
}
