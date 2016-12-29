function setPhotoConsent(d) {
	console.log(d);
	$("#photoConsent").val(d);
}

$(function() {
	$("input[name=churchAttend]").click(function() {
		$("#churchAttendInfo").css({opacity: 0});
		$("#churchAttendInfo").animate({opacity: 1});
		$("#churchAttendInfo").toggleClass("displayNone", $(this).val() === "no")
	});
});

function submitForm() {
	// $("#loaders").removeClass("hidden").animate({opacity: 1});
	var d = $("form").serialize();
	$.post("/ajax/breakoutcarnival/", d, function(data) {
		if (data === "success")
		{
			// Make Feedback Right Size
			// -------------------------------------------------
			$(".feedbackContainer").animate({height : $(".feedback").height() });

			// Fade out loader
			// -------------------------------------------------
			$("#feedback").removeClass("hidden").animate({opacity: 1});
			$("#loaders").addClass("hidden").animate({opacity: 0});
		}
		else {
			$("#formResubmission").removeClass("displayNone");
			$("#loaders").addClass("hidden").animate({opacity: 0});
			$("#errorMessage").text("error : " + data);
		}
	})
	.fail(function(xhr, status, error) {
		$("#formResubmission").removeClass("displayNone");
		$("#loaders").addClass("hidden").animate({opacity: 0});
		$("#errorMessage").text(status + " : " + error);
	});
}

function submitFeedback(d) {
	var d = $("form").serialize();
	$.post("/ajax/breakoutcarnivalfeedback/", d, function(data) {
		console.log(data);
		if (data === "success")
		{
			window.location.href="./success.html"
		}
		else {
			console.log("error : " + data);
		}
	})
	.fail(function(xhr, status, error) {
		console.log('failed to submit: ' + error);
	});
}

function paymentMethod(d) {
	$(".paymentButtons").addClass("displayNone");
	$("#payMethod").val(d);

	if (d === "credit") {
		$("#credit").toggleClass("displayNone", false);
		$("#cash").toggleClass("displayNone", true);

	}
	else if (d === "cash"){
		$("#credit").toggleClass("displayNone", true);
		$("#cash").toggleClass("displayNone", false);
	}
}
