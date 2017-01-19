function closeWorkModal() {
	$(".workInfo").css({opacity: 0,'z-index': -1});
}

function openWorkModal(t) {
	$(".workInfo").css({'z-index': 3});
	// t.children().closest("span.modalContent")
	var content = $(t).children().closest("span.modalContent").html()
	$("#modalContent").html(content)
	$(".workInfo").css({opacity: 1});
}

$(function() {
	$(".workInfo").on({
		'click' : closeWorkModal
	});
});
