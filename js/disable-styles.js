/* This file is dedicated to the public domain; you may do as you wish with it. */

/* Adds a checkbox in the General options tab to disable and enable board style sheets. */

var disableStyleSheet = function () {
	var disableStyles = localStorage['disablestylesheet'] ? true : false;
	var i = 0
	while(i<document.styleSheets.length) {
		var protAndHost = window.location.protocol + '//' + window.location.host
		if(document.styleSheets[i].href == protAndHost + $('link[id="stylesheet"]').attr('href'))
		{
			var sheet = i
			break
		}
		i++
	};
	document.styleSheets[sheet].disabled = disableStyles;
	if (window.Options && Options.get_tab('general')){
		element = '#disablestyle'
		event = 'change'
		Options.extend_tab('general','<label id=\'disablestyle\'><input type=\'checkbox\' />' + ' Disable board specific style sheets' + '</label>')
		$(element).find('input').prop('checked', disableStyles)
	}

	$(element).on(event, function() {
		if(disableStyles) {
			delete localStorage.disablestylesheet;
		} else {
			localStorage.disablestylesheet = true;
		}
		disableStyles =! disableStyles;
		document.styleSheets[sheet].disabled = disableStyles;
	})
}
$(document).ready(disableStyleSheet());
