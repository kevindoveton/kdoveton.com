var workModalOpen = false;

function closeWorkModal() {
	workModalOpen = false;
	$($("p.close")[0]).addClass("twist");
	$(".workInfo").css({opacity: 0,'z-index': -1});
	setTimeout(function(){$($("p.close")[0]).removeClass("twist");}, 500);
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
	$(".workInfo").on({
		'click' : closeWorkModal
	});

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
