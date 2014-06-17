


var url = require('url');
var fs = require('fs');
var path = require('path');
var path_parse = require('./path_parse').path_parse;

module.exports.handler = function(leading, req, res){
	var sub = path_parse(url.parse(req.url).path, leading);
	var now = path.join(__dirname, sub);
	fs.stat(now, function(err, stat){
		if(err || !stat.isFile()){
			res.writeHead(500,{'Content-Type':'text/plain'});
			res.write('Cannot open ' + sub );
			res.end();
			return;
		}

		res.writeHead(200,{'Content-Type':'image/jpg'});
		fs.createReadStream(now).pipe(res)
		return;
	});
};