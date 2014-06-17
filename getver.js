
var fs = require('fs');
var df = require('./delayconfig.js');

// var versionCfg={}
// var initFunc = function(){
// 	// Version format a.b.c
// 	var contents = fs.readFileSync('version.cfg');
// 	var pat = /(\d+)\.(\d+)\.(\d+)/;
// 	var res = pat.exec(contents);
// 	if( res ){
// 		versionCfg = { a:res[1], b:res[2], c:res[3] };
// 	} else{
// 		console.error('no read from cfg.');
// 	}
// };
// initFunc();
// var getCurrentVersion=function() {
// 	return versionCfg.a + '.' + versionCfg.b + '.' + versionCfg.c;
// };

module.exports.handler = function(filePath, req, res){
	var t = Math.floor(Math.random()*df.delayVar + df.delayFixed);
	setTimeout(function(){
		fs.readFile(filePath, function(err, data){
			if(err){
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.write('Cannot read ' + filePath + ' configuration');
				res.end();
			} else {
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.write(data);
				res.end();
			}
		});
	}, t * 1000);
};
