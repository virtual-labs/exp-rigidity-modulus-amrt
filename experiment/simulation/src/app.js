if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Rigidity_Modulus/service_worker_Rigidity_Modulus.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
