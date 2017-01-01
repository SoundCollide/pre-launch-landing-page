var submitForm = (function() {
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	var email = document.querySelector('#emailInput');
	if (validateEmail(email.value)) {
		console.log(email.value);
		var httpRequest;

		function makeRequest(url) {
			httpRequest = new XMLHttpRequest();

			if (!httpRequest) {
				return false;
			}
			httpRequest.onreadystatechange = onChange;
			httpRequest.open('POST', url);
			httpRequest.setRequestHeader('Content-Type','application/json; charset=utf-8');
			httpRequest.send(JSON.stringify({ 'email': email.value }));
		}

		function onChange() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				// console.log(httpRequest.status);
				if (httpRequest.status === 200) {
					email.value = '';
				} else {
					// alert('There was a problem with the request.');
				}
			}
		}

		makeRequest('https://thawing-reef-68901.herokuapp.com/users');
	} else {
		console.log('invalid email');
	}
});