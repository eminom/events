var spawn = require('child_process').spawn;

function launchDo(){
	// console.log('again');
	var child = spawn('node', ['app']);
	child.on('exit', function(){
		delete child;
		setTimeout( launchDo, 1000 );	//Async
	});
}

launchDo();