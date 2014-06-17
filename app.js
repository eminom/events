
var httpd = require('http');
var handler = require('./handler').handler;
var fs = require('fs');

function fixTitle(){
	var spawn = require('child_process').spawn;
	var fixer = spawn('cmd', ['/c title "Fake Server"']);
	fixer.stdout.setEncoding('utf8');
	fixer.stderr.setEncoding('utf8');
	fixer.stdout.on('data', console.log);
	fixer.stderr.on('data', console.log);
	fixer.on('exit',function(code, signal){
		console.log('done. spawning');
	});
	fixer.on('error', function(){
		console.log('error spawning!');
	});
	fixer.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	});
}

// fixTitle();
fs.readFile('port.cfg', function(err,data){
	var port = 12000;
	if(!err){
		port = parseInt(data) || port;
	}
	//console.log('listening on ' + port);
	httpd.createServer(handler).listen(port);
});
