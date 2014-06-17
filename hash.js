

// File version
var fs = require('fs');
var path = require('path');
var url = require('url');
var path_parse = require('./path_parse').path_parse;

var getCurrentVersion = function() {
	return vCfg.a + '.' + vCfg.b + '.' + vCfg.c;
};

var processWithSlash = function(slash, res){
	var sub = './resfolder/hashv' + slash + '.hash';	// Format URL
	var now = path.join(__dirname, sub);
	fs.stat(now, function(err, stat){
		if(err || !stat.isFile()){
			res.writeHead(500,{'Content-Type':'text/plain'});
			res.write('Cannot open ' + sub );
			res.end();
			return;
		}

		res.writeHead(200,{'Content-Type':'text/plain'});
		fs.createReadStream(now).pipe(res)
		return;
	});
};

var processFromFile = function(file, res){
	fs.readFile(file, function(err, data){
		if(err){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.write('Cannot open ' + file + ' for reading version');
			res.end();
		}else{
			var oo = JSON.parse(data);
			if( ! oo.hasOwnProperty('version') ){
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.write('error for mat for ' + file);
				res.end();
			} else {
				processWithSlash('/' + oo.version, res);
			}
		}
	});
};

module.exports.handler = function(requestForNormal, arg1, req, res){
	if(requestForNormal){
		var sub = path_parse(url.parse(req.url).path, arg1);
		processWithSlash(sub, res);
	}else{
		processFromFile(arg1, res);
	}
};
