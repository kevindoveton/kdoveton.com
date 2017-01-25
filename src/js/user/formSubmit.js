$(function() {
	$("#submitForm").click(function(event) {
		event.preventDefault();
		var d = $("form").serialize();
		$.post("/contact.php", d, function(data) {
			if (data === "success") {
				console.log('success');

				$("#onFormSuccess").css({display: "block"});
				$("form").css({display: "none"});
			}
			else {
				alert("Something went wrong. Please Try Again.")
				console.log('failed to submit');
			}
		});
	});
});
