Reverbify.updateFeedback = function(msg, positive) {
	
	$('.default-confirmation').hide();
	Session.set('confirmation', msg);	

	if (positive) {	  
	  if ($('.default-confirmation').find('p').hasClass('assertive'))
	    $('.default-confirmation').find('p').removeClass('assertive');

    $('.default-confirmation').find('p').addClass('balanced');

	}

	else {
		if ($('.default-confirmation').find('p').hasClass('balanced'))
	    $('.default-confirmation').find('p').removeClass('balanced');

    $('.default-confirmation').find('p').addClass('assertive');
	}
}