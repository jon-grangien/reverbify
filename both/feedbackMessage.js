Reverbify.updateFeedback = function(msg, positive) {
	
	$('.default-confirmation').hide();
	Session.set('confirmation', "  " + msg); //spaces to leave room for icon	

	if (positive) {	  
	  if ($('.default-confirmation').find('p').hasClass('assertive'))
	    $('.default-confirmation').find('p').removeClass('assertive');

	  if ($('.default-confirmation').find('p').hasClass('ion-thumbsdown'))
	    $('.default-confirmation').find('p').removeClass('ion-thumbsdown');

    $('.default-confirmation').find('p').addClass('balanced icon-left ion-thumbsup');

	}

	else {
		if ($('.default-confirmation').find('p').hasClass('balanced'))
	    $('.default-confirmation').find('p').removeClass('balanced');

	  if ($('.default-confirmation').find('p').hasClass('ion-thumbsup'))
	    $('.default-confirmation').find('p').removeClass('ion-thumbsup');

    $('.default-confirmation').find('p').addClass('assertive icon-left ion-thumbsdown');
	}
}