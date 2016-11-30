$(function() {
	// Personalisation
	// -------------------------------------------------
	$("#fName").focusout(function() {
		var childName = $("#fName").val();
		$("#nominatedText").text("Nominated adult to pick up "+childName+" from Breakout Carnival");
		$("#sufferAnyFollowingText").text("Does "+childName+" suffer from any of the following that Team Leaders should know about to assist in their care? (Asthma, Severe Allergies, Dietary Needs, Convulsive Seizures, Physical Needs)");
		$("#immunisationsText").text("Is "+childName+" fully up to date with their immunisations for their age?");
		$("#anyOtherInfoText").text("Is there any other information – or health plan - which might assist us to care for "+childName+"? Please give details:");
	});

	

	// ANIMATIONS
	// -------------------------------------------------
	//jQuery time
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	$(".next").click(function() {
		if(animating) return false;
		animating = true;

		current_fs = $(this).parents("fieldset");
		next_fs = $(this).parents("fieldset").next();

		//activate next step on progressbar using the index of next_fs
		$("#progressBar li").eq($("fieldset").index(next_fs)).addClass("active");

		//show the next fieldset
		next_fs.show();

		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'transform': 'scale('+scale+')',
					'position': 'absolute'
				});
				next_fs.css({'left': left, 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
		return false;
	});




	$(".previous").click(function() {
		if(animating) return false;
		animating = true;

		current_fs = $(this).parents("fieldset");
		previous_fs = $(this).parents("fieldset").prev();

		//de-activate current step on progressbar
		$("#progressBar li").eq($("fieldset").index(current_fs)).removeClass("active");

		//show the previous fieldset
		previous_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
		return false;
	});
});
