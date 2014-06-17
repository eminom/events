
var fs = require('fs')

module.exports.handler = function(path, req, res){
	fs.readFile(path, function(err, data){
		if(err){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.write('Cannot read ' + path);
			res.end();
		} else {
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write(data);
			res.end();
		}
	});
};
