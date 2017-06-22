var workModalOpen = false;

function closeWorkModal() {
	workModalOpen = false;
	$($("p.close")[0]).addClass("twist");
	$(".workInfo").css({opacity: 0});
	$('body').removeClass('modal-open');
	setTimeout(function() {
		$($("p.close")[0]).removeClass("twist");
		$(".workInfo").css({'z-index': -1});
	}, 500);
}

function openWorkModal(t) {
	workModalOpen = true;
	$('body').addClass('modal-open')
	$(".workInfo").css({'z-index': 3, opacity: 1});

	// get the contents of the div from a span with class 'modalContent'
	var content = $(t).children().closest("span.modalContent").html()
	$("#modalContent").html(content)
}

function detectKeyPress(e) {
	console.log(e);
}

$(function() {
	$(document.links).filter(function() {
		return this.hostname != window.location.hostname;
	}).attr('target', '_blank');

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
