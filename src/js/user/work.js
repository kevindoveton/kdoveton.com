function closeWorkModal() {
	$(".workInfo").css({display: 'none'});
}

function openWorkModal(t) {
	console.log(t)
	// t.children().closest("span.modalContent")
	var content = $(t).children().closest("span.modalContent").html()
	$("#modalContent").html(content)
	$(".workInfo").css({display: 'block'});
}
