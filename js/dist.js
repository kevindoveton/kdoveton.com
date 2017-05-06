$(function() {
	$("#submitForm").click(function(event) {
		event.preventDefault();
		var d = $("form").serialize();
		$.post("/php/contact.php", d, function(data) {
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-59210008-5', 'auto');
ga('send', 'pageview');

var workModalOpen = false;

function closeWorkModal() {
	workModalOpen = false;
	$($("p.close")[0]).addClass("twist");
	$(".workInfo").css({opacity: 0});
	setTimeout(function() {
		$($("p.close")[0]).removeClass("twist");
		$(".workInfo").css({'z-index': -1});
	}, 500);
}

function openWorkModal(t) {
	workModalOpen = true;

	$(".workInfo").css({'z-index': 3, opacity: 1});

	// get the contents of the div from a span with class 'modalContent'
	var content = $(t).children().closest("span.modalContent").html()
	$("#modalContent").html(content)
}

function detectKeyPress(e) {
	console.log(e);
}

$(function() {
	// $(".workInfo").on({
		// 'click' : closeWorkModal
	// });

	$(document).keyup(function(e) {
		var KEYCODE_ESC = 27;

		if ((e.which === KEYCODE_ESC) && (workModalOpen)) {
			closeWorkModal();
		}
	});

	// remove background if an image exists
	$("div.contentWork ul li").each(function(i, d) {
		if ($(d).has("img").length !== 0) {
			$(d).css({'background-color': 'transparent'});
		}
	});
});
